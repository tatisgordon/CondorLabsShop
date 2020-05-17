 var ShopingCar = require('../domain/ShopingCar');
 var CartRepository = require('../repository/CartRepository');
 class ShopingCartService {
     constructor() {

     }
     async RemoveProductFromCart(cart, productid) {


         cart.removeProduct(productid);
         return CartRepository.save(cart);
     }
     async addProductToCart(cart, productid) {


             cart.productList.push(productid);
             return await CartRepository.save(cart);

         }
         /*get a shoping car based on a session id, if it doest not exists in database  create one
         
         */
     async getOrCreateShopingCart(sessionid, fulldata) {

         let cartDomain = fulldata ? await CartRepository.findbyIdFullData(sessionid) : await CartRepository.findbyId(sessionid);

         if (!cartDomain) {

             cartDomain = new ShopingCar({ sessionid: sessionid, productList: [] });
             var savestate = await CartRepository.save(cartDomain);



         }
         return cartDomain;

     }


 }

 module.exports = new ShopingCartService({});