/*
 * Maintain all trade details in system.
 *
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema

var tradeClass = 'activity goods others'.split[' ']
var tradeStatus = 'error failed success'.split[' ']

var Trade = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
    required: true
  },

  classify: {
    type: String,
    enum: tradeClass,
    defalut: ''
  },

  amount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: tradeStatus,
    default: tradeStatus[0]
  },

  createdAt: {
    type: Date
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

module.exports = mongoose.model('Trade', Trade);
