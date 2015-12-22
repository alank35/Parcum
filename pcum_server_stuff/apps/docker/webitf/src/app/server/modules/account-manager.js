
var crypto 		= require('crypto')

var _mysql = require('mysql');

var mysql = _mysql.createConnection({
	host: 'dbbackend',
	port: 3306,
        user: 'parcum',
	password: 'mucrap',
	database: 'parksome'
});

/* login validation methods */

exports.autoLogin = function(user, pass, callback)
{
        mysql.query('SELECT * FROM users WHERE username = ?', [user], function(err,rows, fields) {
		if (err) console.log("Err is", err);
                if (fields) console.log("Fields is", fields);
                if (rows) console.log("autoLogin Rows is", rows);
                if (rows.length) {
                   rows[0].password == pass ? callback(rows[0]): callback(null);
                } else {
                   callback(null);
                }
	});
}

exports.manualLogin = function(user, pass, callback)
{
        mysql.query('SELECT * FROM users WHERE username = ?', [user], function(err,rows, fields) {
		if (err) console.log("Err is", err);
                if (fields) console.log("Fields is", fields);
                if (rows) console.log("Rows is ", rows);
		if (rows.length == 0) {
			console.log("user not found");
			callback('user-not-found');
		} else {
			validatePassword(pass, rows[0].password, function(err, res) {
				if (res){
					console.log("password ok");
					callback(null, rows[0]);
				} else {
					console.log("password bad");
					callback('invalid-password');
				}
			});
		}
	});
}

/* record insertion, update & deletion methods */

exports.addNewAccount = function(newData, callback)
{
//	accounts.count({username:newData.user}, function(e, o) {
        mysql.query('SELECT COUNT(*) AS usersCount FROM users WHERE username = ?', [newData.username], function(err,rows, fields) {
                if (rows) console.log("(addNewAccount)Rows is", rows);
		if (rows[0].usersCount!=0){
			callback('username-taken');
		} else {
//			accounts.count({email:newData.email}, function(e, o) {
        		mysql.query('SELECT COUNT(*) AS emailsCount FROM users WHERE email = ?', [newData.email], function(err,rows, fields) {
				if (rows[0].emailsCount!=0) {
					callback('email-taken');
				} else {
					saltAndHash(newData.password, function(hash){
						newData.password = hash;
						console.log("pwhash is", hash);
						mysql.query('INSERT INTO users SET ?', [newData], function(err,res) {
 							console.log('Last insert ID:', res.insertId);
							callback(null);
						});
					});
				}
			});
		}
	});
}

exports.updateAccount = function(newData, callback) {
	console.log("update account", newData);
//	accounts.findOne({username:newData.user}, function(e, o){
        mysql.query('SELECT * FROM users WHERE username = ?', [newData.username], function(err,rows, fields) {
		console.log("updateAccount: rows is: ", rows);
		if (err || rows.length==0) {
			 callback('errir');
		} else {
			rows[0].username = newData.username;
			rows[0].email  	= newData.email;
			if (newData.pass == '') {
//				accounts.upsert(o, callback);
				mysql.query('UPDATE users SET ? WHERE user_id = ?', [rows[0], rows[0].user_id], function(err, result) {
					if (err || (result.length==0)) {
					   callback(err,null);
					} else {
					   callback(null,rows[0]);
					}
				});
			} else {
				saltAndHash(newData.pass, function(hash){
					rows[0].password = hash;
//					accounts.upsert(o, callback);
					mysql.query('UPDATE users SET ? WHERE user_id = ?', [rows[0], rows[0].user_id], function(err, result) {
						if (err || (result.length==0)) {
						   callback(err,null);
						} else {
						   callback(null,rows[0]);
						}
					});
				});
			}
		}
	});
}

exports.updatePassword = function(email, newPass, callback)
{
			console.log("update password, pass is:", newPass);
//	accounts.findOne({email:email}, function(e, o){
        mysql.query('SELECT * FROM users WHERE email = ?', [email], function(err,rows, fields) {
		if (err || (rows.length==0)) {
			callback(e, null);
		} else {
			saltAndHash(newPass, function(hash){
			        rows[0].password = hash;
//				accounts.upsert(o,callback);
				console.log("update record: ", rows[0]);
				mysql.query('UPDATE users SET ? WHERE user_id = ?', [rows[0], rows[0].user_id], function(err, result) {
					callback(err,rows[0]);
				});
			});
		}
	});
}

/* account lookup methods */

exports.deleteAccount = function(id, callback)
{
			console.log("delete account for id: ", id);
//	accounts.destroyAll({where:{ user_id: id }}, callback);
        mysql.query('DELETE FROM users WHERE user_id = ?', [id], function (err, result) {
            callback(err,result);
        });
}

exports.getAccountByEmail = function(email, callback)
{
			console.log("get account by email");
//	accounts.findOne({where:{email:email}}, function(e, o){ callback(o); });
        mysql.query('SELECT * FROM users WHERE email = ?', [email], function(err,rows, fields) {
           if (rows.length) {
               callback(rows[0]);
           } else {
               callback(null);
           }
	});
}

exports.validateResetLink = function(email, passHash, callback)
{
			console.log("validateResetLink");
//	accounts.findOne({ where : {email:email, password:passHash} }, function(e, o){
        mysql.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, passHash], function(err,rows, fields) {
           if (rows.length) {
               callback('ok');
           } else {
               callback(null);
           }
	});
}

exports.getAllRecords = function(callback)
{
			console.log("getAllRecords");
//	accounts.all({} ,function(e, res) {
	mysql.query('SELECT * FROM users', function(err,res) {
		if (err) callback(err)
		else callback(null, res)
	});
};

exports.delAllRecords = function(callback) {
			console.log("delAllRecords");
//	accounts.destroyAll({}, callback); // reset accounts collection for testing //
}

/* private encryption & validation methods */

var generateSalt = function() {
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
}

var md5 = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback) {
	var salt = generateSalt();
	callback(salt + md5(pass + salt));
}

var validatePassword = function(plainPass, hashedPass, callback)
{
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(null, hashedPass === validHash);
}

/* auxiliary methods */

var getObjectId = function(id)
{
			console.log("getObjectId");
//	return accounts.db.bson_serializer.ObjectID.createFromHexString(id)
}

var findById = function(id, callback)
{
 
			console.log("findById");
//	accounts.findOne({where:{ user_id: id}},
//		function(e, res) {
//		if (e) callback(e)
//		else callback(null, res)
//	});
};


var findByMultipleFields = function(a, callback)
{
			console.log("findByMultipleFields");
//// this takes an array of name/val pairs to search against {fieldName : 'value'} //
//	accounts.find( { where : a } ).toArray(
//		function(e, results) {
//		if (e) callback(e)
//		else callback(null, results)
//	});
}
