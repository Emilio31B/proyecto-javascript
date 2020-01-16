const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('local.signup', new LocalStrategy({
    usernameField: 'usernsme',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log(req.body);
    console.log('holamundo')
}));


//passport.serializeUser((usr, done) =>{

//});
