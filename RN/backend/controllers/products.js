const mongoose = require('mongoose');
const Product = require('../models/product');

const url = 'http://localhost:3000/products/';

exports.getAllProducts = (req, res, next) => {
    Product.find()
        .then(products=>{
            res.status(200).json({products});
        }).catch(err=>{
            console.log(err);
            res.status(500).json({ error: err });
        })
}

exports.postProduct = (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        productImage: req.body.productImage,
        description: req.body.description,
    })
    product.save()
        .then(result => {
            res.status(201).json({result});
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}

exports.getOneProduct = (req, res, next) => {
    var id = req.params.productId;
    Product.findById(id)
        .then(data => {
            if (data) {
                const response = {
                    name: data.name,
                    price: data.price,
                    _id: data._id
                }
                res.status(200).json({ response });
            } else {
                res.status(404).json({ message: 'We can\'t found requested product.' });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })

}

exports.updateProduct = (req, res, next) => {
    const id = req.params.id;
    Product.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        .then(result => {
            res.status(200).json({
                message: 'Product Updated',
                url: {
                    type: 'GET',
                    path: url + id
                }
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}

exports.deleteProduct = (req, res, next) => {
    const id = req.params.productId;
    Product.deleteOne({ _id: id })
    then(result => {
        res.status(200).json({ message: 'Product deleted' })
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    })
}