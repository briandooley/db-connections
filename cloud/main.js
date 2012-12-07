exports.testMssql = function (params, cb){
  var test_mssql = require('./test_mssql.js');
  setTimeout(function(){
    cb(undefined,{});
  },8000);
};

exports.testMssqlOld = function (params, cb){
  var test_mssql = require('./test_mssql_2005.js');
  setTimeout(function(){
    cb(undefined,{"done":"oracle"});
  },10000);
};

exports.testOracle = function (params, cb){
  var oracleTest = require('./test_oracle.js');
  setTimeout(function(){
    cb(undefined,{"done":"oracle"});
  },12000);
};