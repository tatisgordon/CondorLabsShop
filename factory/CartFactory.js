ShopingCar = require('../domain/ShopingCar');
//create a shopingcart Domain Object
class CartFactory {

    constructor() {}

    getCartDomainfromData(data) {

        return new ShopingCar({ sessionid: data.sessionid, productList: data.productList })


    }


}

module.exports = new CartFactory();