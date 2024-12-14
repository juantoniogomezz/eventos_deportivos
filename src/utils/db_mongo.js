const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const db = await mongoose.connect(process.env.DB_URL);
        const { name, host } = db.connection;
        console.log(`nombre de la BD ${name} y servidor: ${host}`);
    } catch (error) {
        console.error('Error al conectar a MongoDB', error.message);
    }
}

module.exports = connectDB;