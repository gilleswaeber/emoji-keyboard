; EnumResources( Filename, Type [, LabelOrFunctionName ] )
;   Requires AHK v1.0.47.06.

; Type:
;   See MSDN: Resource Types -
;       http://msdn.microsoft.com/en-us/library/ms648009(VS.85).aspx
EnumResources(Filename, Type, Label="")
{
    hmod := DllCall("GetModuleHandle", "str", Filename)
    ; If the DLL isn't already loaded, load it as a data file.
    loaded := !hmod
        && hmod := DllCall("LoadLibraryEx", "str", Filename, "uint", 0, "uint", 0x2)

    enumproc := RegisterCallback("EnumResources_callback","F")
    param := 0
    MsgBox % VarSetCapacity(param,16,0)
    NumPut(&Label, param)
    MsgBox % NumGet(param, 0, "Ptr")
    ; Enumerate the resources.
    DllCall("EnumResourceNamesW", "uint", hmod, "uint", Type, "Ptr", enumproc, "Ptr", &param)
    DllCall("GlobalFree", "uint", enumproc)

    ; If we loaded the DLL, free it now.
    if loaded
        DllCall("FreeLibrary", "uint", hmod)

    return NumGet(param, 8, "Int")
}

EnumResources_callback(hModule, lpszType, lpszName, lParam)
{
    NumPut(1 + NumGet(lParam, 8, "Int"), lParam, 8, "Int")
    if (lpszName >> 16 != 0)
        lpszName := DllCall("MulDiv","int",lpszName,"int",1,"int",1,"str")
    Label := DllCall("MulDiv","int",NumGet(lParam+0),"int",1,"int",1,"str")
    if Label !=
    {
        if IsLabel(Label)
        {   ; ErrorLevel = resource ID or name.
            ErrorLevel := lpszName
            gosub %Label%
        }
        else
            %Label%(lpszName)   ; Dynamic function call. Requires AHK v1.0.47.06.
    }
    return ErrorLevel!="#stop"
}

;MsgBox %A_AhkPath%
NumIcons := EnumResources(A_AhkPath, 14, "EnumGroupIcons_callback")
MsgBox % NumIcons " icons::`n`n" Icons
ExitApp

EnumGroupIcons_callback(resource_name) {
    global Icons .= resource_name "`n"
}
