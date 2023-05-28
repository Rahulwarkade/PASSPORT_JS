var express = require('express');
var router = express.Router();
var localStrategy = require('passport-local');
var userModel = require('./users');
var passport = require('passport');

passport.use(new localStrategy(userModel.authenticate()));
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/profile',function(req,res){
  var user = req.session.passport.user;
  res.render('profile',{user});
})

router.post('/register',function(req,res){
  var newUser = new userModel(
    {
      username : req.body.username,
      email : req.body.email,
      number : req.body.number
    }
  )
  userModel.register(newUser,req.body.password)
  .then(function(u){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/profile');
    })
  })
});

router.post('/login',passport.authenticate('local',
{
  successRedirect: '/profile',
  failureRedirect: '/'
}),function(req,res){});

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req,res)
{
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect('/');
  }
}
module.exports = router;
