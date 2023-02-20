; Extract the current keyboard layout as a JSON string
; © Gilles Waeber 2022 - MIT License
; Some functions based on AutoHotkey source code
#Requires AutoHotkey 2.0

JsonString(text) {
	text := StrReplace(text, "`n", "\n")
	text := StrReplace(text, "`r", "\r")
	text := StrReplace(text, "`t", "\t")
	text := RegExReplace(text, '([\\"])', "\$1")
	Return '"' text '"'
}
CurrentKeyboardLayout() {
	hActive := DllCall("GetForegroundWindow")
	actTID := DllCall("GetWindowThreadProcessId", "UPtr", hActive, "UPtr", 0)
	Return DllCall("GetKeyboardLayout", "UInt", actTID)
}
KeyboardLayoutJson() {
	lKeyboard := CurrentKeyboardLayout()
	data := '{"0":{"vk":0, "name":""}'
	Loop 325
	{
		vk := ScToVk(A_Index, lKeyboard)
		name := GetKeyName(vk, A_Index, lKeyboard)

		If (vk != 0) {
			data .= ',"' A_Index '":{"vk":' vk ',"name":' JsonString(name) '}'
		}
	}
	data .= "}"
	return data
}
ScToVk(sc, lKeyboard) {
	; Calling MapVirtualKeyExW directly produces the wrong result in some cases
	; Tables taken from vk_to_sc in keyboard_mouse.cpp
	vk := 0
	Switch sc {
		Case 0x02A:  ; SC_LSHIFT
			vk := 1 * 0xA0  ; VK_LSHIFT
		Case 0x136:  ; SC_RSHIFT
			vk := 1 * 0xA1  ; VK_RSHIFT
		Case 0x01D:  ; SC_LCONTROL
			vk := 1 * 0xA2  ; VK_LCONTROL
		Case 0x11D:  ; SC_RCONTROL
			vk := 1 * 0xA3  ; VK_RCONTROL
		Case 0x038:  ; SC_LALT
			vk := 1 * 0xA4  ; VK_LMENU
		Case 0x138:  ; SC_RALT
			vk := 1 * 0xA5  ; VK_RMENU
		Case 0x15B:  ; SC_LWIN
			vk := 1 * 0x5B  ; VK_LWIN
		Case 0x15C:  ; SC_RWIN
			vk := 1 * 0x5C  ; VK_RWIN
		Case 0x045:  ; SC_PAUSE
			vk := 1 * 0x13  ; VK_PAUSE
		Case 0x52:  ; SC_NUMPAD0
			vk := 1 * 0x60  ; VK_NUMPAD0
		Case 0x4F:  ; SC_NUMPAD1
			vk := 1 * 0x61  ; VK_NUMPAD1
		Case 0x50:  ; SC_NUMPAD2
			vk := 1 * 0x62  ; VK_NUMPAD2
		Case 0x51:  ; SC_NUMPAD3
			vk := 1 * 0x63  ; VK_NUMPAD3
		Case 0x4B:  ; SC_NUMPAD4
			vk := 1 * 0x64  ; VK_NUMPAD4
		Case 0x4C:  ; SC_NUMPAD5
			vk := 1 * 0x65  ; VK_NUMPAD5
		Case 0x4D:  ; SC_NUMPAD6
			vk := 1 * 0x66  ; VK_NUMPAD6
		Case 0x47:  ; SC_NUMPAD7
			vk := 1 * 0x67  ; VK_NUMPAD7
		Case 0x48:  ; SC_NUMPAD8
			vk := 1 * 0x68  ; VK_NUMPAD8
		Case 0x49:  ; SC_NUMPAD9
			vk := 1 * 0x69  ; VK_NUMPAD9
		Case 0x53:  ; SC_NUMPADDOT
			vk := 1 * 0x6E  ; VK_DECIMAL
		Case 0x145:  ; SC_NUMLOCK
			vk := 1 * 0x90  ; VK_NUMLOCK
		Case 0x135:  ; SC_NUMPADDIV
			vk := 1 * 0x6F  ; VK_DIVIDE
		Case 0x037:  ; SC_NUMPADMULT
			vk := 1 * 0x6A  ; VK_MULTIPLY
		Case 0x04A:  ; SC_NUMPADSUB
			vk := 1 * 0x6D  ; VK_SUBTRACT
		Case 0x04E:  ; SC_NUMPADADD
			vk := 1 * 0x6B  ; VK_ADD
		Case 0x137:  ; SC_PRINTSCREEN
			vk := 1 * 0x2C  ; VK_SNAPSHOT
		Default:
			vk := DllCall("MapVirtualKeyExW", "UInt", A_Index, "UInt", 1, "UPtr", lKeyboard)  ; 1=MAPVK_VSC_TO_VK
	}
	Return vk
}
GetKeyName(vk, sc, lKeyboard) {
	Switch sc {
		Case 1, 14, 15, 28, 29, 42, 54:  ; Esc, BackSpace, Tab, Enter, LCtrl, LShift, RShift
			Return ScToKeyName(sc)
		Case 86:  ; OEM-102 key
			Return VkToChar(vk, lKeyboard)
		Default:
			If (sc >= 54) {
				Return ScToKeyName(sc)
			} Else {
				name := VkToChar(vk, lKeyboard)
				If (name = "") {
					Return ScToKeyName(sc)
				} Else {
					Return name
				}
			}
	}
}
ScToKeyName(sc) {  ; for the current keyboard layout
	; https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getkeynametextw
	VarSetStrCapacity(&name, 64)
	size := DllCall("GetKeyNameTextW", "Int64", A_Index << 16, "Str", name, "Int", 64)
	Return name
}
VkToChar(vk, lKeyboard) {
	; As in keyboard_mouse.cpp from AHK sources (except we don't restore active dead keys)
	; Given a VK find the character of the corresponding key

	If (vk < 0x41 || vk > 0x5A) {  ; outside A-Z range, MapVirtualKeyEx gives the correct result
		Return Chr(0xFFFF & DllCall("MapVirtualKeyExW", "UInt", vk, "UInt", 2, "UPtr", lKeyboard, "UInt"))  ; 2=MAPVK_VK_TO_CHAR
	}
	; 0x6E = VK_DECIMAL
	keyState := 0
	VarSetStrCapacity(&chNotUsed, 3)
	keyState := Buffer(256, 0)
	VarSetStrCapacity(&ch, 3)
	deadChar := 0
	flags := 0
	; Extract pending dead key if any
	If (DllCall("ToUnicodeEx", "UInt", 0x6E, "UInt", 0, "Ptr", keyState, "Str", ch, "Int", 2, "UInt", flags, "UPtr", lKeyboard) == 2) {
		deadChar := ch
	}
	; Get character corresponding to the vk
	n := DllCall("ToUnicodeEx", "UInt", vk, "UInt", 0, "Ptr", keyState, "Str", ch, "Int", 2, "UInt", flags, "UPtr", lKeyboard)
	;MsgBox("vk" vk " n" n " " ch)
	If (n < 0) {  ; is a dead key, flush it
		DllCall("ToUnicodeEx", "UInt", 0x6E, "UInt", 0, "Ptr", keyState, "Str", chNotUsed, "Int", 2, "UInt", flags, "UPtr", lKeyboard)
	}
	If (n != 0) {
		Return ch
	} Else {
		Return ""
	}
}
