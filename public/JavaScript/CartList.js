$((f) => {

        RefreshCart();

    })
    //redirect to the search page
function filter() {


    window.location.href = '/search?q=' + textbox.val();;
}
//remove product from cart
function removeProduct(itemid) {


    $.ajax({
        url: 'cart/remove?productid=' + itemid,
        type: 'DELETE',

        success: function(result) {
            RefreshCart();
        },
        error: JqueryErrorHanding
    });

}



function buildProductCartHTML(data) {

    var template = `  <div class="row detailDescripion">
                <div class="col-2">
                    <img src="images/{image}.jpg" class="img-responsive thumbnail" alt="Responsive image">
                </div>
                <div class="col-8" style="margin-top: 1em;">
                    <p class="tittle" style="height:auto"> {nombre}</p>
                    <p class="category"> {descripcion}</p>
                </div>
                <div class="col-2" style="margin-top: 1em;">
                    <p class="price">$ {precio}</p>
                    <a href="#"  onclick="removeProduct({id})">Remove</a>
                </div>

            </div>`;
    return replaceTemplate(template, data);


}



//refresh the cart List
function RefreshCart() {
    $.get({
        url: "/cart",
        context: document.body
    }).done(function(data) {
        var root = $("#root");
        root.empty();
        let html = "";
        data.productList.forEach(element => {
            html += buildProductCartHTML(element);
        });
        root.html(html);

    }).fail(JqueryErrorHanding);

}