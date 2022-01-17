const path = require('path');
const model = require('../models/index.model');
const juegosController = {

    listaJuegos: (req, res) => {
        res.render(path.resolve(__dirname, '../views/listaJuegos'), {juegos: model.getJuegos()});
    },

    juego: (req, res) => {
        // res.send('Te encuentras en el juego ' + req.params.idJuego);
        //traer el juego especifico
        res.send('Te encuentras en el juego ' + req.query.idJuego);
    },

    historiaJuego: (req, res) => {

        if(req.params.idHistoria == undefined) {
            res.send('Te encuentras en las historias del juego ' + req.params.idJuego);
        } else {
            res.send('Te encuentras en la historia ' + req.params.idHistoria + ' del juego ' + req.params.idJuego);
        }
    }
}

module.exports = juegosController;