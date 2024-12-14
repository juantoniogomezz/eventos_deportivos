
const jwt = require("jsonwebtoken");
const createToken = (info) => {
    const data = {
        user_id: info._id,
        email: info.email,
        rol: info.rol
    }
    const token = jwt.sign(data, process.env.SECRET_KEY_JWT);
    console.log(token);
    return token
}

module.exports = { createToken }