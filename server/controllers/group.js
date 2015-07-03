/*
 * Group is generate by the leader.
 */

var Group = require('../models/Group')

exports.create = function(req, res) {
  user = req.signedCookies.user
  if (user == undefined) {
    return res.send('You must login first!')
  }

  group = new Group({
    _creator: user._id,
    name: req.body.name,
    type: req.body.type,
    sport: req.body.sport,
    location: req.body.location,
  })
  group.save(function(err){
    if (err) {
      return res.send(err)
    }
    return res.json(group)
  })
}

exports.getGroups = function(req, res) {
  Group.find(function(err, groups) {
    if (err) {
      return res.send('error ', err)
    }
    return res.send(groups)
  })
}

exports.getGroup = function(req, res) {

  id = req.params.id
  Group.findOne(id, function(err, group) {
    if (err) {
      return res.send('error ', err)
    }
    return res.send(group)
  })
}

exports.delete = function(req, res) {
  return
}

exports.update = function(req, res) {
  cookies = req.signedCookies
  user = cookies.user
  if (!user) {
    return res.send('You must login first!')
  }

  Group.findById(req.body._id||req.body.id, function(err, group){
    if (err) {
      return res.send(err)
    }
    group.name = req.body.name
    group.type = req.body.type
    group.sport = req.body.sport
    group.location = req.body.location
    group.save(function(err, obj) {
      if (err) {
        return res.send(err)
      }
      //return res.status(200).json(obj)
    })
  })

  Group.findByIdAndUpdate(req.body._id, {
    $push: {
      members: req.body.members,
    }
  },{
    new: true
  }, function(err, obj) {
    if (err) {
      return res.send(err)
    }
    return res.status(200).json(obj)
  })
}
