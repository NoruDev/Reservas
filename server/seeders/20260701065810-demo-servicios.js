'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Servicios', [
      {
        nombre: 'Corte de Cabello',
        duracion: 30,
        precio: 15.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Masaje Relajante',
        duracion: 60,
        precio: 45.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Servicios', null, {});
  }
};