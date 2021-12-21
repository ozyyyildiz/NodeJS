var express = require('express');
var router = express.Router();
//var {check, validationResult} = require('express-validator');
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;
var assert = require('assert');

var url = 'mongodb://localhost:27017'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'From Validation', success: req.session.success, errors: req.session.errors });
  req.session.errors = null;
});

router.get('/get-data', (req,res,next) => {
  var resultArray = [];
  mongo.connect(url, (err,client)=> {
    assert.equal(null,err);
    var db = client.db('test');
    var cursor = db.collection('user-data').find();
    cursor.forEach((doc,err)=>{
      assert.equal(null,err);
      resultArray.push(doc);
    }, ()=>{
      client.close();
      res.render('index',{items: resultArray});
    });
  })
});

router.post('/insert', (req,res,next) => {
  var item={
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  mongo.connect(url, (err,client)=>{
    assert.equal(null,err);
    var db = client.db('test');
    db.collection('user-data').insertOne(item, (err,result)=>{
      assert.equal(null, err);
      console.log('Item inserted');
      client.close();
    });
  });

  res.redirect('/');
});

router.post('/update', (req,res,next) => {
  var item={
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  var id = req.body.id;

  mongo.connect(url, (err,client)=>{
    assert.equal(null,err);
    var db = client.db('test');
    db.collection('user-data').updateOne({"_id": objectId(id)}, {$set: item}, (err,result)=>{
      assert.equal(null, err);
      console.log('Item updated');
      client.close();
    });
  });
});

router.post('/delete', (req,res,next) => {
  var id = req.body.id;

  mongo.connect(url, (err,client)=>{
    assert.equal(null,err);
    var db = client.db('test');
    db.collection('user-data').deleteOne({"_id": objectId(id)}, (err,result)=>{
      assert.equal(null, err);
      console.log('Item deleted');
      client.close();
    });
  });
});



















// router.post('/submit', 
//   [
//     check('email').isEmail().withMessage('Invalid Email'),
//     check("password")
//         .isLength({ min: 4 })
//         .withMessage('Invalid Password'),
//     check("confirmPassword")
//         .isLength({ min: 4 })
//         .withMessage('Invalid Password Confirmation')
//         .custom((value,{req, loc, path}) => {
//             if (value !== req.body.password) {
//                 // trow error if passwords do not match
//                 throw new Error("Passwords don't match");
//             } else {
//                 return value;
//             }
//         })
//   ],
//   function(req,res,next){
//     var errors = validationResult(req);
//     if (errors.array().length !== 0){
//       req.session.errors = errors.array();
//       req.session.success = false;
//       console.log(errors);
//     }else{
//       req.session.success = true;
//     }
//     res.redirect('/');
// });


module.exports = router;
