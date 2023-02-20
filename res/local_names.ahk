LoadString(hInstance, uID) {
	; source: https://github.com/Ixiko/AHK-libs-and-classes-collection/blob/master/libs/g-n/LoadString.ahk
	; https://msdn.microsoft.com/en-us/library/windows/desktop/ms647486(v=vs.85).aspx
    Local Size, p, String
    If (!(Size := DllCall("LoadStringW", "Ptr", hInstance, "UInt", Abs(uID), "UPtrP", p, "Int", 0))) {
        ErrorLevel := TRUE
        Return ("")
    }

    String     := StrGet(p, Size, "UTF-16")
    ErrorLevel := FALSE

    Return (String)
}

data := ("{")
Loop, Files, C:\Windows\System32\*, D
{
	If (FileExist(A_LoopFilePath . "\getuname.dll.mui")) {
		data .= ("""" . A_LoopFileName . """: {""-1"":""""")
		hInstance := DllCall("LoadLibraryExW", "Str", A_LoopFilePath . "\getuname.dll.mui", "UInt", 0, "UInt", 0x2, "Ptr")
        Loop, 65536 {
        	i := A_Index - 1
        	name := LoadString(hInstance, i)
        	name := StrReplace(name, "\", "\\")
        	name := StrReplace(name, """", "\""")
        	If (!ErrorLevel) {
        		data .= (",""" . i . """:""" . name . """")
        	}
        }
        DllCall("Kernel32.dll\FreeLibrary", "Ptr", hInstance)
		data .= ("},")
	}
}
data .= ("""none"":{}}")
dest := FileOpen("winchars.json", "w", "UTF-8")
dest.Write(data)
dest.Close()
