/*
 * user controller
 *
 */

var User = require('../models/User')

exports.getUser = function(req, res) {
  id = req.params.id
  User.findOne(id, function(err, user) {
    if (err) {
      return res.send('error ', err)
    }
    return res.send(user)
  })
}

exports.getUsers = function(req, res) {
  User.find({}, function(err, list){
    if (err) {
      return res.send(err);
    }
    if (list) {
      return res.send(list)
    }
    return res.send('No any user')
  })
}

exports.create = function(req, res) {
  return
}

exports.update = function(req, res) {
  return
}

exports.delete = function(req, res) {
  return
}
