
// module dependencies
var express = require('express');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var logger = require('morgan');
var path = require('path');
var fs = require('fs');
var passport = require('passport');
var cookieParser = require('cookie-parser');

// db
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/myapp');

// controllers
var home = require('./controllers/home');
var userController = require('./controllers/user');
var groupController = require('./controllers/group');

// Config
var config = JSON.parse(fs.readFileSync('./config.js', 'utf8'));
app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser('myapp'));
app.use(methodOverride());      // simulate DELETE and PUT

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// app routes
app.get('/', home.index);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
//app.get('/account', passportConf.isAuthenticated, userController.getAccount);
//app.post('/account/profile', passportConf.isAuthenticated, userController.postUpdateProfile);
//app.post('/account/password', passportConf.isAuthenticated, userController.postUpdatePassword);
//app.post('/account/delete', passportConf.isAuthenticated, userController.postDeleteAccount);
app.post('/group', groupController.postGroup);

app.set('port', config.port || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
