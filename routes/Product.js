var express = require('express');
var router = express.Router();

var productModels = require('../models/Product.js');

router.get('/:id',function(req,res,next){
    var result = [];
    var category;

    productModels.find({productId:req.params.id},function(err,data){
        if(err){
             res.json(err);
             module.exports = router;
        }
        else {
            result.push(data);
            category = data.category;
        }
    });

    productModels.find({category:category})
        .limit(3)
        .skip(Math.floor(Math.random*productModels.count({category:category})))
        .exec(function(err,data){
            if(err) result.push(err);
            else result.push(data);
        });

    res.json(result);

});

router.get('/listProduct',function(req,res,next){
    
    productModels.find({}, function(err,data){
        if(err){
            res.json(err);
        }else {
            res.json(data);
        }
    });

});

router.post('/',function(req,res){
    productModels.insertMany(req.body, function(err,data){
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
     });
});

router.delete('/:id',function(req,res){
    productModels.deleteOne({productId:req.params.id},function(err,data){
        if(err){
            res.json(err);
        }else {
            res.json(data);
        }
    })
});

router.patch('/:id',function(req,res){
    productModels.updateOne({id:req.params.id},req.body,function(err,data){
        if(err) res.json(err);
        else res.json(data);
    })
});

module.exports = router;