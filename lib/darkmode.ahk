#Requires AutoHotkey 2.0

SetDarkMode(gui, state) {
    try {
        DWMWA_USE_IMMERSIVE_DARK_MODE := 20
        DllCall("dwmapi\DwmSetWindowAttribute",
                "UInt", gui.Hwnd,
                "UInt", DWMWA_USE_IMMERSIVE_DARK_MODE,
                "UInt*", state, ; pvAttribute: Pointer 1 active, 0 disabled
                "UInt", 4      ; cbAttribute: sizeof(pvAttribute)
        )
        return 0
    } catch as e {
        OutputDebug "Error calling DwmSetWindowAttribute" e.name ":" e.code ": " e.message
        return 1
    }
}

IsWindowsDarkModeActive() {
    RegKey := "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize"
    RegValue := "AppsUseLightTheme"

    try {
        Value := RegRead(RegKey, RegValue)
        return (Value = 0)
    } catch as e {
        OutputDebug "Error calling AppsUseLightTheme from registry" e.name ":" e.code ": " e.message
        ; Assume light mode if unable to read
        return false
    }
}

