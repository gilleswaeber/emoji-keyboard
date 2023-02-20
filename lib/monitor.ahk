; Functions for positioning GUIs in a multi-monitor setup
; © Gilles Waeber 2023 - MIT License
#Requires AutoHotkey 2.0

A_Scaling := A_ScreenDPI / 96

GetMouseMonitor() {
	; Get the index of monitor on which the mouse cursor is located
	CoordMode("Mouse", "Screen")
	MouseGetPos(&mx, &my)
	count := SysGet(80)

	Loop count {
		MonitorGet(A_Index, &left, &top, &right, &bottom)
		if (left <= mx && mx <= right && top <= my && my <= bottom) {
			Return A_Index
		}
	}
	Return 1
}

