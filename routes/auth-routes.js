const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    //res.send('logging out');
    req.logout();
    res.redirect('/');
});

// auth with google+
// router.get('/google', (req, res) => {
//     // handle with passport
//     res.send('logging in with Google');
// });
router.get('/google',passport.authenticate('google',{
  scope:['profile']
}));

//callback route
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
  //res.send("Reached Reddirect URI");
  //res.send(req.user);
  res.redirect('/profile');
});

module.exports = router;
