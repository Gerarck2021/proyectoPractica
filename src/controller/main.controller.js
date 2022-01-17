const path = require('path');
const mainController = {
    inicio: (req, res) => {
        res.render(path.resolve(__dirname, '../views/index'));
    }
}

module.exports = mainController;