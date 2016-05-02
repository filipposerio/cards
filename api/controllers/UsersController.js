/**
 * UsersController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function (req, res) {
    if (req.query.password !== req.query.confirmPassword) {

      return res.json(401, {err: 'Password doesn\'t match, What a shame!'});
     }
    console.log(req.query);
    //console.log("body");
    //console.log(req.query);
    
    Users.create(req.query).exec(function (err, user) {
    	if (err) {
        console.log("errore create: " + err);
        //console.log(err);
        //return res.json('errore' || err.status, {sserr: err});
        return res.json(401, err);
      }
      console.log("ok create");
      console.log(user);
      if (user) {
        // NOTE: payload is { id: user.id}
        res.json(200, {user: user, token: jwToken.issue({id: user.id})});
      }
    });
     
    }
};

