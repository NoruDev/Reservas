'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Reservas', 'usuarioId', {
      type: Sequelize.INTEGER,
      references: { model: 'Usuarios', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('Reservas', 'servicioId', {
      type: Sequelize.INTEGER,
      references: { model: 'Servicios', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Reservas', 'usuarioId');
    await queryInterface.removeColumn('Reservas', 'servicioId');
  }
};