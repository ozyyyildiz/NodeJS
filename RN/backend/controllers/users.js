const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signupUser = (req,res,next) =>{
    User.findOne({email:req.body.email})
        .then(user=>{
            if(user){
                return res.status(409).json({
                    message: 'E-Mail already exists'
                });
            }else{
                bcrypt.hash(req.body.password, 10, (err,hash)=>{
                    if(err){
                        return res.status(500).json({error:err});
                    }else{
                        const user = new User({
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result=>{
                                res.status(200).json({message: 'User Created'})
                            }).catch(err=>{res.status(500).json({error:err})});
                    }
                })
            }
        })
};

exports.loginUser = (req,res,next) =>{
    User.findOne({email: req.body.email})
        .then(user=>{
            if(!user){
                return res.status(401).json({message:'Authorization failed!'})
            }
            bcrypt.compare(req.body.password, user.password, (err,result)=>{
                if(err){
                    return res.status(401).json({message:'Authorization failed!'});
                }
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user._id
                    },process.env.JWT_KEY,{
                        expiresIn: "1h"
                    });
                    return res.status(200).json({
                        message: 'Authorization Successful.',
                        token:token
                    })
                }
                return res.status(401).json({message:'Authorization failed!'})
            })
        }).catch(err=>{res.status(500).json({error:err})})
};

exports.deleteUser = (req,res,next) =>{
    User.deleteOne({_id: req.params.userId})
        .then(result=>{
            res.status(200).json({message:'User Deleted.'});
        }).catch(err=>{res.status(500).json({error:err});})

};