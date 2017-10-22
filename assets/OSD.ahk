
A_Scaling := A_ScreenDPI / 96

ProcessExist(name){
	Process, Exist, %name%
	return errorLevel
}

GetMonitor(){
	CoordMode, Mouse, Screen
	MouseGetPos, mx, my
	SysGet, monitorsCount, 80

	Loop %monitorsCount%{
		SysGet, monitor, Monitor, %A_Index%
		if (monitorLeft <= mx && mx <= monitorRight && monitorTop <= my && my <= monitorBottom){
			Return A_Index
		}
	}
	Return 1	
}

TextWidth(text, size, font, ByRef height)
{
	global txt
	
	Critical
	Gui, DummyGUI: destroy
	Gui, DummyGUI: -DPIScale
	Gui, DummyGUI:Font, s%size%, %font%
	Gui, DummyGUI:Add, Text, vTxt, %text%
	GuiControlGet, ov, DummyGUI:Pos, Txt
	Critical Off
	
	height := ovh
	return %ovw%
}

OSDInit = 0
OSD(text)
{
	GetMonitor()
	global OSDText, OSDInit, hwndOSD, A_Scaling
	tw = 0
	
	w := TextWidth(text, 30, "Trebuchet MS", h)
	if (OSDInit = 0){
		CustomColor = 000000
		Gui, OSD: +hwndhwndOSD +AlwaysOnTop +ToolWindow +LastFound +Owner -DPIScale -Caption
		WinSet, Transparent, 230
		Gui, OSD:Color, %CustomColor%
		Gui, OSD:Font, s30, Trebuchet MS
		OSDInit = 1
		Gui, OSD:Add, Text, vOSDText x10 y0 cCCCCCC BackgroundTrans, %text%
	}
	
	tw := w + 20
	GuiControl, OSD:Move, OSDText, w%w%
	GuiControl, OSD:, OSDText, %text%
	
	CoordMode, Mouse, Screen
	MouseGetPos, mx, my
	SysGet, monitorsCount, 80

	Loop %monitorsCount%{
		SysGet, monitor, Monitor, %A_Index%
		if (monitorLeft <= mx && mx <= monitorRight && monitorTop <= my && my <= monitorBottom){
			SysGet, monitorWorkArea, MonitorWorkArea, %A_Index%
			
			;x0y0 fix
			;If(A_Index != 1){
			;	Gui, OSD: Show, x0 y0 Hide
			;}
			
			y := monitorWorkAreaBottom - h
			Gui, OSD: Show, x%monitorWorkAreaLeft% y%y% h%h% w%tw% NA
			Break
			
			;DEBUG
			;ay := monitorWorkAreaTop + 100
			;ax := monitorWorkAreaLeft + 100
			;ax := monitorWorkAreaRight - 100
			;ay := 1419
			;ax := 3200
			;GuiControl, DEBUG:, DEBUGt, P X%ax% Y%ay%, M X%mx% Y%my% MON %A_Index% WA L%monitorWorkAreaLeft% R%monitorWorkAreaRight%, T%monitorWorkAreaTop% B%monitorWorkAreaBottom%, %ax% %ay%
			;Sleep, 200
			
			w := 100 * A_Scaling
			h := 100 * A_Scaling
			x := monitorWorkAreaLeft + 100 * A_Scaling
			y := monitorWorkAreaTop + 100 * A_Scaling
			Gui, OSD: Show, x%x% y%y% h%h% w%w% NA
			;Gui, OSD: Show, x2160 y0 h100 w100 NA
			
			;WinGetPos,x ,y , w, h, ahk_id %hwndOSD%
			;GuiControl, DEBUG:, DEBUGt2, X%x% Y%y% W%w% H%h%
			;Break
		}
	}
	
	SetTimer, RemoveToolTip, 2000
	Return

RemoveToolTip:
	SetTimer, RemoveToolTip, Off
	Gui, OSD: hide
	Return
}