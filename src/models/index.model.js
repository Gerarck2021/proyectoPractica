const juegos = require('./juegos.json');
const usuarios = require('./users.json');
const fs = require('fs');
const path = require('path');

const model = {
    getJuegos: () => {
        return juegos;
    },

    idUsuario: (id) => {
        let busquedaUsuario = usuarios.find(item => item.id == id);
        return busquedaUsuario; 
    }, 

    getUsers: () => {
        return usuarios;
    },

    isExist: (id) => {
    const isExist = model.getUsers().find((item) => item.id == id);
    if (isExist) {
        return true;
    } else {
        return false;
        }
    },

    encontrarPorDocumento: (campo, documento) => {
      let usuarios = model.getUsers();
      let usuarioAEncontrar = usuarios.find(usuario => usuario[campo] === documento);
      return usuarioAEncontrar;
    },

    createUser: (user) => {
        const users = model.getUsers();
        if (model.isExist(user.id)) {
          return "Ya existe";
        }
        users.push(user);
        fs.writeFileSync(
          path.resolve(__dirname, "./users.json"),
          JSON.stringify(users, null, 4),
          { encoding: "utf8" }
        );
        return "Creado";
      },

      updateUser: (id, user) => {
        const indiceBuscado = model.getUsers().findIndex(
            (user) => user.id == id
          );
          if (indiceBuscado < 0 || indiceBuscado > model.getUsers().length) {
            return "No existe este usuario en la base de datos";
          }
          let newDb = model.getUsers();
          newDb[indiceBuscado].id = id;
          newDb[indiceBuscado] = user;
          fs.writeFileSync(
            path.resolve(__dirname, "./users.json"),
            JSON.stringify(newDb, null, 4),
            { encoding: "utf8" }
          );
      },

      deleteUser: (id) => {
        let userToDelete = model.getUsers().filter(item => item.id != id);
        fs.writeFileSync(path.resolve(__dirname, './users.json'), JSON.stringify(userToDelete, null, 4), {encoding: 'utf8'});
      }


}

module.exports = model;