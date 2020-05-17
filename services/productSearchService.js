var PostgresDB = require('../Conexion/PostgresDB');

class ProductSearchService {
    constructor() {
        this.SearchByCategorySQL = "select p.*, c.description cat from products p  join categoria c on c.id = p.categoria_fk   where p.categoria_fk = $1 offset $2 limit $3 ";
        this.SearchById = "select p.*, c.description cat from products p join categoria c on c.id = p.categoria_fk  where p.id=$1";
        this.Search = "select  p.*, c.description cat from products p join categoria c on c.id = p.categoria_fk  where  lower(p.nombre) like lower($1) offset $2 limit $3 ";
        this.SearchAll = "select p.*, c.description cat from products p  join categoria c on c.id = p.categoria_fk offset $1 limit $2 ";
    }

    async search(filter, init, end) {

        var res = await (filter ? PostgresDB.query(this.Search, ["%" + filter + "%", init, end]) : PostgresDB.query(this.SearchAll, [init, end]));


        return res.rows;


    }
    async findbyCategory(filter, init, end) {

        var res = await PostgresDB.query(this.SearchByCategorySQL, [filter, init, end]);

        return res.rows;


    }

    async findById(id) {
        var res = await PostgresDB.query(this.SearchById, [id]);
        return res.rows[0] || [];
    }


}

module.exports = new ProductSearchService({});