#Requires AutoHotkey 2.0
#SingleInstance Force

#Include lib/thqby/WebView2/WebView2.ahk
#Include lib/monitor.ahk
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

class EmojiKeyboard {
	isVisible := false
	isSearch := false
	isInitialized := false
	width := 764
	height := 240
	main := Gui("+E0x08000000 +AlwaysOnTop +Resize -MaximizeBox -MinimizeBox", "Emoji Keyboard")
	wvKeyboard := ""

	isClipSaved := false
	clipSaved := unset

	__New() {
		this.text := this.main.AddText(, "Please wait...")
		onClose(*) {
			this.Hide()
		}
		onSize(obj, minMax, width, height) {
			if (minMax >= 0 and width > 0 and height > 0 and !this.text.Visible) {
				if (this.width != width or this.height != height) {
					this.width := width
					this.height := height
					this.Redraw()
					this.wv.PostWebMessageAsJson('["size", ' width ',' height ']')
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
			this.CheckLayout()
		}
		this.main.OnEvent("Close", onClose)
		this.main.OnEvent("Size", onSize)
		OnMessage(0x112, onSysCommand)	; WM_SYSCOMMAND
		OnMessage(0x51, onInputLangChange)	; WM_INPUTLANGCHANGE
	}

	Redraw() {
		this.wvc.Fill()
	}

	Initialize() {
		NewWindowRequestedHandler(handler, wv2, arg) {
			argp := WebView2.NewWindowRequestedEventArgs(arg)
			deferral := argp.GetDeferral()
			argp.NewWindow := wv2
			deferral.Complete()
		}
		onOpenDevTools() {
			this.wv.OpenDevToolsWindow()
		}
		onReady() {
			this.wv.PostWebMessageAsString("os," A_OSVersion)
			if (FileExist("config.json")) {
				config := FileRead("config.json")
				this.wv.PostWebMessageAsString("config," config)
			} else {
				this.wv.PostWebMessageAsString("defaultConfig,")
			}
			this.wvKeyboard := ""
			CheckLayout()
		}
		onSaveConfig(config) {
			fh := FileOpen("config.tmp.json", "w", "UTF-8")
			fh.Write(config)
			fh.Close()
			FileMove("config.tmp.json", "config.json", true)
		}
		onSend(text) {
			SetTimer(RestoreClipboard,0)
			if (this.isSearch) {
				this.Hide()
			}
			if(!this.isClipSaved) {
				this.clipSaved := ClipboardAll()
				this.isClipSaved := True
			}
			A_Clipboard := text
			Sleep(10)
			Send("^v")
			SetTimer(RestoreClipboard,200)
			if (this.isSearch) {
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
		onSetSize(width, height) {
			if (width != this.width or height != this.height) {
				this.width := width
				this.height := height
				if (this.isVisible) {
					this.Show()
				}
			}
		}
		onSetTitle(title) {
			this.main.Title := title
		}

		this.isInitialized := true
		this.wvc := WebView2.create(this.main.Hwnd)
		this.wv := this.wvc.CoreWebView2
		nwr := this.wv.NewWindowRequested(NewWindowRequestedHandler)
		this.wv.Navigate('file:///' A_ScriptDir '\wwwassets\index.html')
		this.wv.AddHostObjectToScript('ahk', {
			openDevTools: onOpenDevTools,
			ready: onReady, reload: ActReload,
			saveConfig: onSaveConfig, send: onSend,
			setOpacity: onSetOpacity, setSearch: onSetSearch, setSize: onSetSize, setTitle: onSetTitle,
		})
		this.text.Visible := false
	}

	Show() {
		this.isVisible := true
		monitor := GetMouseMonitor()
		MonitorGetWorkArea(monitor, &left, &top, &right, &bottom)
		x := left + (right - left - (this.width + 13) * A_Scaling) / 2	; 13px = shadow
		y := bottom - (this.height + 30) * A_Scaling	; 32 = titlebar + shadow

		this.main.Show(Format("{} W{} H{} x{} y{}", this.isSearch ? "" : "NA", this.width, this.height, x, y))
		if (!this.isInitialized) {
			this.Initialize()
		} else {
			this.wvc.Fill()
			CheckLayout()
		}
	}

	Hide(*) {
		if (this.isVisible and this.text.Visible) {
			Return
		}
		this.isVisible := false
		this.main.Hide()
		SetTimer(CheckLayout, 0)
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
