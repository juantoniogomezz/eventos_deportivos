const express = require("express");
const router = express.Router();
const { register, login, getProfile } = require("../../controllers/user.controller") // Importamos la función del controlador:
const {checkToken} = require('../../middleware/auth')

//router.post("/add", addUser);
//router.get("/listusers", getUsers);
router.post("/register", register); // Registrar usuario
router.post("/login", login); // Iniciar sesión
router.get("/profile", checkToken, getProfile);// Perfil de usuario el middle es la seguridad para que puedas acceder a la función getProfile


module.exports = router; 