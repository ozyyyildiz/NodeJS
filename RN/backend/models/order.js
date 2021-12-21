const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user:{
        userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        name:{type:String},
        email:{type:String}
    },
    product: {type: mongoose.Schema.Types.ObjectId,ref: 'Prouct'},
    quantity: {type: Number, default: 1}
});

module.exports = mongoose.model('Order', orderSchema);