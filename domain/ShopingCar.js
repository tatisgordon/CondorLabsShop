class ShopingCar {

    constructor(data) {
        this.productList = data.productList;
        this.sessionid = data.sessionid;

    }


    get getProductList() {
        return this.productList;
    }

    removeProduct(productid) {

        this.productList = this.productList.filter((value) => value != productid)

    }



}


module.exports = ShopingCar;