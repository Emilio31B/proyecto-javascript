const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggenIn } = require('../lib/auth');

router.get('/signup', (req, res) =>{
    res.render('signup');
});

/*router.post('/signup', (req, res) => {
    passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup'    
    });
    res.send('received');
});*/


router.post('/signup', passport.authenticate('local.signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup'  
}));

router.get('/signin', (req, res) => {
    res.render('signin');
});

router.post('/signin',(req, res,next) => {
    passport.authenticate('local.signin',{
        successRedirect: '/profile',
        failureRedirect: '/signin'
    })(req, res, next);
});

router.get('/profile', isLoggenIn,(req, res) => {
    res.render('profile');
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
});
module.exports = router;