/**
* Cardmessages.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	schema: true,
  attributes: {
    userTo: {
        model:'users', required : true 
    },
    userFrom: {
        model:'users', required : true 
    },
    albumcard: {
        model:'albums', required:true
    },    
    msg : { type: 'string', required : true },
    toJSON: function () {
      var obj = this.toObject();
      return obj;
    }
  }
};

