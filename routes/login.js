var session = require('express-session');
var systemMessages = require('../systemMessages');

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var User = require('../Schemas/users');

exports.viewLogin = function(req, res) {
	res.render('login');
}

exports.validateLogin = function(req, res) {
	var fields = req.body;
	User.findOne({ email : fields.email }, function(err, data) {
		if(data) {
			if(data.password === fields.password) {
				req.session.email = data.email;
				req.session.version = Math.floor(Math.random() * 10) < 5 ? 'A' : 'B';
				res.redirect('/classes');
			} else {
				res.send({
					err : 'Invalid Password'
				});
			}
		} else {
			var output = 'User ' + fields.email + ' does not exist, Register first!'
			res.send({
				err : output
			})
		}
	});
}

exports.logout = function(req, res) {
	req.session.email = null;
	req.session.version = null;
	res.redirect('/');
}