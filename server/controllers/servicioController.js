const { Servicio } = require('../models');

// Obtener todos los servicios
exports.getAllServicios = async (req, res) => {
    try {
        const servicios = await Servicio.findAll();
        res.json(servicios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener servicios' });
    }
};

// Crear un servicio (útil para el admin)
exports.createServicio = async (req, res) => {
    try {
        const { nombre, descripcion, precio } = req.body;
        const servicio = await Servicio.create({ nombre, descripcion, precio });
        res.status(201).json(servicio);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear servicio' });
    }
};

exports.updateServicio = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Servicio.update(req.body, { where: { id } });
        if (updated) {
            res.json({ message: 'Servicio actualizado' });
        } else {
            res.status(404).json({ error: 'Servicio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar' });
    }
};

// Eliminar un servicio
exports.deleteServicio = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Servicio.destroy({ where: { id } });
        if (deleted) {
            res.json({ message: 'Servicio eliminado' });
        } else {
            res.status(404).json({ error: 'Servicio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar' });
    }
};