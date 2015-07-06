
// controllers
var account = require('../controllers/account');
var activity = require('../controllers/activity');
var group = require('../controllers/group');
var home = require('../controllers/home');
var user = require('../controllers/user');
var auth = require('../controllers/auth')
var chat = require('../controllers/chat')

module.exports = function(app, conf) {
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

  // app chat
  app.get('/chat', chat.get)
}
