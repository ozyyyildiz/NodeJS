const Product = require('../models/product');
const Category = require('./models/Category');

exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products=>{
            res.render('admin/products',{
                title: 'Admin Products',
                products: products,
                path: 'admin/products',
                action: req.query.action
            });
        }).catch((err)=>{console.log(err)});
}
exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-products',{
        title: 'New Product',
        path: '/admin/add-product'
    });
}
exports.postAddProduct = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const category = req.body.category;

    const product = new Product(
        {
            name: name,
            price: price,
            imageUrl: imageUrl,
            description: description,
            category: category,
            userId: req.user._id
        }
    );
    product.save()
        .then(()=>{
            res.redirect('admin/products');
        }).catch((err)=>{console.log(err)});
}
exports.getEditProduct = (req, res, next) => {
    Product.findById(req.params.productid)
        .then(product=>{
            return product;
        })
        .then(product=>{
            Category.find()
                .then(categories=>{
                    categories=categories.map(category=>{
                        if(product.categories){
                            product.categories.find(item=>{
                                if(item.toString()===category._id.toString()){
                                    category.selected = true;
                                }
                            })
                        }
                        return category;
                    })
                    res.render('admin/edit-product',{
                        title: 'Edit Product',
                        path: '/admin/products',
                        product: product,
                        categories: categories
                    });
                })
        }).catch(err=>{console.log(err)});
}
exports.postEditProduct = (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
}
exports.getProducts = (req, res, next) => {
    
}
exports.getProducts = (req, res, next) => {
    
}
exports.getProducts = (req, res, next) => {
    
}
