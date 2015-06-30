/*
 * Group is used for people talking and organize activity
 * There are different roles.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema

var Group = new Schema({
    _creator: {
        type: Number,
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

    settings: {
        type: {
            type: String,
            default:''
        },
        location:{
            type:String,
            defalut:''
        }
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
