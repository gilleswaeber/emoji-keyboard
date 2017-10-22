;Variable containing the searching state
vSearch := false

Tab::
	vSearch := not vSearch
	MsgBox, vSearch = %vSearch%
return

#If vSearch
Loop {
	Input, key, L1 I
	MsgBox, %key%
}
#If