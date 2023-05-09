#Requires AutoHotkey 2.0

; Set the clipboard but prevent Windows from saving the value in the clipboard history
; https://www.autohotkey.com/boards/viewtopic.php?t=97251
; https://learn.microsoft.com/en-us/windows/win32/dataxchg/using-the-clipboard#pasting-information-from-the-clipboard
; https://learn.microsoft.com/en-us/windows/win32/dataxchg/clipboard-formats#cloud-clipboard-and-clipboard-history-formats
SetClipboardPrivate(text) {
   bytes := StrPut(text, "utf-16")
   hMemText := DllCall("GlobalAlloc", "Int", 0x42, "Ptr", (bytes*2)+8, "Ptr")
   pMem := DllCall("GlobalLock", "Ptr", hMemText, "Ptr")
   StrPut(text, pMem, bytes, "utf-16")
   DllCall("GlobalUnlock", "Ptr", hMemText)
   DllCall("OpenClipboard", "Ptr", A_ScriptHwnd)
   DllCall("EmptyClipboard")
   DllCall("SetClipboardData", "Int", 13, "Ptr", hMemText)
   DllCall("SetClipboardData", "Int", DllCall("RegisterClipboardFormat", "Str", "ExcludeClipboardContentFromMonitorProcessing"), "Ptr", 0)
   DllCall("CloseClipboard")
}
