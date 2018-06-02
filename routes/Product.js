var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');

var productModels = require('../models/Product.js');

const storage = multer.diskStorage({
    destinaton: function(req,file,cb){
        cb(null,"uploads/");
    },
    filename: function(req,file,cb){
        cb(null, ""+file.originalname);
    }
    
})

const upload = multer({storage:storage});

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

router.get('/product/:id',function(req,res,next){
    productModels.find({id : req.params.id }, function(err,data){
        if(err){
            res.json(err);
        }else{
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
    // var bitmap = fs.readFileSync(req.file.path);
    // var temp = new Buffer(bitmap).toString('base64');
    // res.json(temp);
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