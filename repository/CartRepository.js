var format = require('pg-format'); //added library formats SQLs
var ShopingCar = require('../domain/ShopingCar');


var CartFactory = require('../factory/CartFactory');
var PostgresDB = require('../Conexion/PostgresDB');
var findShopingCartProductsSQL = "select p.* from cart c join cart_product_join cpj on cpj.cart_fk = c.sessionid join products p on p.id= cpj.product_fk where c.sessionid=$1";
var findShopingCartSQL = "select * from cart c  where c.sessionid=$1";
var InsertShopingCartSQL = "insert into cart (sessionid) values($1)"
var InsertShopingCartProductSQL = "insert into cart_product_join   (cart_fk,product_fk) values %L"
var deleteProductsFromCartSQL = "delete from  cart_product_join cpj where  cpj.product_fk = ANY($1::int[])"

class CartRepository {

    constructor() {


        }
        //get the instace with all data
    async findbyIdFullData(sessionid) {
        let ShopingCarDomain;

        let cart = await PostgresDB.query(findShopingCartSQL, [sessionid]);
        if (cart.rowCount > 0) {
            let products = await PostgresDB.query(findShopingCartProductsSQL, [sessionid]);
            ShopingCarDomain = CartFactory.getCartDomainfromData({ sessionid: cart.rows[0].sessionid, productList: products.rows });


        }
        return ShopingCarDomain;
    }
    async findbyId(sessionid) {
            let ShopingCarDomain;

            let cart = await PostgresDB.query(findShopingCartSQL, [sessionid]);
            if (cart.rowCount > 0) {
                let products = await PostgresDB.query(findShopingCartProductsSQL, [sessionid]);
                ShopingCarDomain = CartFactory.getCartDomainfromData({ sessionid: cart.rows[0].sessionid, productList: products.rows.map(data => data.id) }); //maping to get onlythe ids


            }
            return ShopingCarDomain;
        }
        //save to Database
    async save(ShopingCar) {

        const client = await PostgresDB.connect();
        let updated = false; //track if there was any update in the relationship
        let created = false; //track if the operation create a new resource

        try {
            var cart = await client.query(findShopingCartSQL, [ShopingCar.sessionid]);
            if (cart.rowCount == 0) {
                await client.query(InsertShopingCartSQL, [ShopingCar.sessionid])
                created = true;


            }

            var actualProducts = await client.query(findShopingCartProductsSQL, [ShopingCar.sessionid]);
            actualProducts = actualProducts.rows.map(product => product.id); //map to get only the ids
            var new_products = ShopingCar.productList.filter(x => !actualProducts.includes(x)); //id list of  products to add
            var removed_Products = actualProducts.filter(x => !ShopingCar.productList.includes(x)); //  id list of products to  remove


            if (new_products > 0) { //add product if any 
                var maped = new_products.map((x) => [ShopingCar.sessionid, Number(x)]);
                let formaterSQL = format(InsertShopingCartProductSQL, maped);

                await client.query(formaterSQL);
                updated = true;
            }
            if (removed_Products > 0) { //remonve prodcuts if any
                await client.query(deleteProductsFromCartSQL, [removed_Products]);
                updated = true;

            }
        } catch (e) {

        } finally {

            await client.end();
            client.release()
        }
        ShopingCar = await this.findbyId(ShopingCar.sessionid);

        return { ShopingCar, updated, created };
    }



}




module.exports = new CartRepository();