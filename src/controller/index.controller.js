const path = require('path');
const modelUser = require('../models/index.model');
const {validationResult} = require('express-validator');

const newId = () => {
	let ultimo = 0;
	modelUser.getUsers().forEach(user => {
		if (user.id > ultimo){
			ultimo = user.id;
		}
	});
	return ultimo + 1
}
const controller = {
    login: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/login'));
    },

    register: (req, res) => {
        res.render(path.resolve(__dirname, '../views/users/registro'));
    },

    afterLogin: (req, res) => {
        res.redirect('/');
    },

    afterRegister: (req, res, next) => {
        let userDB = modelUser.encontrarPorDocumento('documento', req.body.documento);

		if (userDB) {
			return res.render(path.resolve(__dirname, "../views/users/registro.ejs"), {
				errors: {
					email: {
						msg: 'El documento ' + req.body.documento + ' ya existe en la base de datos'
					}
				},
			}); 
		} else {
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.render(path.resolve(__dirname, '../views/users/registro'), {errores: errors.mapped(), old: req.body});
        }
            let newUser = {
                id: newId(),
                documento: req.body.documento,
                nombre: req.body.nombre,
                correo: req.body.correo,
                contraseña: req.body.contraseña,
                opcionvista: req.body.opcionvista,
                imagenusuario: req.file.filename
            }
    
            modelUser.createUser(newUser);
    
            res.redirect('/users/listaUsuarios');    
        }

    },

    getUsuarios: (req, res) => {
        let usuarios = modelUser.getUsers();
        res.render(path.resolve(__dirname, '../views/users/listaUsuarios'), {usuarios});
    },

    getUserToEdit: (req, res) => {
        let idUserUrl = req.params.idUser;
        res.render(path.resolve(__dirname, '../views/users/userEdit'), { usuario: modelUser.getUsers()[idUserUrl - 1] });
    },

    editarUsuario: (req, res) => {
        let idUserUrl = parseInt(req.params.idUser);
        let datosUsuario = {
            id: idUserUrl,
            documento: req.body.documento,
            nombre: req.body.nombre,
            correo: req.body.correo,
            contraseña: req.body.contraseña,
            opcionvista: req.body.opcionvista,
            imagenusuario: req.file.filename
        }
        modelUser.updateUser(req.params.idUser, datosUsuario);
        res.redirect('/');
    },

    getUserToDelete: (req, res) => {
        let idUserUrl = req.params.idUser;
        res.render(path.resolve(__dirname, '../views/users/userDelete'), {usuarioId: idUserUrl});
    },
    eliminarUsuario: (req, res) => {
        let idUserUrl = req.params.idUser;
        modelUser.deleteUser(idUserUrl);
        res.redirect('/');
    }
}
module.exports = controller;