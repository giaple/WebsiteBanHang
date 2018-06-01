var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    productId :{type: String, required: true},
    productName: {type: String, required: true},
    price: {type: Number, required: true},
    discount: {type: Number, required: false},
    new: {type: Boolean, default: false},
    sale: {type: Boolean, default: false},
    hot: {type: Boolean, default: false},
    available: {type: Boolean, default:true},
    amount: {type: Number, default: 1},
    image: Buffer,
    description: [[]],
    category: String
},{
    versionKey: false // You should be aware of the outcome after set to false
},{collection: 'product'});

var model = mongoose.model('product',schema);

model.createIndexes({
    productName: "text"
});

module.exports = model;