const express = require("express");
const router = express.Router();
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent, getUpcomingEvents, getEventsByType, getEventsByDateRange } = require("../../controllers/event.controller") // Importamos la función del controlador:
const { checkToken } = require('../../middleware/auth')

//router.post("/add", addUser);

// Rutas avanzadas
router.get("/upcoming", checkToken, getUpcomingEvents);
router.get("/filter-by-type", checkToken, getEventsByType);
router.get('/date', checkToken, getEventsByDateRange); // Filtrar eventos por rango de fechas

// Rutas públicas
router.get('/', getEvents); // Listar todos los eventos
router.get('/:eventId', getEventById) // Obtener evento por ID

// Rutas protegidas
router.post('/', checkToken, createEvent); // Crear evento
router.put('/:eventId', checkToken, updateEvent) // Actualizar evento
router.delete('/:eventId', checkToken, deleteEvent); // Eliminar evento 



module.exports = router;