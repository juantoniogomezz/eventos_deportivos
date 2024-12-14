const jwt = require("jsonwebtoken");
const User = require('../models/user.model');

const checkToken = async (req, res, next) => {
  // Validar que el token está presente
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"

  // Si no existe el token, enviamos un error
  if (!token) {
    return res.status(401).json({ msg: "Debe incluir el token en el header" });
  }

  try {
    // Verificar el token usando la clave secreta
    const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
    
    // Asignar la información del usuario decodificada a req.user
    req.user = decoded;
    next(); // Continuar al siguiente middleware o controlador

  } catch (error) {
    // Si el token ha expirado
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ msg: 'El token ha expirado' });
    }
    // Si el token es inválido o mal formado
    return res.status(401).json({ msg: 'El token es incorrecto o ha expirado' });
  }
};

module.exports = { checkToken };