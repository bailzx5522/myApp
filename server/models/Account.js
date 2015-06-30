/*
 * Group is used for people talking and organize activity
 * There are different roles.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema

var Account = new Schema({
    
    userId: {
        type: Number,
        ref: 'User'
    },
    settings: {
        
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
    deleted: Boolean
});

//module.exports = mongoose.model('Group', Group);
export.Group = Group;
