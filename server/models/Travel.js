const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const travelSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },

    continents: {
        type: Number,
        default: 1
    },

    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

travelSchema.index({//검색을 할때 가중치를 설정해줌.
    title: 'text',
    description: 'text'
}, {
    weights: {//title이 description에 비해 5배 더 중요하게 여긴다는 의미.
        title: 5,
        description: 1
    }
})


const Travel = mongoose.model('Travel', travelSchema);

module.exports = { Travel }