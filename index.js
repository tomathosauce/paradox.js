const fs = require("fs")

var file = fs.readFileSync("./tarticulos.DB")

/*
 Pascal terms are used to describe data types:
     byte is 1 byte unsigned;
     integer is a 2-byte signed integer;
     word is a 2-byte unsigned integer;
     longint is a 4-byte signed integer;
     char is a 1-byte character;
     pchar is a pointer to a character;
     ^ modifies any type definition to a pointer to that type;
     ^pchar is a pointer to a pointer to a character.
     */

class byte {
    constructor(buffer, bigEndian = true){
        this.buffer = buffer
        this.bigEndian = bigEndian
    }

    getValue(){
        if(this.bigEndian){
            return this.buffer.readUInt8()
        } else {
            return this.buffer.reverse().readUInt8()
        }
    }
}

class integer {
    constructor(buffer, bigEndian = true){
        this.buffer = buffer
        this.bigEndian = bigEndian
    }
    
    getValue(){
        if(this.bigEndian){
            return this.buffer.readUInt16LE()
        } else {
            return this.buffer.reverse().readUInt16LE()
        }
    }
}

class longint {
    constructor(buffer, bigEndian = true){
        this.buffer = buffer
        this.bigEndian = bigEndian
    }
    
    getValue(){
        if(this.bigEndian){
            return this.buffer.readBigInt64LE()
        } else {
            return this.buffer.reverse().readBigInt64LE()
        }
    }
}

class Header {
    constructor(buffer){
        this.recordSize = new integer (buffer.slice(0,2), false) 
        this.headerSize = new integer (buffer.slice(3,5), false)
        this.fileType = new byte (buffer.slice(4,5))
        this.maxTableSize = new byte(buffer.slice(5,6))
        this.numRecords = new longint(buffer.slice(6,10))
    }
}

var h = new Header(file)

console.log(h.numRecords.getValue())