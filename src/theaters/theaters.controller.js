const service = require("./theaters.service")

async function list(req, res, next){
    let result = await service.list()
    res.json({ data: result })
}


module.exports = {
    list,
}