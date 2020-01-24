const fs = require("fs")
var argv = require('minimist')(process.argv.slice(1));
var {byte, integer, longint, char, pchar, word, pointer} = require("./src/types")



class ParadoxHeader {
    constructor(buffer){
        this.recordSize = new integer (buffer, 0, false) 

        this.headerSize = new integer (buffer, this.recordSize.upperlimmit, false)

        this.fileType = new byte (buffer, this.headerSize.upperlimmit)

        this.maxTableSize = new byte(buffer, this.fileType.upperlimmit)

        this.numRecords = new longint(buffer, this.maxTableSize.upperlimmit, false)

        this.nextBlock = new word(buffer, this.numRecords.upperlimmit)

        this.fileBlocks = new word(buffer, this.nextBlock.upperlimmit)

        this.firstBlock = new word(buffer, this.fileBlocks.upperlimmit)

        this.lastBlock = new word(buffer, this.firstBlock.upperlimmit)

        this.unknown = new word(buffer, this.lastBlock.upperlimmit)

        this.modifiedFlags1 = new byte(buffer, this.unknown.upperlimmit)

        this.indexFieldNumber = new byte(buffer, this.modifiedFlags1.upperlimmit)

        this.primaryIndexWorkspace = new pointer(buffer,this.indexFieldNumber.upperlimmit)

        this.unknown2 = new pointer(buffer, this.primaryIndexWorkspace.upperlimmit)

        //skipped bytes 1e-20,  see /documents/PxFORMAT.txt

        this.numFields = new integer(buffer, parseInt(21, 16))

        this.primaryKeyFields  = new integer(buffer, this.numFields.upperlimmit)

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

    }
}

if (!module.parent) {
    // this is the main module
    if(argv.f){
        var file = fs.readFileSync(argv.f)
        var h = new ParadoxHeader(file)
        console.log(h.numRecords.getValue())
    }
    
}






