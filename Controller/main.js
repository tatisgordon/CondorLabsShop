var express = require('express');
var productSearchService = require('../services/productSearchService');
var CategoryService = require('../services/CategoryService');
var router = express.Router();

//main view 
router.get('/', async function(req, res, next) {
    let catid = req.query.catid;

    categorislist = await CategoryService.find(catid);
    res.render('index', {
        categorislist: categorislist,
        categoryListMenu: req.categoryListMenu
    });
});
/*
 *search router page
 */
router.get('/search', function(req, res, next) {

    let query = req.query.q;
    res.render('search', {
        query: query,
        categoryListMenu: req.categoryListMenu
    });
});

//product detail view
router.get('/product', async(req, res, next) => {
    let productid = req.query.id;

    prod = await productSearchService.findById(productid);
    res.render('ProductDetail', {
        product: prod,
        categoryListMenu: req.categoryListMenu
    });
});
//shoping cart view

router.get('/cartlist', function(req, res, next) {

    res.render('CartList', {
        categoryListMenu: req.categoryListMenu
    });
});


module.exports = router;