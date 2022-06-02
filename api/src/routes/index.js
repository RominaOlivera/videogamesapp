const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videogameRoute= require("./videogame")
const generoRoute=require("./genero")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/", videogameRoute);
router.use("/", generoRoute);
module.exports = router;
