const pagenumber = 6; //fixed number of product per page
actualpagination = []; //track pagination index of each category
Jqueryrootbysection = []; //cached root DIV for each category

//acivate the scroll event on a category Section
function scrollPage(catid, bnt, to, append) {

    let root = Jqueryrootbysection[catid];

    let topage = actualpagination[catid] + to;
    if (topage >= 0) {
        actualpagination[catid] = topage;
        BuildCagorySection(root, catid, append)
    }
}
$(document).ready(function() {
    // build the category section for each category
    $("section ").each(function(e) {
        let section = $(this);
        let root = section.children().find('#root');
        let id = section.attr('catid');
        Jqueryrootbysection[id] = root;
        actualpagination[id] = 0;
        BuildCagorySection(root, id);

    })

})


function BuildCagorySection(root, catid, append) {

    $.get({
        url: "products/findbycategory?catid=" + catid + " &offset=" + pagenumber * actualpagination[catid] + " &limit=" + pagenumber,
        context: document.body

    }).done(function(data) {
        console.log(data);
        if (data.length) { //if data found
            if (!append) root.empty();
            let html = " ";
            data.forEach(element => {
                html += buildProductHTML(element);
            });
            root.append(html);
        }

    }).fail(JqueryErrorHanding)
}

function filter() {


    window.location.href = '/search?q=' + textbox.val();;
}