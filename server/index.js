require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models'); // Importa la conexión de Sequelize

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../client')));

// Ruta de prueba para verificar que el API está viva
app.get('/health', (req, res) => {
    res.json({ status: 'API funcionando correctamente' });
});

// Rutas de la aplicación
const servicioRoutes = require('./routes/servicioRoutes');
const authRoutes = require('./routes/authRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const disponibilidadRoutes = require('./routes/disponibilidadRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/disponibilidad', disponibilidadRoutes);

// Levantar servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida con éxito.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
});