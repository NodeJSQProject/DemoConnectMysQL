var express = require('express')
var mysql = require('mysql')
var app = express();

var connection = mysql.createPool({
  connectionLimit:50,
  host: 'localhost',
  user:'root',
  password: '',
  database: 'sampleDB'
});

app.get('/', function(req, resp) {
    //about mysql
    connection.getConnection(function(error, tempCont) {
      if (!!error) {
        tempCont.release();
        console.log('Error')
      } else {
        console.log('Connected')
        tempCont.query('Select * from myTable', function(error, rows, fields) {
          tempCont.release()
          if (!!error) {
            console.log('Error in the query')
          } else {
            resp.json(rows)
          }
        })
      }
    })
})

app.listen(5000);
