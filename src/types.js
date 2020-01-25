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
    constructor(buffer, offset, bigEndian = true){
        this.upperlimmit = offset + 1
        this.buffer = buffer.slice(offset, this.upperlimmit)
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

class char {
    constructor(buffer, offset, bigEndian = true){
        this.upperlimmit = offset + 1
        this.buffer = buffer.slice(offset, this.upperlimmit)
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
    constructor(buffer, offset, bigEndian = true){
        this.upperlimmit = offset + 2
        this.buffer = buffer.slice(offset, this.upperlimmit)
        this.bigEndian = bigEndian
    }
    
    getValue(){
        if(this.bigEndian){
            return this.buffer.readUInt16BE()
        } else {
            return this.buffer.readUInt16LE()
        }
    }
}

class word {
    constructor(buffer, offset, bigEndian = true){
        this.upperlimmit = offset + 2
        this.buffer = buffer.slice(offset, this.upperlimmit)
        this.bigEndian = bigEndian
    }
    
    getValue(){
        if(this.bigEndian){
            return this.buffer.readUInt16BE()
        } else {
            return this.buffer.readUInt16LE()
        }
    }
}


class longint {
    constructor(buffer, offset, bigEndian = true){
        this.upperlimmit = offset + 4
        this.buffer = buffer.slice(offset, this.upperlimmit)
        this.bigEndian = bigEndian
    }
    
    getValue(){
        if(this.bigEndian){
            return this.buffer.readUInt32BE()
        } else {
            return this.buffer.readUInt32LE()
        }
    }
}

class pchar {
    constructor(buffer, offset, bigEndian = true){
        this.upperlimmit = offset + 4
        this.buffer = buffer.slice(offset, this.upperlimmit)
        this.bigEndian = bigEndian
    }
    
    getValue(){
        if(this.bigEndian){
            return this.buffer.readUInt32BE()
        } else {
            return this.buffer.readUInt32LE()
        }
    }
}

class pointer {
    constructor(buffer, offset, bigEndian = true){
        this.upperlimmit = offset + 4
        this.buffer = buffer.slice(offset, this.upperlimmit)
        this.bigEndian = bigEndian
    }
    
    getValue(){
        if(this.bigEndian){
            return this.buffer.readUInt32BE()
        } else {
            return this.buffer.readUInt32LE()
        }
    }
}

class TFldInfoRec {
    constructor(buffer, offset, bigEndian = true){
        this.upperlimmit = offset + 2
        this.buffer = buffer.slice(offset, this.upperlimmit)
        this.fTypeBuffer = this.buffer.slice(0, 1)
        this.fSizeBuffer = this.buffer.slice(1, 2)
        this.bigEndian = bigEndian
    }

    addName(name){
        this.name = name
    }

    /*
|      |           fType  fSize(decimal)                                     |
|      |           -------------------------                                 |
|      |            $01     v   "A"  Alpha                                   |
|      |            $02     4   "D"  Date                                    |
|      |            $03     2   "S"  Short integer                           |
|      |            $04     4   "I"  Long integer                            |
|      |            $05     8   "$"  currency                                |
|      |            $06     8   "N"  Number                                  |
|      |            $09     1   "L"  Logical                                 |
|      |            $0C     v   "M"  Memo BLOb                               |
|      |            $0D     v   "B"  Binary Large Object                     |
|      |            $0E     v   "F"  Formatted Memo BLOb                     |
|      |            $0F     v   "O"  OLE                                     |
|      |            $10     v   "G"  Graphic BLOb                            |
|      |            $14     4   "T"  Time                                    |
|      |            $15     8   "@"  Timestamp                               |
|      |            $16     4   "+"  Autoincrement                           |
|      |            $17    17*  "#"  BCD                                     |
|      |            $18     v   "Y"  Bytes                                   |
    */
    
    getValue(){
        if(this.bigEndian){
            return this.buffer.readUInt16BE()
        } else {
            return this.buffer.readUInt16LE()
        }
    }

    getType(){
        return this.fTypeBuffer.readUInt8()
    }

    getSize(){
        return this.fSizeBuffer.readUInt8()
    }
}
    
module.exports = {
    byte,
    char,
    integer,
    longint,
    pchar,
    word,
    pointer,
    TFldInfoRec
}