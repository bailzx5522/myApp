
// module dependencies
var express = require('express');
var app = express();
var io = require('socket.io')
var http = require('http');
var server = http.createServer(app)
var io = io.listen(server)
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


// log setting
/*
var log4js = require('log4js');
log4js.configure({
  appenders: [{
    type: 'console'
  },
  {
    type: 'file',
    filename: '/tmp/app_server.log',
    maxLogSize: 1024,
    backups:3,
    category: 'normal'
  }],
  replaceConsole: true
})
var logger = log4js.getLogger('normal');
logger.setLevel('DEBUG');
app.use(log4js.connectLogger(this.logger('normal'), {level:'auto', format:':method :url'}));
exports.logger = function(name) {
  var logger = log4js.getLogger(name)
  logger.setLevel("DEBUG")
  return logger
}
*/

// Config
var config = JSON.parse(fs.readFileSync('./config.js', 'utf8'));

require('./routes/api')(app)

// socket server
require('./sockets/base')(io)

server.listen(5000, function() {
  console.log('\nHttp listen 5000')
})

// app setting
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

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
