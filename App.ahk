#Requires AutoHotkey 2.0
#SingleInstance Force

#Include lib/thqby/WebView2/WebView2.ahk
#Include lib/monitor.ahk
#Include lib/caret.ahk
#Include lib/clipboard.ahk
#Include lib/keyboard_layout.ahk

#Warn
SetWorkingDir(A_ScriptDir)	; Ensures a consistent starting directory
SendMode("Input")

; Setup tray menu
TraySetIcon("lib/keyboard.ico")
A_IconTip := "Emoji Keyboard"
A_TrayMenu.Delete()
A_TrayMenu.Add("&Show", ActToggle)
A_TrayMenu.Add()
A_TrayMenu.Add("Emoji &Keyboard by Gilles Waeber", ActCredits)
A_TrayMenu.Add("&Reload", ActReload)
A_TrayMenu.Add()
A_TrayMenu.Add("E&xit", ActExit)
A_TrayMenu.Default := "&Show"

clamp(val, min, max) {
    if (val < min) {
        return min
    }
    if (val > max) {
        return max
    }
    return val
}

class EmojiKeyboard {
    isVisible := false
    isSearch := false
    isInitialized := 0 ; 0=not yet invoked, 1=webview loading, 2=settings loaded
    openAt := "bottom"
    x := -1
    y := -1
    width := 764
    height := 240
    main := Gui("+E0x08000000 +AlwaysOnTop -DPIScale +Resize -MaximizeBox -MinimizeBox", "Emoji Keyboard")
    wvKeyboard := ""

    isClipSaved := false
    clipSaved := unset

    __New() {
        this.text := this.main.AddText(, "Please wait...")
        onClose(*) {
            this.Hide()
        }
        onSize(obj, minMax, width, height) {
            w := Round(width / A_Scaling)
            h := Round(height / A_Scaling)
            if (minMax >= 0 and width > 0 and height > 0 and this.isInitialized == 2) {
                if (this.width != w or this.height != h) {
                    this.width := w
                    this.height := h
                    this.Redraw()
                }
            }
        }
        onSysCommand(wParam, *) {
            if (wParam = 0xF060 and this.isVisible)	; SC_CLOSE hide instead of closing
            {
                this.Hide()
                return 0
            }
        }
        onInputLangChange(*) {
            CheckLayout()
        }
        this.main.OnEvent("Close", onClose)
        this.main.OnEvent("Size", onSize)
        OnMessage(0x112, onSysCommand)	; WM_SYSCOMMAND
        OnMessage(0x51, onInputLangChange)	; WM_INPUTLANGCHANGE
    }

    Redraw() {
        this.wvc.Fill()
    }

    DataUnicode(path) {
        localPath := "res/data/" path
        url := "https://unicode.org/Public/" path
        if (!FileExist(localPath)) {
            dir := RegExReplace(localPath, "[\\/][^\\/]+$", "")
            if (!DirExist(dir)) {
                DirCreate(dir)
            }
            Download(url, localPath ".tmp")
            FileMove(localPath ".tmp", localPath)
        }
    }

    DataCLDR(path) {
        localPath := "res/data/cldr-json/" path
        url := "https://raw.githubusercontent.com/unicode-org/cldr-json/" path
        if (!FileExist(localPath)) {
            dir := RegExReplace(localPath, "[\\/][^\\/]+$", "")
            if (!DirExist(dir)) {
                DirCreate(dir)
            }
            Download(url, localPath ".tmp")
            FileMove(localPath ".tmp", localPath)
        }
    }

    Initialize() {
        if (this.isInitialized != 0) {
            Return
        }
        this.isInitialized := 1
        NewWindowRequestedHandler(handler, wv2, arg) {
            argp := WebView2.NewWindowRequestedEventArgs(arg)
            deferral := argp.GetDeferral()
            argp.NewWindow := wv2
            deferral.Complete()
        }
        onLoaded() {
            ; WebApp is loaded and can receive messages
            this.wv.PostWebMessageAsString("os," A_OSVersion)
            if (FileExist("config.json")) {
                config := FileRead("config.json")
                this.wv.PostWebMessageAsString("config," config)
            } else {
                this.wv.PostWebMessageAsString("defaultConfig,")
            }
            ; Load fallback fonts
            fonts := "`n"
            Loop Files "wwwassets/fallback_fonts/*", "FR"
            {
                fonts .= StrReplace(A_LoopFilePath, "wwwassets/",,,,1) "`n"
            }
            this.wv.PostWebMessageAsString('fonts,' fonts)
            ; Load plugins
            Loop Files "wwwassets/plugins/*.json", "FR"
            {
                ; read file and send contents
                contents := FileRead(A_LoopFilePath)
                this.wv.PostWebMessageAsString('plugin,' A_LoopFilePath "`n" contents)
            }
            ; Load fallback fonts

            this.wvKeyboard := ""
            CheckLayout()
        }
        onDownloadUnicode(num) {
            try {
                this.DataUnicode('emoji/15.0/emoji-test.txt')
                this.DataUnicode('15.0.0/ucd/emoji/emoji-data.txt')
                this.DataUnicode('15.0.0/ucd/UnicodeData.txt')
                this.DataUnicode('15.0.0/ucd/NamesList.txt')
                this.DataUnicode('15.0.0/ucd/NamedSequences.txt')
                this.DataCLDR('42.0.0/cldr-json/cldr-annotations-full/annotations/en/annotations.json')
            } catch as e {
                this.wv.PostWebMessageAsString('error,' num ',' e.What ' failed: ' e.Message)
            } else {
                this.wv.PostWebMessageAsString('done,' num ',')
            }
        }
        onHide() {
        	this.Hide()
		}
        onOpenDevTools() {
            this.wv.OpenDevToolsWindow()
        }
        onOpenLink(url) {
			Run(url)
		}
        onReady() {
            ; WebApp has interpreted the config and is fully initialized
            this.isInitialized := 2
            this.text.Visible := false
            this.main.Hide()
            this.Show()
        }
        onSaveConfig(config) {
            fh := FileOpen("config.tmp.json", "w", "UTF-8")
            fh.Write(config)
            fh.Close()
            FileMove("config.tmp.json", "config.json", true)
        }
        onSaveUnicodeData(data, types) {
            fh := FileOpen("wwwassets/script/dist/unidata.tmp.js", "w", "UTF-8")
            fh.Write(
            "// This file is generated by the builder script. Do not edit.`r`n"
            "// To rebuild, enable the dev tools in the settings, then press the build button`r`n"
            "var unicodeData = "
            )
            fh.Write(data)
            fh.Close()
            fh := FileOpen("wwwassets/script/unidata.tmp.d.ts", "w", "UTF-8")
            fh.Write(
            "// This file is generated by the builder script. Do not edit.`r`n"
            "// To rebuild, enable the dev tools in the settings, then press the build button`r`n"
            )
            fh.Write(types)
            fh.Close()
            FileMove("wwwassets/script/dist/unidata.tmp.js", "wwwassets/script/dist/unidata.js", true)
            FileMove("wwwassets/script/unidata.tmp.d.ts", "wwwassets/script/unidata.d.ts", true)
        }
        onSend(text) {
            SetTimer(RestoreClipboard,0)
            isActive := WinActive(this.main)
            if (isActive) {
                this.Hide()
            }
            if(!this.isClipSaved) {
                this.clipSaved := ClipboardAll()
                this.isClipSaved := True
            }
            SetClipboardPrivate(text)
            Sleep(10)
            Send("^v")
            SetTimer(RestoreClipboard,500)
            if (isActive) {
                this.Show()
            }
        }
        onSetOpacity(opacity) {
            if (opacity > .99) {
                WinSetTransparent("Off", this.main)
            } else if(opacity > .2) {
                WinSetTransparent(Round(255 * opacity), this.main)
            } else {
                WinSetTransparent(Round(255 * .2), this.main)
            }
        }
        onSetOpenAt(at) {
            this.openAt := at
        }
        onSetPosSize(x, y, width, height) {
            this.x := x
            this.y := y
            this.width := width
            this.height := height
        }
        onSetSearch(enable) {
            if (this.isSearch != enable) {
                this.isSearch := enable
                if (enable) {
                    this.main.Opt("-E0x08000000")
                    this.main.Show()
                } else {
                    if (WinActive(this.main)) {
                        Send("!{Esc}")
                    }
                    this.main.Opt("+E0x08000000")
                }
            }
        }
        onSetTitle(title) {
            this.main.Title := title
        }

		; Update JS files if they changed (e.g. after a pull)
		if (!FileExist("wwwassets/script/dist/script.js") or FileGetTime("wwwassets/script/dist/script.dist.js") > FileGetTime("wwwassets/script/dist/script.js")) {
			FileCopy("wwwassets/script/dist/script.dist.js", "wwwassets/script/dist/script.js", True)
		}
		if (!FileExist("wwwassets/script/dist/unidata.js") or FileGetTime("wwwassets/script/dist/unidata.dist.js") > FileGetTime("wwwassets/script/dist/unidata.js")) {
			FileCopy("wwwassets/script/dist/unidata.dist.js", "wwwassets/script/dist/unidata.js", True)
		}

        monitor := GetMouseMonitor()
        MonitorGetWorkArea(monitor, &left, &top, &right, &bottom)
        w := 200 * A_Scaling
        h := 100 * A_Scaling
        x := left + (right - left - w) / 2
        y := top + (bottom - top - h) / 2
        this.main.Title := "Emoji Keyboard - Starting up ..."
        this.main.Show(Format("x{} y{} W{} H{}", x, y, w, h))
        ; --disable-web-security to allow fetching data files from e.g. local res folder
        ; this could be avoided by adding functions to read the unincode data files and the pegjs file
        this.wvc := WebView2.create(this.main.Hwnd, unset, 0, '', '', {AdditionalBrowserArguments: '--disable-web-security'})
        this.wv := this.wvc.CoreWebView2
        nwr := this.wv.NewWindowRequested(NewWindowRequestedHandler)
        this.wv.Navigate('file:///' A_ScriptDir '\wwwassets\index.html')
        this.wv.AddHostObjectToScript('ahk', {
            downloadUnicode: onDownloadUnicode,
        	hide: onHide,
            loaded: onLoaded,
            openDevTools: onOpenDevTools, openLink: onOpenLink,
            ready: onReady, reload: ActReload,
            saveConfig: onSaveConfig, saveUnicodeData: onSaveUnicodeData, send: onSend,
            setOpenAt: onSetOpenAt,
            setOpacity: onSetOpacity, setSearch: onSetSearch, setPosSize: onSetPosSize, setTitle: onSetTitle,
        })
    }

    Show() {
        if (this.isInitialized < 2) {
            this.Initialize()
            Return
        }

        w := this.width * A_Scaling
        h := this.height * A_Scaling

        this.main.GetPos(&xp, &yp, &wp, &hp)
        this.main.GetClientPos(&xcp, &ycp, &wcp, &hcp)
        ; offset in top left corner
        xo := xcp - xp
        yo := ycp - yp
        ; dimensions of window decorations 
        wo := wp - wcp
        ho := yo ; better than hp - hcp in practice
        ; active monitor boundaries
        monitor := GetMouseMonitor()
        MonitorGetWorkArea(monitor, &left, &top, &right, &bottom)
        minx := left + xo
        maxx := right - (w + wo)
        miny := top + yo
        maxy := bottom - (h + ho)
        caretDistance := 10 * A_Scaling

        switch this.openAt
        {
        case "mouse":
            MouseGetPos(&xm, &ym)
            x := clamp(xm - (w + wo) / 2, minx, maxx)
            y := clamp(ym - h / 2, miny, maxy)
        case "bottom":
            x := left + (right - left - w - wo) / 2
            y := maxy
        case "text-caret":
            gc := GetCaretPosition(&xc, &yc, &wc, &hc)
            if (gc > 0 and xc >= left and xc <= right and yc >= top and yc <= bottom) {
                x := clamp(xc - (w + wo) / 2, minx, maxx)
                ; place over the caret
                if (yc > top + h + ho + caretDistance) {
                    y := yc - h - ho - caretDistance
                }
                ; place under the caret
                else if (yc + hc < bottom - h - ho - caretDistance) {
                    y := yc + hc + caretDistance
                }
                else {
                    y := this.y
                }
            } else {
                x := this.x
                y := this.y
            }
        default: ; last position
            x := this.x
            y := this.y
        }

        this.main.Show(Format("{} X{} Y{} W{} H{}", this.isSearch ? "" : "NA", x, y, w, h))

        this.wvc.Fill()
        CheckLayout()

        this.isVisible := true
    }

    Hide(*) {
        if (this.isVisible and this.text.Visible) {
            return false
        }
        this.main.GetPos(&x, &y, &_w, &_h)
        this.wv.PostWebMessageAsJson('["possize", ' x ',' y ',' this.width ',' this.height ']')
        this.main.Hide()
        SetTimer(CheckLayout, 0)
        this.isVisible := false
    }

    Toggle() {
        If (this.isVisible) {
            this.Hide()
        } Else {
            this.Show()
        }
    }

    Input(scanCode, shift := false) {
        this.wv.PostWebMessageAsJson('["input",' scanCode ',' (shift ? 'true' : 'false') ']')
    }

    SendLayout() {
        layout := KeyboardLayoutJson()
        this.wv.PostWebMessageAsJson('["layout",' layout ']')
    }
}
KB := EmojiKeyboard()
;EmojiKeyboard.main.Hide()
RestoreClipboard() {
    SetTimer(RestoreClipboard, 0)
    A_Clipboard := KB.clipSaved
    KB.clipSaved := unset
    KB.isClipSaved := False
}

CheckLayout() {	
    cKeyboard := CurrentKeyboardLayout()
    If (cKeyboard != KB.wvKeyboard and cKeyboard != "" and cKeyboard != 0 and ! KB.text.Visible) {
        KB.wvKeyboard := cKeyboard
        KB.SendLayout()
    }
}

ActToggle(*) {
    KB.Toggle()
}
ActReload(*) {
    Reload
}
ActExit(*) {
    ExitApp
}
ActCredits(*) {
    Run("https://github.com/romligCH/emoji-keyboard")
}

; Change Hotkey here
+Capslock:: KB.Toggle()

#HotIf KB.isVisible
; Corresponding keys          US   CH
SC029:: KB.Input(41, False)	; `    §
SC002:: KB.Input(02, False)	; 1    1
SC003:: KB.Input(03, False)	; 2    2
SC004:: KB.Input(04, False)	; 3    3
SC005:: KB.Input(05, False)	; 4    4
SC006:: KB.Input(06, False)	; 5    5
SC007:: KB.Input(07, False)	; 6    6
SC008:: KB.Input(08, False)	; 7    7
SC009:: KB.Input(09, False)	; 8    8
SC00A:: KB.Input(10, False)	; 9    9
SC00B:: KB.Input(11, False)	; 0    0
SC00C:: KB.Input(12, False)	; -    '
SC00D:: KB.Input(13, False)	; =    ^
+SC029:: KB.Input(41, True)	; `    §
+SC002:: KB.Input(02, True)	; 1    1
+SC003:: KB.Input(03, True)	; 2    2
+SC004:: KB.Input(04, True)	; 3    3
+SC005:: KB.Input(05, True)	; 4    4
+SC006:: KB.Input(06, True)	; 5    5
+SC007:: KB.Input(07, True)	; 6    6
+SC008:: KB.Input(08, True)	; 7    7
+SC009:: KB.Input(09, True)	; 8    8
+SC00A:: KB.Input(10, True)	; 9    9
+SC00B:: KB.Input(11, True)	; 0    0
+SC00C:: KB.Input(12, True)	; -    '
+SC00D:: KB.Input(13, True)	; =    ^
Tab:: KB.Input(15, False)
+Tab:: KB.Input(15, True)
Esc:: KB.Hide()
Capslock::KB.Input(58, False)
#HotIf KB.isVisible and !KB.isSearch
; Corresponding keys          US   CH
;SC001::KB.Input(01, False) ; ESC  ESC
;SC03B::KB.Input(59, False) ; F1   F1
;SC03C::KB.Input(60, False) ; F2   F2
;SC03D::KB.Input(61, False) ; F3   F3
;SC03E::KB.Input(62, False) ; F4   F4
;SC03F::KB.Input(63, False) ; F5   F5
;SC040::KB.Input(64, False) ; F6   F6
;SC041::KB.Input(65, False) ; F7   F7
;SC042::KB.Input(66, False) ; F8   F8
;SC043::KB.Input(67, False) ; F9   F9
;SC044::KB.Input(68, False) ; F10  F10
;SC057::KB.Input(87, False) ; F11  F11
;SC058::KB.Input(88, False) ; F12  F12
SC010:: KB.Input(16, False)	; q    q
SC011:: KB.Input(17, False)	; w    w
SC012:: KB.Input(18, False)	; e    e
SC013:: KB.Input(19, False)	; r    r
SC014:: KB.Input(20, False)	; t    t
SC015:: KB.Input(21, False)	; y    z
SC016:: KB.Input(22, False)	; u    u
SC017:: KB.Input(23, False)	; i    i
SC018:: KB.Input(24, False)	; o    o
SC019:: KB.Input(25, False)	; p    p
SC01A:: KB.Input(26, False)	; [    èü
SC01B:: KB.Input(27, False)	; ]    ¨
SC01E:: KB.Input(30, False)	; a    a
SC01F:: KB.Input(31, False)	; s    s
SC020:: KB.Input(32, False)	; d    d
SC021:: KB.Input(33, False)	; f    f
SC022:: KB.Input(34, False)	; g    g
SC023:: KB.Input(35, False)	; h    h
SC024:: KB.Input(36, False)	; j    j
SC025:: KB.Input(37, False)	; k    k
SC026:: KB.Input(38, False)	; l    l
SC027:: KB.Input(39, False)	; ;    éö
SC028:: KB.Input(40, False)	; '    àä
SC02B:: KB.Input(43, False)	; \    $
SC056:: KB.Input(86, False)	; N/A  <
SC02C:: KB.Input(44, False)	; z    y
SC02D:: KB.Input(45, False)	; x    x
SC02E:: KB.Input(46, False)	; c    c
SC02F:: KB.Input(47, False)	; v    v
SC030:: KB.Input(48, False)	; b    b
SC031:: KB.Input(49, False)	; n    n
SC032:: KB.Input(50, False)	; m    m
SC033:: KB.Input(51, False)	; ,    ,
SC034:: KB.Input(52, False)	; .    .
SC035:: KB.Input(53, False)	; /    -
+SC010:: KB.Input(16, True)	; q    q
+SC011:: KB.Input(17, True)	; w    w
+SC012:: KB.Input(18, True)	; e    e
+SC013:: KB.Input(19, True)	; r    r
+SC014:: KB.Input(20, True)	; t    t
+SC015:: KB.Input(21, True)	; y    z
+SC016:: KB.Input(22, True)	; u    u
+SC017:: KB.Input(23, True)	; i    i
+SC018:: KB.Input(24, True)	; o    o
+SC019:: KB.Input(25, True)	; p    p
+SC01A:: KB.Input(26, True)	; [    èü
+SC01B:: KB.Input(27, True)	; ]    ¨
+SC01E:: KB.Input(30, True)	; a    a
+SC01F:: KB.Input(31, True)	; s    s
+SC020:: KB.Input(32, True)	; d    d
+SC021:: KB.Input(33, True)	; f    f
+SC022:: KB.Input(34, True)	; g    g
+SC023:: KB.Input(35, True)	; h    h
+SC024:: KB.Input(36, True)	; j    j
+SC025:: KB.Input(37, True)	; k    k
+SC026:: KB.Input(38, True)	; l    l
+SC027:: KB.Input(39, True)	; ;    éö
+SC028:: KB.Input(40, True)	; '    àä
+SC02B:: KB.Input(43, True)	; \    $
+SC056:: KB.Input(86, True)	; N/A  <
+SC02C:: KB.Input(44, True)	; z    y
+SC02D:: KB.Input(45, True)	; x    x
+SC02E:: KB.Input(46, True)	; c    c
+SC02F:: KB.Input(47, True)	; v    v
+SC030:: KB.Input(48, True)	; b    b
+SC031:: KB.Input(49, True)	; n    n
+SC032:: KB.Input(50, True)	; m    m
+SC033:: KB.Input(51, True)	; ,    ,
+SC034:: KB.Input(52, True)	; .    .
+SC035:: KB.Input(53, True)	; /    -
#HotIf
