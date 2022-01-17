const express = require('express');
const router = express.Router();
const path = require('path');
const {juegosController} = require('../controller/principal.controller');

//Acceder a la lista de juegos disponibles
router.get('/listaJuegos', juegosController.listaJuegos);

//Acceder a un juego
router.get('/:idJuego', juegosController.juego);

//Acceder a la historia de un juego
router.get('/:idJuego/historia/:idHistoria?', juegosController.historiaJuego);

module.exports = router;