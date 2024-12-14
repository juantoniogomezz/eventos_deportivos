const Events = require("../models/event.model");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { createToken } = require("../../utils/jwt")

// Listar todos los eventos
const getEvents = async (req, res) => {
    try {
        const listEvents = await Events.find();
        res.json({success: true, list: listEvents})
    } catch (error) {
        console.log(error)
    }
};

// Obtener evento por id
const getEventById = async (req, res) => {
    try {
        const event = await Events.findById(req.params.eventId).populate('planner', 'username');
        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.json(event);
    } catch (error) {
        console.error("Error al obtener el evento:", error);
        res.status(500).json({ message: "Error al obtener el evento", error: error.message });
    }
};

// Crear un nuevo evento
const createEvent = async (req, res) => {
    try {
        const { name, description, date, location, typeSport, planner } = req.body;

        // Validación de los datos requeridos
        if (!name || !date || !location || !typeSport || !planner) {
            return res.status(400).json({ message: "Faltan datos obligatorios" });
        }

        // Verificar que el planner (organizador) es un usuario válido
        const userExists = await User.findById(planner);
        if (!userExists) {
            return res.status(400).json({ message: "El organizador no existe" });
        }

        // Crear el evento
        const event = new Events({ name, description, date, location, typeSport, planner });
        const creatingEvent = await event.save();

        return res.status(201).json({ message: 'Evento creado exitosamente', data: creatingEvent });
    } catch (error) {
        console.error("Error al crear el evento:", error);
        res.status(500).json({ message: "Error al crear el evento", error: error.message });
    }
};

// Actualizar un evento
const updateEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const updateData = req.body;
        //Comprobar si el evento existe:
        const event = await Events.findById(eventId);
        if (!event){
            return res.status(404).json({ message: "Evento no encontrado"});
        }
        // Actualizamos el evento
        const updatedEvent = await Events.findByIdAndUpdate(
            eventId,
            { $set: updateData }, // datos que vamos a actualizar
            { new: true } // devolvemos el evento actualizado
        );
        res.status(200).json({
            message: "Evento actualizado correctamente",
            data: updateEvent,
        });
    } catch (error) {
        console.error("Error al actualizar el evento", error);
        res.status(500).json({
            message: "Error al actualizar el evento",
            error: error.message,
        });
    }
}

// Eliminar un evento
const deleteEvent = async (req, res) => {
    try {
        const { eventId } = req.params;

        // Validar que el usuario tenga rol de admin
        if (req.user.rol !== "admin") {
            return res.status(403).json({ message: "No tienes permiso para eliminar eventos" });
        }
        
        // Validar que el evento exista
        const event = await Events.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Evento no encontrado" });
        }

        // Validar que el usuario tenga permiso para eliminar el evento
        if (event.planner.toString() !== req.user.user_id) {
            return res.status(403).json({ message: "No tienes permiso para eliminar este evento" });
        }

        // Eliminar el evento
        await Events.findByIdAndDelete(eventId);

        res.status(200).json({ message: "Evento eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar el evento:", error);
        res.status(500).json({
            message: "Error al eliminar el evento",
            error: error.message,
        });
    }
};

// Listar eventos futuros
const getUpcomingEvents = async (req, res) => {
    try {
        const currentDate = new Date(); // Fecha actual

        // Buscar eventos futuros (a la fecha actual)
        const upcomingEvents = await Events.find({ date: { $gt: currentDate } }).sort({ date: 1 });

        if (upcomingEvents.length === 0) {
            return res.status(404).json({ message: "No hay eventos próxima" });
        }

        res.status(200).json({ success: true, data: upcomingEvents });
    } catch (error) {
        console.error("Error al obtener eventos próximos:", error);
        res.status(500).json({
            message: "Error al obtener eventos próximos",
            error: error.message,
        });
    }
};

// Filtrar eventos por tipo de deporte
const getEventsByType = async (req, res) => {
    try {
        const { type } = req.query; // Obtenemos el tipo de deporte desde los parámetros de consulta

        if (!type) {
            return res.status(400).json({ message: "El parámetro 'type' es obligatorio" });
        }

        // Filtro insensible a mayúsculas y minúsculas
        const events = await Events.find({ typeSport: new RegExp(type, 'i') });

        if (events.length === 0) {
            return res.status(404).json({ message: "No se encontraron eventos para este tipo de deporte" });
        }

        res.status(200).json({ success: true, list: events });
    } catch (error) {
        console.error("Error al filtrar eventos por tipo de deporte:", error);
        res.status(500).json({ message: "Error al filtrar eventos por tipo de deporte", error: error.message });
    }
};

// Filtrar eventos por rango de fechas
const getEventsByDateRange = async (req, res) => {
    try {
        const { from, to } = req.query;

        // Validar que las fechas estén presentes
        if (!from || !to) {
            return res.status(400).json({ message: "Los parámetros 'from' y 'to' son obligatorios" });
        }

        // Convertir las fechas a objetos de tipo Date
        const fromDate = new Date(from);
        const toDate = new Date(to);

        if (isNaN(fromDate) || isNaN(toDate)) {
            return res.status(400).json({ message: "Formato de fecha inválido. Use 'YYYY-MM-DD'" });
        }

        // Buscar eventos dentro del rango de fechas
        const events = await Events.find({
            date: { $gte: fromDate, $lte: toDate }
        }).sort({ date: 1 }); // Ordenar por fecha ascendente

        if (events.length === 0) {
            return res.status(404).json({ message: "No se encontraron eventos en este rango de fechas" });
        }

        res.status(200).json({ success: true, list: events });
    } catch (error) {
        console.error("Error al filtrar eventos por rango de fechas:", error);
        res.status(500).json({ message: "Error al filtrar eventos por rango de fechas", error: error.message });
    }
};


// Exportamos la función
module.exports = { getEvents, getEventById, createEvent, updateEvent, deleteEvent, getUpcomingEvents, getEventsByType, getEventsByDateRange };