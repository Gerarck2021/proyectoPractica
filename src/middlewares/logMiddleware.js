const fs = require('fs');

function logMiddleware(req, res, next) {
    fs.appendFileSync('log.txt', '\n Se ingreso a la pagina de ' + req.url);

    next();
}

module.exports = logMiddleware;