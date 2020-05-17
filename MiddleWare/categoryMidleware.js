CategoryService = require('../services/CategoryService');
// injects the category data on every request to the main routes
var categorymiddleware = {

    injectCategory: async function injectCategory(req, res, next) {
        req.categoryListMenu = await CategoryService.findAll();
        next();
    }

}
module.exports = categorymiddleware;