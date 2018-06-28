const express = require('express')
const app = express()
var jwt = require('jsonwebtoken');
var path = require('path');
var mongoose = require('mongoose');
var User = require('./model/user');
var jwtConfig = require('./config/jwt');
var bodyParser = require('body-parser');
mongoose.connect('mongodb://zestgeek:zestgeek123@ds255930.mlab.com:55930/new_project');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("connected with database");
});
app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());
app.set('superSecret',jwtConfig.secret);
var port = process.env.PORT || 3001;
app.use(express.static(path.join(__dirname, 'dist')))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-access-token");
  next();
});
app.post('/register',(function(req, res) {
		console.log(req.body)
		var user = new User();
		User.findOne({"email": req.body.email}, function(err, user_data){
			if(err){
				console.log(err)
			}
			if(user_data){
				return res.status(400).json({
					message : "User already exist"
				});
			}

			user.username = req.body.username;
			user.password = req.body.password;
			user.confirm_password = req.body.confirm_password;
			user.email	   = req.body.email;

			user.save(function(err, login_data){
				if(err)
					return res.status(400).send(err);
				res.status(200).json({
          status:200,
					message : 'You have succesfully registered.'
				});
			});
		});
	}));


  app.post('/login',(function(req, res) {
  		User.findOne({"email": req.body.email, "password": req.body.password}, function(err, user_data){
  			if(err || !user_data){
  				return res.status(401).json({
  					status : 401,
  					message : "Invalid username and password.",
  				});
  			} else {
  				const payload = {
        				username: user_data.username
      			};
      			var token = jwt.sign(payload, app.get('superSecret'), {
            			expiresIn : 60*60*24 // expires in 24 hours
      			});
            console.log(user_data._id)
  				res.status(200).json({
            status  : 200,
            user_id : user_data._id,
  					message : "You have succesfully loggedin.",
  					token	: token
  				});
  			}
  		});
  	}));


  app.use(function(req,res,next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
      jwt.verify(token, app.get('superSecret'), function(err,decoded){
        if(err){
  		return res.json({status : 403,success:false, message:'Failed to authenticate token.'});
        } else {
  		req.decoded = decoded;
  		next();
        }
      });
    } else {
      return res.json({
        status : 403,
        success: false,
        message: 'No token provided.'
      });
    }
  });

  app.get('/user',(function(req, res) {
    User.findOne({_id: req.query.id}, function(err, user_data){
      if(err || !user_data){
        return res.status(401).json({
          message : "Invalid user id.",
        });
      } else{
        res.status(200).json({
          user_data
        });
      }
    })
  }));

   app.post('/userUpdate',(function(req, res) {
    User.findOne({$and : [{email: req.body.email},{_id:{$ne: req.body.id}}]}, function(err, user_data){
      if(err){
        console.log(err)
      }
      if(user_data){
        return res.status(400).json({
          status:400,
          message : "Email already exist"
        });
      }

      User.findOneAndUpdate({_id: req.body.id},{$set:{email:req.body.email,password:req.body.password}}, {new: true},function(err, doc){
      if(err){
          res.status(400).json({
            status:400,
            message : "User detail not updated"
          });
      } else {
        res.status(200).json({
          status: 200,
          message : "User detail updated succesfully"
        });
      }
      });

    })
  }));



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
