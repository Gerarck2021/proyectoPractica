const fs = require('fs');

function logDBMiddleware(req, res, next) {
    fs.appendFileSync('logDB.txt', '\n Se creo un regsitro al ingresar a la pagina de ' + req.url);

    next();
}

module.exports = logDBMiddleware;