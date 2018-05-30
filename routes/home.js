var express = require('express');
var router = express.Router();

var productModel = require('../models/Product');

router.get('/home/:number',function(req,res,next){

        var result = [];

    productModel.find({hot: true})
        .limit(number)
        .exec(function(err,data){
           if(err){
               result = err;
           } else{
               result.push({hot:data}); 
           }
        });
        productModel.find({sale: true})
            .limit(number)
            .exec(function(err,data){
               if(err){
                   result = err;
               } else{
                   result.push({sale:data}); 
               }
            });
            productModel.find({new: true})
                .limit(number)
                .exec(function(err,data){
                   if(err){
                       result = err;
                   } else{
                       result.push({new:data}); 
                   }
                });
})