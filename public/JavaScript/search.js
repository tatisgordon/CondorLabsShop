const pagenumber = 10
actualpagination = 0; // track the actual pagination in the search page

function onBottonReached() {

    actualpagination++;

    $.get({
        url: "products/find?q=" + SearcherText + "&offset=" + pagenumber * actualpagination + "&limit=" + pagenumber,
        context: document.body

    }).done(function(data) {
        var root = $("#root");
        let html = "";
        data.forEach(element => {
            html += buildProductHTML(element);
        });
        root.append(html);

    }).fail(JqueryErrorHanding);


}
SearcherText = "";
//request data by ajax 
function filter() {
    actualpagination = 0;
    SearcherText = (textbox).val();
    $.get({
        url: "products/find?q=" + SearcherText + "&offset=" + pagenumber * actualpagination + "&limit=" + pagenumber,
        context: document.body

    }).done(function(data) {


        var root = $("#root");
        root.empty();
        let html = "";

        data.forEach(element => {
            html += buildProductHTML(element);
        });

        root.html(html);


    }).fail(JqueryErrorHanding);

}

$(() => {


    filter();
    //check for Scroll  to bottom
    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            onBottonReached();
        }
    });

})