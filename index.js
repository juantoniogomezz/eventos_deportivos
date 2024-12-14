const express = require('express');
require('dotenv').config(); // configuro mi servidor para usar variables de entorno
const connectDB = require('./src/utils/db_mongo');
connectDB();
const routes = require("./src/api/routers/routes")


const server = express();
server.use(express.json());


const PORT = process.env.PORT;


server.use("/api", routes);

server.listen(PORT, () => {
    console.log(`server running port http://localhost:${PORT}`);
});

