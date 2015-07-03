/*
 * Group is used for people talking and organize activity
 * There are different roles.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema

var Account = Schema({
  userId: {
    type: Number,
    ref: 'User'
  },

  balance: {
    type: Number,
    default: 0
  },

  points: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  },

  deletedAt: Date,
  deleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Account', Account);
