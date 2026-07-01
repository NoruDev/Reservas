const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');


const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

        // Comparar contraseña plana con la cifrada
        const validPassword = await bcrypt.compare(password, usuario.password);
        if (!validPassword) return res.status(401).json({ error: 'Contraseña incorrecta' });

        // Generar Token
        const token = jwt.sign({ id: usuario.id }, 'SECRET_KEY', { expiresIn: '1h' });

        res.json({ message: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({ error: 'Error en el login' });
    }
};

exports.register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Cifrar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario
        const usuario = await Usuario.create({
            nombre,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'Usuario registrado con éxito', userId: usuario.id });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario', details: error.message });
    }
};