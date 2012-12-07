/**
 * Created with JetBrains WebStorm.
 * User: kelly
 * Date: 27/11/2012
 * Time: 11:55
 * To change this template use File | Settings | File Templates.
 */
var oracle = require('db-oracle');
var test = require('tap').test;
var db = new oracle.Database({
  "hostname":"nroracle.c45ztkc43hj8.us-east-1.rds.amazonaws.com",
  "database":"NRORACLE",
  "user":"nroracle",
  "password":"aw3se4dr5",
  "port":1521
});

db.connect();

db.on("error",function (err){
   console.log("ERRROR OCURRED WITH DB", err);
});

db.on("ready", function (err){
  console.log("db is ready starting tests");
  test("suite of tests for oracle", function (t){
    t.plan(5);
    t.test("creating data", function(t){
      var timestamp = new Date().getTime();
      db.query().insert("USERS","USERID,USERNAME",[timestamp,"someone"]).execute(function (err, ok){
        t.equal(err, null, "inserted ok " + err);
        console.log(ok);
        t.end();
      });
    });
    t.test("commiting data", function (t){
      db.query().execute("commit", function (err, ok){
        t.equal(err, null, "commited ok " + err);
        console.log(ok);
        t.end();
      });

    });
    t.test("updating data", function (t){
      var query = db.query().update("USERS").set({"USERNAME":"xyz"});
      query.execute(function (err, ok){
        t.equal(err, null, "updated ok " + err);
        console.log(ok);
        db.query().execute("commit", function (err, ok){
          t.equal(err, null, "commited ok " + err);
          console.log(ok);
          t.end();
        });
      });

    });

    t.test("reading data ", function (t){
      db.query().select("*").from("USERS").where("username=?",["xyz"]).execute(function (err, rows){
        t.equal(err, null, "err is null for reading from db" + err);
        console.log(rows);
        t.end();
      });
    });
    t.test("deleting data", function (t){
      db.query().delete("USERS").where("username=?",["xyz"]).execute(function(err, rows){
        console.log(rows);
        t.equal(err, null, "err is null for deleting from db" + err);
        db.query().execute("commit", function (err, ok){
          t.equal(err, null, "commited ok " + err);
          console.log(ok);
          t.end();
        });
      });

    });
  });
});
