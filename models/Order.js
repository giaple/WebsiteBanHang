var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    orderId: {
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
        phoneNumber:{type: String, required: true},
        Other: [[]]
    }
},{
    versionKey: false // You should be aware of the outcome after set to false
},{collection: 'order'});

module.exports = mongoose.model('order',schema);