var express = require('express');
var router = express.Router();

var authcheck = function(req,res,next){
  if(!req.user)
    res.redirect('/auth/login');
  else {
    next();
  }
}

/* GET users profile. */
router.get('/',authcheck, function(req, res) {
  res.render('profile',{user:req.user});
});

module.exports = router;
