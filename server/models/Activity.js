/*
 *
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema

var ActivityClassify = 'others sport party'.split(' ')
var Activity = new Schema({
  beginAt: {
    type: Date,
    required: true
  },

  endAt: {
    type: Date,
    required: true
  },

  classify: {
    type: String,
    enum: ActivityClassify,
    default: ActivityClassify[0]
  },

  price: {
    type: Number,
    default: 0
  },

  pMax: {
    type:Number,
    required: true
  },

  pMin: {
    type: Number,
    default: 0
  },

  info: String,

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
  },
  deletedAt: Date,
  deleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Activity', Activity);
