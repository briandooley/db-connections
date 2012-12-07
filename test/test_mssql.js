 /**
 * Created with JetBrains WebStorm.
 * User: Craig Brookes
 * Date: 27/11/2012
 * Time: 11:55
 * To change this template use File | Settings | File Templates.
 */
var test = require('tap').test;
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;


var config = {
  "userName":"nrmssql",
  "password":"aw3se4dr5",
  "server":"nrmssql.c45ztkc43hj8.us-east-1.rds.amazonaws.com",
  "options":{
     "port":1433,
     "database":"testing"
  }
};




var connection = new Connection(config);
connection.on("errorMessage", function(err){
    console.log(err);
});

connection.on("connect", function (err){
   test("test mssql", function (t){

     t.plan(5);
     t.test("connected ok", function (t){
      t.equal(err,undefined,"no error on connect");
      t.end();
     });
     t.test("inserting data", function (t){
       var req = new Request("INSERT INTO testing.guest.users (userid, username) VALUES (3, N'craig')", function (err, ok){
         t.equal(err,undefined,"no error on insert");
         t.end();

       });
       connection.execSql(req);
     });
     t.test("updating data", function (t){
        var req = new Request("UPDATE testing.guest.users SET username = N'james' WHERE username = N'craig'", function(err, ok){
          t.equal(err,undefined,"no error on update");
          t.end();
        });
       connection.execSql(req);
     });
     t.test("reading data", function (t){
        var req = new Request("SELECT * FROM testing.guest.users", function (err, ok){
          t.ok(ok > 0, "more than 0 rows found");
          t.end();
        });
       connection.execSql(req);
     });
      t.test("deleting data", function (t){
        var req =  new Request("DELETE FROM testing.guest.users WHERE username = N'james'", function (err, ok){
          t.equal(err, undefined, "delete completed without error");
          t.end();

        });
        connection.execSql(req);
     });
   });
});
