const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{type:String},
    price:{type:Number},
    description:{type:String},
    productImage:{type:String},
    category:{type: mongoose.Schema.Types.ObjectId, ref:'Category'}
});

module.exports = mongoose.model('Product', productSchema);