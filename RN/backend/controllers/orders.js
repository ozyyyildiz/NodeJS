const mongoose = require('mongoose');
const { populate } = require('../models/order');

const Order = require('../models/order');
const Product = require('../models/product');

const url = 'http://localhost:3000/orders/'

exports.getOrders = (req,res,next)=>{
    Order.find()
        .select('product quantity _id')
        .populate('product', 'name price productImage')
        .then(data=>{
            res.status(200).json({
                count: data.length,
                orders: data.map(data=>{
                    return{
                        _id: data._id,
                        product: data.product,
                        quantity: data.quantity,
                        url: {
                            type:'GET',
                            path : url + data._id
                        }
                    }
                })
            })
        }).catch((err) => {
            console.log(err);
            res.status(500).json({error:err});
        });
};

exports.postOrder = (req,res,next)=>{
    Product.findById(req.body.productId)
        .then(product=>{
            const order = new Order({
                product: req.body.productId,
                quantity: req.body.quantity
            })
            return order.save()
        })
        .then(result=>{
            res.status(201).json({
                message: 'Order stored',
                createdOrder:{
                    _id:result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                url: {
                    type: 'GET',
                    path: url+result._id
                }
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).json({error:err});
        });
};

exports.getOneOrder = (req,res,next)=>{
    Order.findById(req.params.orderId)
        .populate('product')
        .then(order=>{
            if(!order){
                return res.status(404).json({message: 'Order not found'})
            }else{
                res.status(200).json({
                    order: order,
                    url:{
                        type:'GET',
                        path: url
                    }
                })
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({error:err});
        });
};

exports.deleteOrder = (req,res,next)=>{
    Order.deleteOne({_id: req.params.orderId})
        .then(result=>{
            res.status(200).json({
                message: 'Order deleted',
                url:{
                    type: 'POST',
                    path: url,
                    body: {
                        productId: 'ID', quantity: 'Number'
                    }
                }
            })
        }).catch((err) => {
            console.log(err);
            res.status(500).json({error:err});
        })
};
