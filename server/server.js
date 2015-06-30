
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
app.get('/', home.index);
app.get('/login', user.getLogin);
app.post('/login', user.postLogin);
app.get('/logout', user.logout);
app.get('/signup', user.getSignup);
app.post('/signup', user.postSignup);

// account
app.get('/account/:id', account.get);
app.post('/account', account.add);
app.put('/account', account.update);
app.delete('/account', account.delete);


// group
app.get('/group/:id', group.getGroup);
app.get('/groups', group.getGroups);
app.post('/group', group.create);
app.delete('/group', group.delete);
app.put('/group', group.update);

// activity
app.get('/activity/:id', act.getGroup);
app.get('/activities', act.getGroups);
app.post('/activity', act.create);
app.put('/activity', act.update);
app.delete('/activity', act.delete);

// app setting
app.set('port', config.port || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
