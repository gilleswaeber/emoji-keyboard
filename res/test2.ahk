NumIcons := EnumResources(A_AhkPath, 14, "EnumGroupIcons")
MsgBox % NumIcons " icons:`n`n" Icons
exitapp

EnumGroupIcons:
    Icons .= ErrorLevel "`n"
return

EnumResources(Filename, Type, Label)
{
  static uLabel
  MsgBox % A_EventInfo

  If ( A_EventInfo = 0 )  { ; when called by user
    hmod := DllCall("GetModuleHandle", "str", Filename)
    ; If the DLL isn't already loaded, load it as a data file.
    loaded := !hmod
        && hmod := DllCall("LoadLibraryEx", "str", Filename, "uint", 0, "uint", 0x2)

    enumproc := RegisterCallback(A_ThisFunc,"F")
    uLabel := Label

    ; Enumerate the resources.
    DllCall("EnumResourceNames", "uint", hmod, "uint", Type, "uint", enumproc)
    DllCall("GlobalFree", "uint", enumproc)

    ; If we loaded the DLL, free it now.
    if loaded
        DllCall("FreeLibrary", "uint", hmod)

    uLabel := ""
    return NumGet(param,4)
  }

  If ( A_EventInfo != 0 )  {  ; when called from invoking callback
    ; Alias for Lex's EnumResources_callback param
    lpszName:=Label

    if uLabel !=
    {
        if IsLabel(uLabel)
        {   ; ErrorLevel = resource ID or name.
            ErrorLevel := lpszName
            gosub %uLabel%
        }
        else
            %uLabel%(lpszName)   ; Dynamic function call. Requires AHK v1.0.47.06.
    }
    return ErrorLevel!="#stop"
  }
}
