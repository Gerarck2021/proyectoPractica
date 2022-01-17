const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const methodOverride = require('method-override');
const cors = require('cors');
const { juegosRoutes, indexRoutes, mainRoutes} = require('./routes/principal.routes');
const logMiddleware = require('./middlewares/logMiddleware');
app.use(express.static(path.resolve(__dirname, './public')));

app.use((req, res, next) => {

    // Dominio que tengan acceso (ej. 'http://example.com')
       res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Metodos de solicitud que deseas permitir
       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    
    // Encabecedados que permites (ej. 'X-Requested-With,content-type')
       res.setHeader('Access-Control-Allow-Headers', '*');
    
    next();
})

app.use(cors());

app.use(logMiddleware);

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set("views", path.resolve(__dirname + "./views"));
app.set("view engine", "ejs");

app.use('/', mainRoutes);
app.use('/users', indexRoutes);
app.use('/juegos', juegosRoutes);

app.use((req, res, next) => {
    res.status(404).render(path.resolve(__dirname, './views/not-found'));
})


app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));