
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema
var sex = 'secret male female'.split(' ');

var userSchema = new Schema({
  mobile: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String,
  email: String,

  weibo: String,
  qq: String,
  weixin: String,

  displayName: {
    type: String,
    default: '',
    trim: true},
  gender: {
    type: String,
    enum: sex,
    defalut: sex[0]},
  level: {
    type: String,
    default: 0
  },

  location: String,
  picture: String,

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },

  deletedAt: Date,
  deleted: {
    type: Boolean,
    default: false
  }
});

userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

var model = mongoose.model('User', userSchema);
module.exports = model;
