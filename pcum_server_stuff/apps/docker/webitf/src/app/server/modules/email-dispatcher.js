
var ES = require('./email-settings');
var EM = {};
module.exports = EM;

EM.server = require("emailjs/email").server.connect({

	host 	    : ES.host,
	user 	    : ES.user,
	password    : ES.password,
	ssl		    : true

});

EM.dispatchResetPasswordLink = function(account, callback)
{
	EM.server.send({
		from         : ES.sender,
		to           : account.email,
		subject      : 'Password Reset',
		text         : 'Password Reset',
		attachment   : EM.composeEmail(account)
	}, callback );
}

EM.composeEmail = function(o)
{
	var link = 'http://localhost:8080/reset-password?e='+o.email+'&p='+o.password;
	var html = "<html><body>";
		html += "Hi "+o.username+",<br><br>";
		html += "Your username is :: <b>"+o.username+"</b><br><br>";
		html += "<a href='"+link+"'>Please click here to reset your password</a><br><br>";
		html += "</body></html>";
	return  [{data:html, alternative:true}];
}
