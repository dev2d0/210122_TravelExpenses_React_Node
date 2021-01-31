const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followerSchema = mongoose.Schema({
    userTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userFrom : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true })


const Follower = mongoose.model('Follower', followerSchema);

module.exports = { Follower }