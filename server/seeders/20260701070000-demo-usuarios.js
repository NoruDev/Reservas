'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPasswordAdmin = await bcrypt.hash('admin123', 10);
    const hashedPasswordCliente = await bcrypt.hash('cliente123', 10);

    await queryInterface.bulkInsert('Usuarios', [
      {
        nombre: 'Administrador',
        email: 'admin@example.com',
        password: hashedPasswordAdmin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Cliente Prueba',
        email: 'cliente@example.com',
        password: hashedPasswordCliente,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Usuarios', {
      email: ['admin@example.com', 'cliente@example.com']
    }, {});
  }
};
