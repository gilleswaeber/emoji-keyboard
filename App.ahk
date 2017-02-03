#SingleInstance on
;#NoTrayIcon
SendMode Input

Menu, Tray, Icon, assets/keyboard.ico, 1, 1
Menu, Tray, Tip, Emoji Keyboard
Menu, Tray, Add, &Show, Toggle
Menu, Tray, Add
Menu, Tray, Add, Emoji &Keyboard by Gilles Waeber, Credits
Menu, Tray, Add
Menu, Tray, Add, E&xit, Exit 
Menu, Tray, Default, &Show
Menu, Tray, NoStandard

#Include assets\JSON_ToObj.ahk
#Include assets\Webapp.ahk
__Webapp_AppStart:
;<< Header End >>

;             not focusable
Gui __Webapp_:+E0x08000000 +AlwaysOnTop -MaximizeBox -MinimizeBox ; +E0x40000 +ToolWindow ;  -Caption
OnMessage(0x112, "WM_SYSCOMMAND")
WinSet, Transparent, 230

WM_SYSCOMMAND(wParam)
{
	global vVisible
    if (wParam = 0xF060 and vVisible) ; SC_CLOSE hide instead of closing
    {
        Hide()
        return 0
    }
}

;Variable containing the current state
vVisible := false

;Get our HTML DOM object
iWebCtrl := getDOM()

;Change App name on run-time
setAppName("Emoji Keyboard")

; Our custom protocol's url event handler
app_call(args) {
	
	;MsgBox %args%
	param := SubStr(args, 6) 
	if SubStr(args, 1, 5) = "send/"
		Send(param)
}


; function to run when page is loaded
app_page(NewURL) {
}

Gui __Webapp_:Hide

~LAlt::	; <-- OPEN with double left alt key
	global vVisible
	if (A_PriorHotkey <> "~LAlt" or A_TimeSincePriorHotkey > 400) {
		if(vVisible){
			vVisible := false
			Hide()
			KeyWait, LAlt
			Send, {LAlt}
		}
		return
	}
	KeyWait, LAlt
	Show()
Return

; Functions to be called from the html/js source
Exit() {
	ExitApp
}

clipSaved =
bClipSaved := False

Credits(){
	Run, http://www.gilleswaeber.ch
}
Reload() {
	Reload
}
Run(t) {
	Run, %t%
}
Send(t) {
	global clipSaved, bClipSaved
	if(not bClipSaved){
		clipSaved := ClipboardAll
		bClipSaved := True
	}
	Clipboard := t
	Sleep, 10
	Send, ^v
	SetTimer, RestoreClipboard, 200
}
RestoreClipboard() {
	global clipSaved, bClipSaved
	SetTimer, RestoreClipboard, Off
	Clipboard := clipSaved
	clipSaved =
	bClipSaved := False
}
Show(){
	global vVisible
	vVisible := true
	Gui __Webapp_:Show
	Sleep, 10
	Send, !{Esc}
}
Hide(){
	global vVisible
	vVisible := false
	Gui __Webapp_:Hide
}
Toggle(){
	global vVisible
	if(vVisible){
		Hide()
	}
	else{
		Show()
	}
}
Ready(){
	global j
	getDOM().document.ahk.setKeymap(j.keymap)
}

#If vVisible
; Corresponding keys                    	;	US	CH
SC001::getDOM().document.ahk.input(1)   	;	ESC	ESC
SC03B::getDOM().document.ahk.input(59)   	;	F1	F1
SC03C::getDOM().document.ahk.input(60)   	;	F2	F2
SC03D::getDOM().document.ahk.input(61)   	;	F3	F3
SC03E::getDOM().document.ahk.input(62)   	;	F4	F4
SC03F::getDOM().document.ahk.input(63)   	;	F5	F5
SC040::getDOM().document.ahk.input(64)   	;	F6	F6
SC041::getDOM().document.ahk.input(65)   	;	F7	F7
SC042::getDOM().document.ahk.input(66)   	;	F8	F8
SC043::getDOM().document.ahk.input(67)   	;	F9	F9
SC044::getDOM().document.ahk.input(68)   	;	F10	F10
SC057::getDOM().document.ahk.input(87)   	;	F11	F11
SC058::getDOM().document.ahk.input(88)   	;	F12	F12
SC029::getDOM().document.ahk.input(41)   	;	`	§
SC002::getDOM().document.ahk.input(2)    	;	1	1
SC003::getDOM().document.ahk.input(3)   	;	2	2
SC004::getDOM().document.ahk.input(4)   	;	3	3
SC005::getDOM().document.ahk.input(5)   	;	4	4
SC006::getDOM().document.ahk.input(6)   	;	5	5
SC007::getDOM().document.ahk.input(7)   	;	6	6
SC008::getDOM().document.ahk.input(8)   	;	7	7
SC009::getDOM().document.ahk.input(9)   	;	8	8
SC00A::getDOM().document.ahk.input(10)   	;	9	9
SC00B::getDOM().document.ahk.input(11)   	;	0	0
SC00C::getDOM().document.ahk.input(12)   	;	-	'
SC00D::getDOM().document.ahk.input(13)   	;	=	^
SC010::getDOM().document.ahk.input(16)   	;	q	q
SC011::getDOM().document.ahk.input(17)   	;	w	w
SC012::getDOM().document.ahk.input(18)   	;	e	e
SC013::getDOM().document.ahk.input(19)   	;	r	r
SC014::getDOM().document.ahk.input(20)   	;	t	t
SC015::getDOM().document.ahk.input(21)   	;	y	z
SC016::getDOM().document.ahk.input(22)   	;	u	u
SC017::getDOM().document.ahk.input(23)   	;	i	i
SC018::getDOM().document.ahk.input(24)   	;	o	o
SC019::getDOM().document.ahk.input(25)   	;	p	p
SC01A::getDOM().document.ahk.input(26)   	;	[	è
SC01B::getDOM().document.ahk.input(27)   	;	]	¨
SC01E::getDOM().document.ahk.input(30)   	;	a	a
SC01F::getDOM().document.ahk.input(31)   	;	s	s
SC020::getDOM().document.ahk.input(32)   	;	d	d
SC021::getDOM().document.ahk.input(33)   	;	f	f
SC022::getDOM().document.ahk.input(34)   	;	g	g
SC023::getDOM().document.ahk.input(35)   	;	h	h
SC024::getDOM().document.ahk.input(36)   	;	j	j
SC025::getDOM().document.ahk.input(37)   	;	k	k
SC026::getDOM().document.ahk.input(38)   	;	l	l
SC027::getDOM().document.ahk.input(39)   	;	;	é
SC028::getDOM().document.ahk.input(40)   	;	'	à
SC02B::getDOM().document.ahk.input(43)   	;	\	$
SC056::getDOM().document.ahk.input(86)   	;	\	<
SC02C::getDOM().document.ahk.input(44)   	;	z	y
SC02D::getDOM().document.ahk.input(45)   	;	x	x
SC02E::getDOM().document.ahk.input(46)   	;	c	c
SC02F::getDOM().document.ahk.input(47)   	;	v	v
SC030::getDOM().document.ahk.input(48)   	;	b	b
SC031::getDOM().document.ahk.input(49)   	;	n	n
SC032::getDOM().document.ahk.input(50)   	;	m	m
SC033::getDOM().document.ahk.input(51)   	;	,	,
SC034::getDOM().document.ahk.input(52)   	;	.	.
SC035::getDOM().document.ahk.input(53)   	;	/	-
+SC029::getDOM().document.ahk.input(41)   	;	`	§
+SC002::getDOM().document.ahk.input(2,1)	;	1	1
+SC003::getDOM().document.ahk.input(3,1)	;	2	2
+SC004::getDOM().document.ahk.input(4,1)	;	3	3
+SC005::getDOM().document.ahk.input(5,1)	;	4	4
+SC006::getDOM().document.ahk.input(6,1)	;	5	5
+SC007::getDOM().document.ahk.input(7,1)	;	6	6
+SC008::getDOM().document.ahk.input(8,1)	;	7	7
+SC009::getDOM().document.ahk.input(9,1)	;	8	8
+SC00A::getDOM().document.ahk.input(10,1)	;	9	9
+SC00B::getDOM().document.ahk.input(11,1)	;	0	0
+SC00C::getDOM().document.ahk.input(12,1)	;	-	'
+SC00D::getDOM().document.ahk.input(13,1)	;	=	^
+SC010::getDOM().document.ahk.input(16,1)	;	q	q
+SC011::getDOM().document.ahk.input(17,1)	;	w	w
+SC012::getDOM().document.ahk.input(18,1)	;	e	e
+SC013::getDOM().document.ahk.input(19,1)	;	r	r
+SC014::getDOM().document.ahk.input(20,1)	;	t	t
+SC015::getDOM().document.ahk.input(21,1)	;	y	z
+SC016::getDOM().document.ahk.input(22,1)	;	u	u
+SC017::getDOM().document.ahk.input(23,1)	;	i	i
+SC018::getDOM().document.ahk.input(24,1)	;	o	o
+SC019::getDOM().document.ahk.input(25,1)	;	p	p
+SC01A::getDOM().document.ahk.input(26,1)	;	[	è
+SC01B::getDOM().document.ahk.input(27,1)	;	]	¨
+SC01E::getDOM().document.ahk.input(30,1)	;	a	a
+SC01F::getDOM().document.ahk.input(31,1)	;	s	s
+SC020::getDOM().document.ahk.input(32,1)	;	d	d
+SC021::getDOM().document.ahk.input(33,1)	;	f	f
+SC022::getDOM().document.ahk.input(34,1)	;	g	g
+SC023::getDOM().document.ahk.input(35,1)	;	h	h
+SC024::getDOM().document.ahk.input(36,1)	;	j	j
+SC025::getDOM().document.ahk.input(37,1)	;	k	k
+SC026::getDOM().document.ahk.input(38,1)	;	l	l
+SC027::getDOM().document.ahk.input(39,1)	;	;	é
+SC028::getDOM().document.ahk.input(40,1)	;	'	à
+SC02B::getDOM().document.ahk.input(43,1)	;	\	$
+SC056::getDOM().document.ahk.input(86,1)	;	\	<
+SC02C::getDOM().document.ahk.input(44,1)	;	z	y
+SC02D::getDOM().document.ahk.input(45,1)	;	x	x
+SC02E::getDOM().document.ahk.input(46,1)	;	c	c
+SC02F::getDOM().document.ahk.input(47,1)	;	v	v
+SC030::getDOM().document.ahk.input(48,1)	;	b	b
+SC031::getDOM().document.ahk.input(49,1)	;	n	n
+SC032::getDOM().document.ahk.input(50,1)	;	m	m
+SC033::getDOM().document.ahk.input(51,1)	;	,	,
+SC034::getDOM().document.ahk.input(52,1)	;	.	.
+SC035::getDOM().document.ahk.input(53,1)	;	/	-
#If