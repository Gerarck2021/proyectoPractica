const path = require('path');
const modelUser = require('../models/index.model');

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
            let newUser = {
                id: newId(),
                documento: req.body.documento,
                nombre: req.body.nombre,
                correo: req.body.correo,
                contraseña: req.body.contraseña,
                opcionvista: req.body.opcionvista,
                imagenusuario: req.body.imagenusuario
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
        let usuarios = modelUser.getUsers();
        let idUserUrl = req.params.idUser;
        for(let i = 0; i < usuarios.length; i++) {
            if(idUserUrl <= 0 || idUserUrl > usuarios.length) {
                res.send("Usuario invalido")
                break;
            } else {
                res.render(path.resolve(__dirname, '../views/users/userEdit'), { usuario: modelUser.getUsers()[idUserUrl - 1], usuarios });
                break;
            }
        }
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
            imagenusuario: req.body.imagenusuario
        }
        modelUser.updateUser(req.params.idUser, datosUsuario);
        res.redirect('/');
    },

    getUserToDelete: (req, res) => {
        let idUserUrl = req.params.idUser;
        let usuarios = modelUser.getUsers();
        for(let i = 0; i < usuarios.length; i++) {
            if(idUserUrl <= 0 || idUserUrl > usuarios.length) {
                res.send("Usuario no encontrado para eliminar")
                break;
            } else {
                res.render(path.resolve(__dirname, '../views/users/userDelete'), {usuarioId: idUserUrl});
                break;
            }
        }
    },
    eliminarUsuario: (req, res) => {
        let idUserUrl = req.params.idUser;
        modelUser.deleteUser(idUserUrl);
        res.redirect('/');
    }
}
module.exports = controller;