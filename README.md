# Paradox.js

A library for reading paradox database files (*.db)


# Usage



```javascript
  var ParadoxTable = require("paradox.js")
  var fs = require("fs")
  
  var file = fs.readFileSync("path/to/file")
  var table = new ParadoxTable(file)
```

You have to import the ParadoxTable and use `.returnRecords()` method in order to get all records. When the file size exceeds 100mb it will probably produce a memory error, so the use `--max-old-space-size` flag when running a script.

### Creating a CSV file

```javascript
  table.dumpToCSV()
```

The `.dumpToCSV()` method will create a `output.csv` file. This method also accepts a callback which will receive an array of records (a record is an array of Fields) in case you want to have more control over the output.

### Notes

The following data types: Memo BLOb, Binary Large Object, Formatted Memo BLOb, OLE, Graphic BLOb, BCD and Bytes are currently not supported, so you will have to decode them yourself.

# TODO

1. Add support for more data types.
2. Write a function that can make a query to the database.
3. If possible, improve perfomance and maybe do some refactoring.

***

There are some links below, as well as some documentation written by Randy Beck and Kevin Mitchell in `/documents` in case you want to contribute:

+ https://www.prestwoodboards.com/ASPSuite/kb/document_view.asp?qid=100060
+ https://sourcedaddy.com/ms-access/understanding-field-data-types.html
+ https://nodejs.org/api/buffer.html#buffer_buf_write_string_offset_length_encoding
+ https://gist.github.com/BertrandBordage/9892556#file-paradox-py-L42
