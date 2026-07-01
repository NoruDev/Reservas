const express = require('express');
const router = express.Router();
const servicioController = require('../controllers/servicioController');

router.get('/', servicioController.getAllServicios);
router.post('/', servicioController.createServicio);
router.put('/:id', servicioController.updateServicio);
router.delete('/:id', servicioController.deleteServicio);
module.exports = router;