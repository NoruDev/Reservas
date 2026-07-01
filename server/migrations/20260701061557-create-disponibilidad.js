'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Disponibilidads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      diaSemana: {
        type: Sequelize.INTEGER
      },
      horaInicio: {
        type: Sequelize.TIME
      },
      horaFin: {
        type: Sequelize.TIME
      },
      servicioId: {
        type: Sequelize.INTEGER,
        allowNull: false, // ¡Muy importante! Un horario debe pertenecer a un servicio
        references: {
          model: 'Servicios', // Nombre exacto de la tabla (asegúrate que sea plural)
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' // Si el servicio se elimina, sus disponibilidades también
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Disponibilidads');
  }
};