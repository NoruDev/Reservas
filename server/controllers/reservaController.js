const { Reserva, Disponibilidad, Servicio, Usuario } = require('../models');
const { Op } = require('sequelize');

// Crear una reserva con validación de conflictos (HU-07)
exports.crearReserva = async (req, res) => {
    try {
        const { servicioId, fecha, horaInicio } = req.body;
        const usuarioId = req.usuario.id;

        // Validaciones
        if (!servicioId || !fecha || !horaInicio) {
            return res.status(400).json({ error: 'Faltan parámetros: servicioId, fecha, horaInicio' });
        }

        // 1. Validar si ya existe una reserva en ese mismo servicio, fecha y hora
        const reservaExistente = await Reserva.findOne({
            where: { 
                servicioId, 
                fecha,
                hora_inicio: horaInicio,
                estado: 'activa'
            }
        });

        if (reservaExistente) {
            return res.status(409).json({ error: 'Este horario ya está reservado.' });
        }

        // 2. Crear reserva
        const reserva = await Reserva.create({
            usuarioId,
            servicioId,
            fecha,
            hora_inicio: horaInicio,
            estado: 'activa'
        });

        res.status(201).json({ message: 'Reserva creada con éxito', reserva });
    } catch (error) {
        console.error('Error al procesar la reserva:', error);
        res.status(500).json({ error: 'Error al procesar la reserva.', details: error.message });
    }
};

// Listar reservas del usuario actual
exports.listarMisReservas = async (req, res) => {
    try {
        const reservas = await Reserva.findAll({ 
            where: { usuarioId: req.usuario.id },
            include: [
                { model: Servicio, as: 'Servicio' },
                { model: Usuario, as: 'Usuario' }
            ]
        });
        res.json(reservas);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al obtener tus reservas', details: error.message });
    }
};

// Obtener slots disponibles (Lógica para HU-03)
exports.obtenerSlotsDisponibles = async (req, res) => {
    try {
        const { servicioId, fecha } = req.query;
        
        // 1. Obtener disponibilidad configurada por el admin
        const disp = await Disponibilidad.findOne({ where: { servicioId } });
        if (!disp) return res.status(404).json({ error: 'No hay horarios configurados' });

        // 2. Obtener reservas activas ya tomadas para ese día
        const reservadas = await Reserva.findAll({
            where: { servicioId, fecha, estado: 'activa' },
            attributes: ['hora_inicio']
        });

        // 3. Retornar configuración y horarios ocupados
        res.json({ 
            configuracion: disp,
            yaReservadas: reservadas.map(r => r.hora_inicio) 
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar disponibilidad' });
    }
};

// Listar reservas por fecha (HU-05) - para admin
exports.listarPorFecha = async (req, res) => {
    try {
        const { fecha } = req.query;
        
        if (!fecha) {
            return res.status(400).json({ error: 'Parámetro fecha es requerido' });
        }

        const reservas = await Reserva.findAll({
            where: { fecha },
            include: [
                { model: Servicio, as: 'Servicio' },
                { model: Usuario, as: 'Usuario' }
            ]
        });

        res.json(reservas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener reservas' });
    }
};

// Cancelar reserva (HU-06) - Cambiar estado a cancelada
exports.cancelarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await Reserva.findOne({ 
            where: { id, usuarioId: req.usuario.id } 
        });
        
        if (!reserva) {
            return res.status(404).json({ error: 'Reserva no encontrada o no autorizada' });
        }

        if (reserva.estado === 'cancelada') {
            return res.status(400).json({ error: 'Reserva ya estaba cancelada' });
        }

        await reserva.update({ estado: 'cancelada' });
        res.json({ message: 'Reserva cancelada correctamente', reserva });
    } catch (error) {
        res.status(500).json({ error: 'Error al cancelar' });
    }
};