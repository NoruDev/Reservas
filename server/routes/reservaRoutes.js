const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const auth = require('../middleware/auth'); // Importamos el protector

// Rutas de reservas
router.post('/', auth, reservaController.crearReserva);
router.get('/mis-reservas', auth, reservaController.listarMisReservas);
router.get('/por-fecha', reservaController.listarPorFecha); // Admin - listar por fecha
router.get('/slots-disponibles', reservaController.obtenerSlotsDisponibles);
router.put('/:id/cancelar', auth, reservaController.cancelarReserva); // HU-06

module.exports = router;

