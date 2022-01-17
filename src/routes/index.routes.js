const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const {indexController} = require('../controller/principal.controller');
const logDBMiddleware = require('../middlewares/logDBMiddleware');
const { body } = require('express-validator');

const validaciones = [
    body('documento').notEmpty().withMessage('Debes ingresar un documento'),
    body('nombre').notEmpty().withMessage('Debes ingresar un nombre'),
    body('correo').isEmail().withMessage('Debes ingresar un email'),
    body('contraseña').notEmpty().withMessage('Debes ingresar una contraseña'),
    body('opcionvista').notEmpty().withMessage('Debes seleccionar una preferencia'),
    body('imagenusuario').notEmpty().withMessage('Debes insertar una imagen')
]

const multerdiskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        let folderImages = path.resolve(__dirname, '../public/img/usersImages');
        callback(null, folderImages);
    },
    filename: (req, file, callback) => {
        let nameImage = Date.now() + "userimage" + path.extname(file.originalname);
        callback(null, nameImage);
    }
})

let fileUpload = multer({storage: multerdiskStorage});

router.get('/inicio-sesion', indexController.login);

router.get('/registro-usuario', indexController.register);

router.post('/registro-usuario', validaciones, indexController.afterRegister);

router.post('/inicio-sesion', logDBMiddleware ,indexController.afterLogin);

router.get('/editarUsuario/:idUser', indexController.getUserToEdit);

router.put('/editarUsuario/:idUser', indexController.editarUsuario);

router.get('/eliminarUsuario/:idUser', indexController.getUserToDelete);

router.delete('/eliminarUsuario/:idUser', indexController.eliminarUsuario);

router.get('/listaUsuarios', indexController.getUsuarios)

module.exports = router;