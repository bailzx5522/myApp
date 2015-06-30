var User = require('../models/User');


// login page
exports.getLogin = function(req, res) {
  if (req.user) return res.redirect('/');
  res.render('account/login', {
    title: 'Login'
  });
};


// login by user & password
exports.postLogin = function(req, res) {

    mobile = req.body.mobile;
    password = req.body.password;
    email = req.body.email;

    console.log('cookies: ',req.signedCookies)
    cookies = req.signedCookies
    if (cookies) {
        // redirect /
        return res.send('login');
    }

    User.findOne({ mobile: mobile }, function(err, user) {
        if (user){
            user.comparePassword(password, function(err, isMatch){
                if (err) return res.send(err);
                if (isMatch){
                    res.cookie('user', user, {signed:true});
                    return res.send("match");
                }else{
                    return res.send("dismatch");
                }
            })
        }else{
            return res.send('user is not exist');
        }
    })
};

/**
 *  * GET /logout
 *   * Log out.
 *    */
exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

/**
 *  * GET /signup
 *   * Signup page.
 *    */
exports.getSignup = function(req, res) {
  if (req.user) return res.redirect('/');
  res.render('account/signup', {
    title: 'Create Account'
  });
};


exports.postSignup = function(req, res, next) {
  var user = new User({
    mobile: req.body.mobile,
    email: req.body.email,
    password: req.body.password
  });

  User.findOne({ mobile: req.body.mobile }, function(err, existingUser) {
    if (existingUser) {
      return res.send(existingUser.mobile + ' already exists');
    }

    user.save(function(err) {
        if (err) {
            console.log('error ', err);
            return res.send(err);
        }
        res.cookie('user', user);
        return res.send('success sign in and login.');
    });
  });
};
