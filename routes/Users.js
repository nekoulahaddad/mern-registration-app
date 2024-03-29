const express = require("express");
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("config");

router.post('/',(req,res) => {
const {name,email,password} = req.body;
if (!name || !email || !password) {
return res.status(400).json({msg : "please fill all things"});
}
User.findOne({email}).then(user => {
if (user) return res.status(400).json({msg : "this user is already exist"});
const newUser = new User({
	name,
	email,
	password
});
// tashfeer al password ( mn al mawke3 metl ma hie copy and paste)
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
    if (err) throw err;
   	newUser.password = hash;
   	newUser.save()
   	.then(user => {
   		jwt.sign({id : user.id},config.get("jwtsecret"),{expiresIn : 3600}, (err,token) => {
   			if (err) throw err;
   			res.json({
   				token,
   				user : {
   					id:user.id,
   					name:user.name,
   					email:user.email   				
   				}

   			});
   		})
   	});
   })
})
})
});


module.exports = router;