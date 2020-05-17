var PostgresDB = require('../Conexion/PostgresDB');
var findAllCAtegorySql = "select * from categoria "
var findAllCAtegorySqlByid = "select * from categoria  where id=$1"
class CategoryService {
    constructor() {

    }
    async find(id) {
        let res;
        if (id) {
            res = await this.findbyid(id)
        } else {

            res = await this.findAll();

        }
        return res;

    }

    async findbyid(id) {
        var res = await PostgresDB.query(findAllCAtegorySqlByid, [id]);
        return res.rows;
    }

    async findAll() {
        var res = await PostgresDB.query(findAllCAtegorySql);
        return res.rows;
    }


}

module.exports = new CategoryService();