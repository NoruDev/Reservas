const express = require('express');
const router = express.Router();
const disponibilidadController = require('../controllers/disponibilidadController');

// Obtener disponibilidad (público, para ver horarios)
router.get('/', disponibilidadController.obtenerDisponibilidad);

// Configurar horario (solo admin)
router.post('/', disponibilidadController.configurarHorario);

// Eliminar horario (solo admin)
router.delete('/:id', disponibilidadController.eliminarHorario);

module.exports = router;
