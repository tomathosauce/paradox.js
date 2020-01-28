# Paradox.js

A library for reading paradox database files (*.db)

***

### Usage

You have to import the ParadoxTable and use `.returnRecords()` method in order to get all records. 

When the file size exceeds 100mb it will produce a memory error, so use `--max-old-space-size=8000` whenever necessary.

***

### TODO

1. Test all data types.
2. Write a function that can make a query to the database
3. Write a function that converts a table into `.csv` format.
4. If possible, improve perfomance and maybe do some refactoring.

***

There are some links below, as well as some documentation written by Randy Beck and Kevin Mitchell in `/documents` in case you want to contribute:

+ https://www.prestwoodboards.com/ASPSuite/kb/document_view.asp?qid=100060
+ https://sourcedaddy.com/ms-access/understanding-field-data-types.html
+ https://nodejs.org/api/buffer.html#buffer_buf_write_string_offset_length_encoding
+ https://gist.github.com/BertrandBordage/9892556#file-paradox-py-L42
