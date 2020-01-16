const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

 const pool = require('../configs/database');
 const helpers = require('../lib/helpers');

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { fullname } = req.body;
    let newUser = {
        username,
        password,
        fullname
    };
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query(`insert into users (username, password, fullname) values ('${newUser.username}', '${newUser.password}', '${newUser.fullname}')`);
    newUser.id = result.insertId;
    return done(null, newUser);
}));

//------------------------------------------signin
passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
    }, async (req, username, password, done) => {
        const rows = await pool.query('select * from users where username = ?',[username]);
        if(rows.length > 0){
            const user = rows[0];
            const validPassword = helpers.matchPassword(password, user.password);
            console.log(validPassword);
            if(validPassword){
                done(null, user);
            }else {
                done(null,false);           
            }
        }else{
            return done(null, false);
        }
}));

passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
    const rows = await pool.query('select * from users where id = ?',[id]);
    done(null, rows[0]);
});
