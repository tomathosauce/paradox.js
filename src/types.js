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
    
module.exports = {
    byte,
    char,
    integer,
    longint,
    pchar,
    word,
    pointer
}