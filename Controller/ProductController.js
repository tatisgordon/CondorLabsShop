//third party library
var express = require('express');
const { body } = require('express-validator'); //sanatize input data from client



var shopingCar = require('../domain/ShopingCar');
productSearchService = require('../services/productSearchService');
ShopingCartService = require('../services/ShopingCartService');

var router = express.Router();
//api call get product by id
router.get('/', async function(req, res, next) {

    sess = req.session;
    var id = req.query.id;;
    res2 = await productSearchService.findById(id);

    res.send(res2);
});

//api call find product by search bar
router.get('/find', [body('text').escape().trim()], async function(req, res, next) {

    sess = req.session;
    let filter = req.query.q;

    let offset = req.query.offset;
    let limit = req.query.limit;

    res2 = await productSearchService.search(filter, offset, limit);
    res.send(res2);

});
//api call find product by category
router.get('/findbycategory', async function(req, res, next) {

    sess = req.session;

    let filter = req.query.catid;
    let offset = req.query.offset;
    let limit = req.query.limit;

    res2 = await productSearchService.findbyCategory(filter, offset, limit);
    res.send(res2);

});

module.exports = router;