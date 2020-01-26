const fs = require("fs")
var argv = require('minimist')(process.argv.slice(1));
var { byte, integer, longint, char, pchar, word, pointer, TFldInfoRec } = require("./src/types")

function unsetBit(buffer) {
    var b = buffer
    var firstByte = b[0] - 2 ** (4 * 2 - 1)

    if (b.length === 1) {
        if (buffer.readUInt8() !== 0) {
            b.writeUInt8(firstByte)
        } else {
            return 0
        }

    } else if (b.length === 2) {
        if (buffer.readUInt16BE() !== 0) {
            b.writeUInt8(firstByte)
        } else {
            return 0
        }
    } else if (b.length === 4) {
        if (buffer.readUInt16BE() !== 0) {
            b.writeUInt8(firstByte)
        } else {
            return 0
        }
    } else {
        if (buffer.readDoubleBE() !== 0) {
            b.writeUInt8(firstByte)
        } else {
            return 0
        }
    }

    return b
}

function convertTime() {
    var b = unsetBit(buffer).readUInt16BE()
    // TODO
}

function convertTimestamp(buffer, dateOffset = 0) {
    var b = unsetBit(buffer).readDoubleBE()
    var d = new Date("0001-01-01")
    d.setHours(0)
    d.setMinutes(0)
    d.setSeconds(0)
    //console.log(d.toUTCString(), b)
    
    var date = (new Date(d.getTime()+b+dateOffset))//.getTime()
    //console.log(date.toUTCString())
    return date
}

function convertDate(buffer) {
    var date = new Date("0001-01-01");
    var days = unsetBit(buffer)
    
    if (days) {
        date.setDate(date.getDate() + days.readUInt32BE());
        //console.log(date.getDate(), date, days)
        return date;
    }

    return 0
}

class ParadoxTable {
    constructor(buffer) {
        this.buffer = buffer
        this.recordSize = new integer(buffer, 0, false)

        this.headerSize = new integer(buffer, this.recordSize.upperlimmit, false)

        this.fileType = new byte(buffer, this.headerSize.upperlimmit)

        this.maxTableSize = new byte(buffer, this.fileType.upperlimmit)

        this.numRecords = new longint(buffer, this.maxTableSize.upperlimmit, false)

        this.nextBlock = new word(buffer, this.numRecords.upperlimmit)

        this.fileBlocks = new word(buffer, this.nextBlock.upperlimmit, false)

        this.firstBlock = new word(buffer, this.fileBlocks.upperlimmit)

        this.lastBlock = new word(buffer, this.firstBlock.upperlimmit)

        this.unknown = new word(buffer, this.lastBlock.upperlimmit)

        this.modifiedFlags1 = new byte(buffer, this.unknown.upperlimmit)

        this.indexFieldNumber = new byte(buffer, this.modifiedFlags1.upperlimmit)

        this.primaryIndexWorkspace = new pointer(buffer, this.indexFieldNumber.upperlimmit)

        this.unknown2 = new pointer(buffer, this.primaryIndexWorkspace.upperlimmit)

        //skipped bytes 1e-20,  see /documents/PxFORMAT.txt

        this.numFields = new integer(buffer, parseInt(21, 16), false)

        this.primaryKeyFields = new integer(buffer, this.numFields.upperlimmit)

        this.encryption1 = new longint(buffer, this.primaryKeyFields.upperlimmit)

        this.sortOrder = new byte(buffer, this.encryption1.upperlimmit)

        this.modifiedFlags2 = new byte(buffer, this.sortOrder.upperlimmit)

        //skipped bytes 2b-2c,  see /documents/PxFORMAT.txt

        this.changeCount1 = new byte(buffer, parseInt("2d", 16))

        this.changeCount2 = new byte(buffer, this.changeCount1.upperlimmit)

        //skipped byte 2f,  see /documents/PxFORMAT.txt

        this.tableNamePtrPtr = new pchar(buffer, parseInt(30, 16))

        this.fldInfoPtr = new pointer(buffer, this.tableNamePtrPtr.upperlimmit)

        this.writeProtected = new byte(buffer, this.fldInfoPtr.upperlimmit)

        this.fileVersionID = new byte(buffer, this.writeProtected.upperlimmit)

        this.maxBlocks = new word(buffer, this.fileVersionID.upperlimmit)

        //skipped byte 3c,  see /documents/PxFORMAT.txt

        this.auxPasswords = new byte(buffer, parseInt("3d", 16))

        //skipped bytes 3e-3f,  see /documents/PxFORMAT.txt

        this.cryptInfoStartPtr = new pointer(buffer, parseInt(40, 16))

        this.cryptInfoEndPtr = new pointer(buffer, this.cryptInfoStartPtr.upperlimmit)

        //skipped byte 48,  see /documents/PxFORMAT.txt

        this.autoInc = new longint(buffer, parseInt(49, 16))

        //skipped bytes 4d-4e,  see /documents/PxFORMAT.txt

        this.indexUpdateRequired = new byte(buffer, parseInt("4f", 16))

        //skipped bytes 50-54,  see /documents/PxFORMAT.txt

        this.refIntegrity = new byte(buffer, parseInt(55, 16))

        //skipped bytes 56-57,  see /documents/PxFORMAT.txt

        this.unknown3 = new integer(buffer, parseInt(58, 16))

        this.unknown4 = new integer(buffer, this.unknown3.upperlimmit)

        this.encryption2 = new longint(buffer, this.unknown4.upperlimmit)

        this.fileUpdateTime = new longint(buffer, this.encryption2.upperlimmit)

        this.hiFieldID = new integer(buffer, this.fileUpdateTime.upperlimmit)

        this.hiFieldIDinfo = new integer(buffer, this.hiFieldID.upperlimmit)

        this.sometimesNumFields = new integer(buffer, this.hiFieldIDinfo.upperlimmit)

        this.dosGlobalCodePage = new integer(buffer, this.sometimesNumFields.upperlimmit)

        //skipped bytes 6c-6f,  see /documents/PxFORMAT.txt

        this.changeCount4 = new integer(buffer, parseInt(70, 16))

        var TFldInfoRecArray = []

        for (var i = parseInt(78, 16); i < (parseInt(78, 16) + this.numFields.getValue() * 2); i += 2) {
            //console.log(i.toString(16))
            TFldInfoRecArray.push(new TFldInfoRec(buffer, i))
        }



        var pcharArray = []

        var j = i

        for (var i = i; i <= j + this.numFields.getValue() * 4; i += 4) {
            pcharArray.push(new pchar(buffer, i))
        }

        //console.log(pcharArray)

        this.pcharArray = pcharArray

        var initialDBNameStart = i

        var initialDBNameEnd = i

        while (buffer[initialDBNameEnd] !== 0) {
            initialDBNameEnd++
        }

        this.initialTableName = buffer.slice(initialDBNameStart, initialDBNameEnd)

        var blockLimit = initialDBNameEnd

        while (buffer[blockLimit] === 0) {
            blockLimit++
        }

        var initialBlockLimit = blockLimit

        while (buffer[blockLimit] >= 30 || buffer[blockLimit + 1] >= 30) {
            blockLimit++
        }

        var fieldsString = buffer.slice(initialBlockLimit, blockLimit).toString('utf8')

        this.fieldArray = fieldsString.split('\u0000')

        for (var k in TFldInfoRecArray) {
            TFldInfoRecArray[k].addName(this.fieldArray[k])
        }

        this.TFldInfoRecArray = TFldInfoRecArray

        this.firstaddDataSize = this.buffer.slice(this.headerSize.getValue() + 4, this.headerSize.getValue() + 6)

        //there must be a better way to find the portion of the .db file which contains all the field names

        //I decided to skip what comes after the field names, see /documents/PxFORMAT.txt . I'm assuming that the database to be read is unencrypted
    }

    returnRecords(nb, dateOffset = 0) {
        var recordsStart = this.headerSize.getValue() + 6
        var records = []
        var blockSize = this.maxTableSize.getValue() * 1024

        var getAddDataSize = (buff, offset) => buff.slice(offset + 4, offset + 6)

        var numberOfBlocks = nb || this.fileBlocks.getValue()

        //Go through each block
        for (var i = 0; i < numberOfBlocks; i++) {
            var addDataSize = getAddDataSize(this.buffer, this.headerSize.getValue() + blockSize * i)
            var numRecordsInBlock = addDataSize.readUInt16LE() / this.recordSize.getValue() + 1
            var recordsStart = this.headerSize.getValue() + blockSize * i + 6

            //Go through each record
            for (var j = 0; j < numRecordsInBlock; j++) {
                var record = []

                //Go through each field
                for (var k = 0; k < this.TFldInfoRecArray.length; k++) {

                    record.push(new Field(this.TFldInfoRecArray[k].name,
                        this.TFldInfoRecArray[k].getType(),
                        this.buffer.slice(recordsStart,
                            recordsStart + this.TFldInfoRecArray[k].getSize()),"ascii",dateOffset
                    )
                    )
                    recordsStart += this.TFldInfoRecArray[k].getSize()
                }
                records.push(record)
            }
        }
        return records

    }
}

class Field {
    constructor(name, type, value, encoding = "ascii", dateOffset = 0) {
        this.name = name
        this.type = type
        this.valueBuffer = value
        this.hasBeenProperlyDecoded = true
        //                         |      |           fType  fSize(decimal)                                     |
        switch (this.type) {
            case 1:
                //        |      |            $01     v   "A"  Alpha                                   |
                this.value = value.toString(encoding)
                break
            case 2:
                //        |      |            $02     4   "D"  Date                                    |
                this.value = convertDate(this.valueBuffer)
                break
            case 3:
                //        |      |            $03     2   "S"  Short integer                           |
                var test = unsetBit(this.valueBuffer)
                this.value = test ? test.readUInt16LE() : test
                break
            case 4:
                //        |      |            $04     4   "I"  Long integer                            |
                var test = unsetBit(this.valueBuffer)
                this.value = test ? test.readUInt32LE() : test
                break
            case 5:
            //        |      |            $05     8   "$"  currency                                |
            case 6:
                //        |      |            $06     8   "N"  Number                                  |
                this.value = -value.readDoubleBE()
                break
            case 9:
                //        |      |            $09     1   "L"  Logical                                 |
                var test = unsetBit(this.valueBuffer)

                if (!test) {
                    this.hasBeenProperlyDecoded = false
                    //I'm not sure what it means when the boolean is completely filled with zeroes i.e 0x00 or 00000000
                }
                this.value = test ? test.readUInt8() : test

                break
            case 20:
                //        |      |            $14     4   "T"  Time                                    |
                throw '"Time" data type is currently unsupported!'
                //break
            case 21:
                //        |      |            $15     8   "@"  Timestamp                               |
                this.hasBeenProperlyDecoded = false
                //I have noticed that the timestamps are off by a few minutes, so there is dateOffset to correct for that

                this.value = convertTimestamp(this.valueBuffer, dateOffset)
                break
            case 22:
                //        |      |            $16     4   "+"  Autoincrement                           |
                var test = unsetBit(this.valueBuffer)
                this.hasBeenProperlyDecoded = false
                this.value = test ? test.readUInt32LE() : test
                break
            case 12:
            //        |      |            $0C     v   "M"  Memo BLOb                               |
            case 13:
            //        |      |            $0D     v   "B"  Binary Large Object                     |
            case 14:
            //        |      |            $0E     v   "F"  Formatted Memo BLOb                     |
            case 15:
            //        |      |            $0F     v   "O"  OLE                                     |
            case 16:
            //        |      |            $10     v   "G"  Graphic BLOb                            |
            case 23:
            //        |      |            $17    17*  "#"  BCD                                     |
            case 24:
                //        |      |            $18     v   "Y"  Bytes                                   |

                //I will leave the decoding of these data types for the user of this library because I guess it depends on the type of data stored, unless you'd like to contribute to this proyect
                this.hasBeenProperlyDecoded = false
                this.value = this.valueBuffer
                break
            default:
                this.hasBeenProperlyDecoded = false
                this.value = this.valueBuffer
                break
        }
    }
}

function dumpToCSV(table){
    // TODO
}

if (!module.parent) {
    if (argv.f) {
        var file = fs.readFileSync(argv.f)
        var t = new ParadoxTable(file)
        dumpToCSV(table)
    } else {
        console.log("-f argument required")
    }

}


module.exports = ParadoxTable



