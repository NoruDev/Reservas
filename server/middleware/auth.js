const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Acceso denegado' });

    try {
        const verified = jwt.verify(token, 'SECRET_KEY');
        req.usuario = verified; // Guardamos el ID del usuario para usarlo luego
        next();
    } catch (error) {
        res.status(400).json({ error: 'Token no válido' });
    }
};
