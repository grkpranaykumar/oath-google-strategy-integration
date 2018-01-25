const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user,done)=>{
  done(null,user.id);
});

passport.deserializeUser((id,done)=>{
  User.findById(id).then((user)=>{
    done(null,user);
  });
});

passport.use(
  new GoogleStrategy({
    //Options
    callbackURL: '/auth/google/redirect',
    clientID:keys.google.clientID,
    clientSecret:keys.google.clientSecret
  },(accessToken,refreshToken,profile,done)=>{
      //console.log(profile);
      User.findOne({googleId:profile.id}).then((currentuser)=>{
        if(currentuser){
          //console.log(currentuser," already exists");
          done(null,currentuser);
        }
        else{
            new User({
              googleId:profile.id,
              username:profile.displayName,
              thumbnail: profile._json.image.url
            }).save().then((newUser)=>{// becoz save function is asynchronous we return promise after its execution
              //console.log('new user created',newUser);
              done(null,newUser);
            });
        }
      })
  })
);
