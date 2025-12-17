; Functions for reading the version of an OpenType Font
; Specification here: https://learn.microsoft.com/en-us/typography/opentype/spec/otff
; Note that AHK NumGet is little-endian while the OpenType specification uses big endian
; 
; Format overview (big endian, no padding)
; Font: {
;   TableDirectory: {
;     uint32  sfntVersion    0x00010000 or 0x4F54544F
;     uint16  numTables      number of tables
;     uint16  searchRange    (historical)
;     uint16  entrySelector  (historical)
;     uint16  rangeShift
;     TableRecord[numTables]: {
;       char[4]  tag       table identifier
;       uint32   checksum
;       uint32   offset    from the beginning of the file
;       uint32   length
;     }
;   }
;   Table[numTables]: FontHeaderTable | ...
; }
;
; FontHeaderTable: {  required, tag=head
;   uint16   majorVersion
;   uint16   minorVersion
;   fixed32  fontRevision
;   ...
; }
;
; fixed32 is a 32-bit signed fixed-point number (value = (int32) fixed / 2¹⁶)
;
#Requires AutoHotkey 2.0

GetFontVersion(fontFile) {
	fontData := FileRead(fontFile, "RAW")

	readU16(offset) {
		v := NumGet(fontData, offset, "UChar") * 0x100
		v := v + NumGet(fontData, offset + 1, "UChar")
		Return v
	}
	readU32(offset) {
		v := NumGet(fontData, offset, "UChar") * 0x1000000
		v := v + NumGet(fontData, offset + 1, "UChar") * 0x10000
		v := v + NumGet(fontData, offset + 2, "UChar") * 0x100
		v := v + NumGet(fontData, offset + 3, "UChar")
		Return v
	}

	sfntVersion := readU32(0)
	if (sfntVersion != 0x00010000 and sfntVersion != 0x4F54544F) {  ; not a valid OTF file
		Return Map("success", false, "error", "invalid font version " . sfntVersion)
	}
	numTables := readU16(0x04)
	if (numTables > 32) {  ; too many tables
		Return Map("success", false, "error", "invalid number of tables " . numTables)
	}

	headOffset := 0
	Loop numTables {
		tableOffset := 0x0C + (A_Index - 1) * 0x10
		tag := ""
		Loop 4 {
			tag := tag . Chr(NumGet(fontData, tableOffset + A_Index - 1, "UChar"))
		}
		if (tag = "head") {
			headOffset := readU32(tableOffset + 0x8)
			Break
		}
	}

	if (headOffset = 0) {  ; head table not found
		MsgBox("No head table found in font file, " . fontFile)
		Return Map("success", false, "error", "no head table found")
	}

	majorVersion := readU16(headOffset)
	minorVersion := readU16(headOffset + 0x2)
	fontRevisionRaw := readU32(headOffset + 0x4)
	fontRevision := Round(fontRevisionRaw / 65536.0, 3)
	Return Map("success", true, "major", majorVersion, "minor", minorVersion, "revision", fontRevision)
}