var execFile = require('child_process').execFile;

execFile('./test_mssql.js', {}, function (err, stdout, sterr){
   console.log(err, stdout , sterr);
});
