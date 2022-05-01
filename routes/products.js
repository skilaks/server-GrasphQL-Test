var express = require('express');
var router = express.Router();
var _ = require('lodash');
var products = require('../data/data');
/* GET home page. */

router.get('/', function(req, res, next) {
    res.json(products.getProducts());

});

router.get('/:id',(req,res)=>{
    res.json(products.getProductById(req.params.id))

});

router.get("/:id/comments", (req, res) => {
    res.json(_.get(products.getProductById(req.params.id), 'comments'));
});


router.post("/:id/comments", (req, res) => {
    const product = products.getProductById(req.params.id);
    if(product) {
        product.comments = product.comments || [];
        product.comments.push(req.body);
        res.end();
    } else {
        res.status(404).json(new Error('Product not found'));
    }
});

module.exports = router;
