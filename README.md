#Paradox.js
***

A library for reading paradox database files (*.db)

###Usage

You have to import the ParadoxTable and use `.returnRecords()` method in order to get all records.

***

###TODO

1. Improve `convertTimestamp` function.
2. Add support for "Time" data type by writing `convertTime` function.
3. Test all data types.
4. Write a function that can make a query to the database
5. Write a function that converts a table into `.csv` format.
6. If possible, improve perfomance and maybe do some refactoring.

***

There are some links below and some documentation in `/documents` in case you want to contribute

+ https://www.prestwoodboards.com/ASPSuite/kb/document_view.asp?qid=100060
+ https://sourcedaddy.com/ms-access/understanding-field-data-types.html
+ https://nodejs.org/api/buffer.html#buffer_buf_write_string_offset_length_encoding
+ https://gist.github.com/BertrandBordage/9892556#file-paradox-py-L42