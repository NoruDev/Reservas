const { Disponibilidad, Servicio } = require('../models');

// Configurar horario disponible (HU-03)
exports.configurarHorario = async (req, res) => {
    try {
        const {nombre ,servicioId, diaSemana, horaInicio, horaFin } = req.body;
        
        // Validaciones
        if (!servicioId || diaSemana === undefined || !horaInicio || !horaFin) {
            return res.status(400).json({ 
                error: 'Faltan parámetros: servicioId, diaSemana, horaInicio, horaFin' 
            });
        }

        // Verificar que el servicio existe
        const servicio = await Servicio.findByPk(servicioId);
        if (!servicio) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }

        // Crear o actualizar disponibilidad
        const [config, created] = await Disponibilidad.findOrCreate({
            where: { servicioId, diaSemana },
            defaults: { horaInicio, horaFin }
        });

        if (!created) {
            await config.update({ horaInicio, horaFin });
        }

        res.status(201).json({ 
            message: 'Horario configurado correctamente',
            data: config 
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al configurar horario', details: error.message });
    }
};

// Obtener disponibilidad de un servicio
exports.obtenerDisponibilidad = async (req, res) => {
    try {
        const { servicioId, diaSemana } = req.query;

        let where = {};
        if (servicioId) where.servicioId = servicioId;
        if (diaSemana !== undefined) where.diaSemana = diaSemana;

        const disponibilidades = await Disponibilidad.findAll({ where });
        res.json(disponibilidades);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener disponibilidad' });
    }
};

// Eliminar una franja horaria
exports.eliminarHorario = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Disponibilidad.destroy({ where: { id } });

        if (deleted) {
            res.json({ message: 'Horario eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Horario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar horario' });
    }
};