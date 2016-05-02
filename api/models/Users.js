/**
* Users.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var CryptoJS = require("crypto-js");

module.exports = {

  schema: true,
  attributes: {
    	email: {
      type: 'email',
      required: 'true',
      unique: true 
    },
  	password: {
      type: 'string',
      required: 'true'      
    },
    encryptedPassword: {
      type: 'string'
    },
      toJSON: function () {
      var obj = this.toObject();
      delete obj.encryptedPassword;
      return obj;
    }
  },
   beforeCreate : function (values, next) {
   	
   			var hash = CryptoJS.AES.encrypt(values.password, 'rubik74');
   			//var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase");
   			//var hash = CryptoJS.SHA1(values.password);
   			
				//var base64 = hash.toString(CryptoJS.enc.Base64)
				//var base64 = hash.ciphertext.toString(CryptoJS.enc.Base64);
				var base64 = hash.ciphertext.toString(CryptoJS.enc.Base64);
   			console.log("CryptoJS inizio");
   			console.log(base64);
   			
   			console.log("CryptoJS fine");
   			//console.log(ciphertext);
        values.encryptedPassword = hash.toString();
        next();
   },
  comparePassword : function (password, user, cb) {
  	console.log("comparePassoword")
  	console.log(password);
  	console.log('user encrypted: ');
  	console.log(user.encryptedPassword);
  	var decrypted = CryptoJS.AES.decrypt(user.encryptedPassword.toString(), "rubik74").toString(CryptoJS.enc.Utf8);
  	console.log('password decrypted: ');
  	console.log(decrypted);
  	console.log(decrypted.toString());
  	//console.log(typeof(hash));
  	/*console.log("test");
  	var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase");
    var decrypted = CryptoJS.AES.decrypt(encrypted.toString(), "Secret Passphrase").toString(CryptoJS.enc.Utf8);
    console.log(encrypted.toString());
    console.log(decrypted.toString());
    console.log(decrypted.toString(CryptoJS.enc.utf8));
    console.log(decrypted.toString(CryptoJS.enc.utf16));
    console.log(decrypted.toString(CryptoJS.enc.base64));
    
    console.log("fine test");*/
    console.log("confronto ["+ decrypted + "] " + " ["+password+"]");
  	if (decrypted == password) {  		
  		console.log("password uguali");
  		cb(null,true);
  		//next();
  	}
  	else {
  		console.log("password non coincidono");
  		cb(null, false);
  		//next();
  	}
    /*bcrypt.compare(password, user.encryptedPassword, function (err, match) {
      if(err) cb(err);
      if(match) {
        cb(null, true);
      } else {
        cb(err);
      }
    })*/
  }
};

