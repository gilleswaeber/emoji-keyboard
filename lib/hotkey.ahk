#Requires AutoHotkey 2.0
; Condition for activation: disable when in Windows RDP or Moonlight
#HotIf !WinActive("ahk_class TscShellContainerClass") and !WinActive("ahk_exe Moonlight.exe")
; Change Hotkey here
; After changing, reload script using a right click on the tray icon or the command in Settings > Tools
; For information on hotkeys in AHK, see https://www.autohotkey.com/docs/v2/Hotkeys.htm and https://www.autohotkey.com/docs/v2/KeyList.htm
+Capslock::KB.Toggle()