
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
var account = require('./controllers/account');
var activity = require('./controllers/activity');
var group = require('./controllers/group');
var home = require('./controllers/home');
var user = require('./controllers/user');
var auth = require('./controllers/auth')

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

// user
app.get('/user', user.getUsers)
app.get('/user/:id', user.getUser)
app.post('/user', user.create)
app.put('/user', user.update)
app.delete('/user', user.delete)

// auth
app.get('/', home.index);
app.get('/login', auth.getLogin);
app.post('/login', auth.postLogin);
app.get('/logout', auth.logout);
app.get('/signup', auth.getSignup);
app.post('/signup', auth.postSignup);

// account
app.get('/account/:id', account.get);
app.post('/account', account.create);
app.put('/account', account.update);
app.delete('/account', account.delete);

// activity
app.get('/activity/:id', activity.getActivity);
app.get('/activity', activity.getActivities);
app.post('/activity', activity.create);
app.put('/activity', activity.update);
app.delete('/activity', activity.delete);

// group
app.get('/group/:id', group.getGroup);
app.get('/group', group.getGroups);
app.post('/group', group.create);
app.delete('/group', group.delete);
app.put('/group', group.update);

// app setting
app.set('port', config.port || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
