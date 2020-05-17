//third party library
var express = require('express');
var shopingCar = require('../domain/ShopingCar');


var ShopingCartService = require('../services/ShopingCartService');
var router = express.Router();

router.get('/', async(req, res) => {
        var sess = req.session;
        var cartDomain = await ShopingCartService.getOrCreateShopingCart(sess.id, true);
        res.send(cartDomain);
    })
    //remove a product from cart
router.delete('/remove', async(req, res) => {
        var sess = req.session;
        var productid = req.query.productid;
        var cartDomain = await ShopingCartService.getOrCreateShopingCart(sess.id);
        ShopingCartService.RemoveProductFromCart(cartDomain, productid);
        if (response.updated) {
            res.status(200).send(cartDomain);
        } else {
            res.status(403).send(cartDomain);

        }



    })
    // add a product to the Cart
router.post('/addtoCar', async(req, res) => {

    sess = req.session;
    var itemid = req.body.productid;
    var cartDomain = await ShopingCartService.getOrCreateShopingCart(sess.id);
    response = await ShopingCartService.addProductToCart(cartDomain, itemid);
    if (response.updated) {
        res.status(200).send(cartDomain);
    } else {
        res.status(403).send(cartDomain);

    }


})

module.exports = router;