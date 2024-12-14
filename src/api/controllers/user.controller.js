const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { createToken } = require("../../utils/jwt")


const register = async (req, res) => {
    try {
        // Recibo los datos del usuario
        const newUser = req.body

        // Valido si el usuario ya existe en la BBDD
        const emailDB = await User.findOne({ email: newUser.email })
        const userDB = await User.findOne({ username: newUser.username })

        // Si existe --> envío error de respuesta 
        if(emailDB){
            return res.json({message: 'El email ya está registrado'});
        }
        // Si existe --> envío error de respuesta 
        if(userDB){
            return res.json({message: 'El usuario ya está registrado'});
        }

        // Si no existe, lo añador a la BBDD
        const user = await User.create(newUser);

        return res.json({
            message: "Usuario registrado con éxito",
            user
        });

    } catch (error) {
        console.log({message: error});
        return res.status(500).json({ message: "Error al registrar el usuario", error: error.message })
    }
}

const login = async (req, res) => {
    try {
        // Recibir los datos
        const { email, password } = req.body;

        // Verificar que el email existe --> findOne() buscamos solo un elemento de la bbdd
        const userDB = await User.findOne({ email })
        // Si NO existe el correo en la BBDD --> 
        if (!userDB){
            return res.json({message: "el usuario no existe"})
        }
        // Comparar contraseña del usuario con la de la BBDD (encriptada) --> bcrypt.compare()
        const same = await bcrypt.compare(password, userDB.password);

        // Si no coinciden, envío mensaje de error
        if (!same){
            return res.json({message: "Contraseña incorrecta"})
        }
        // Crear el token con el rol incluido
        const token = createToken(userDB);

        res.status(200).json({
            message: "Login exitoso",
            token
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al intentar hacer el login",
            error: error.message,
        });
    }
}

// Perfil usuario
const getProfile = async (req, res) => {
    try {
        // Buscar el usuario en la base de datos usando el email del token
        const user = await User.findOne({ email: req.user.email }).select("-password"); // No devolver la contraseña
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener el perfil", error: error.message });
    }
};


// Exportamos la función
module.exports = { register, login, getProfile };