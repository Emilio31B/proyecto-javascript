const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
//const flash = require('connect-flash');
//const session = require('express-session');
//const MySQLStore=require('express-mysql-session');
//const { database } = require('./src/configs/keys');
const passport = require('passport');


//Initializations
const app = express();
require('./src/lib/passport');

//settings
app.set('port', process.env.PORT || 4000);
//app.set('views',path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(path.join(__dirname, 'views'),'layouts'),
    partialsDir: path.join(path.join(__dirname, 'views'),'partials'),
    extname: '.hbs',
    //helpers: require('../lib/handlebars')
}));
app.set('view engine', '.hbs');

//middlewares
/*app.use(session({
    secret: 'SmartHomeSensors',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());*/
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//global variables
app.use((req,res,next) => {
    app.locals.user = req.user;
    next();
    
});

//routes
app.use(require('./src/routes'));
app.use(require('./src/routes/authentication'));
app.use('/links',require('./src/routes/links'));
//public
app.use(express.static(path.join(__dirname,'public')));
//strating the server
app.listen(app.get('port'), () =>{
    console.log('Server in port', app.get('port'));
});