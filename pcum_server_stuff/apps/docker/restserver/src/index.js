
var express = require('express');
var app = express();
var port = 8080;

var _mysql = require('mysql');
var sqlHOST = 'dbbackend';
var sqlPORT = 3306;
var sqlUSER = 'parcum';
var sqlPASS = 'parcum';
var DATABASE = 'parksome';

var mysql = _mysql.createConnection({
	host: sqlHOST,
	port: sqlPORT,
	user: sqlUSER,
	password: sqlPASS,
});

mysql.query('use ' + DATABASE);

app.configure(function(){
   app.use(express.bodyParser());
   app.use(app.router);
});


app.get('/', function(req,res) {
// check if the credentials are saved in acookie //
   if (req.cookies.user == undefined || req.cookies.pass == undefined) {
      res.render('login',
          { locals:
             { title: 'Please Logon to the system' }
          }
      };
   } else {
   // auto login //
      AM.autoLogin(req.cookies.user, req.cookies.pass, function(o){
         if (o != null) {
            req.session.user=o;
            res.redirect('/home');
         } else {
            res.render('login',
                { locals:
                   { title: 'Please Logon to System' }
                }
            }; 
         }
      });
   }
});

app.post('/', function(req, res) {
   console.log(req.body);
   mysql.query('insert into location (civic_address_1, civic_address_2, civic_address_3, latitude, longtitude) values ("' + req.body.addr1 + '", "' + req.body.addr2 + '", "' + req.body.addr3 + '", "' + req.body.latitude + '", "' + req.body.longitude + '")',
function selectCb(err, result, fields) {
   if (err) throw err;
   else res.send('success');
});
});

app.listen(port);

console.log('running gurk:' + port);
