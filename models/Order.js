var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    maOrder: {
        type: String,
        required : true
    },
    status: {
        type: String,
        enum: ['PENDING','PROCESSING','COMPLETED'],
        default: 'PENDING'
    },
    totalPrice: {
        type: Number,
        required: true
    },
    listProduct:{
        type:[[]],
        required: true
    },
    guestInfor:{
        Name:{type: String, required: true},
        Email:{type: String, required: true},
    }
})