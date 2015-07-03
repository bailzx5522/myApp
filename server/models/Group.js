/*
 * Group is used for people talking and organize activity
 * There are different roles.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema

var Group = new Schema({
  _creator: {
    type: Schema.Types.ObjectId,
    ref : 'User'
  },
  name: {
    required: true,
    type: String,
    trim: true
  },

  members: [{
    id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      //required: true
    },
    level: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      //required: true
    }
  }],

  type: {
    type: String,
    default:''
  },
  sport: {
    type: String,
    default: ''
  },
  location:{
    type:String,
    defalut:''
  },
  /*
  membersHis: [{
  }],

  activitiesHis: [{
  }],
  */

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
  deletedAt: {
    type: Date,
    default: Date.now
  },
  deleted: Boolean
});

module.exports = mongoose.model('Group', Group);
