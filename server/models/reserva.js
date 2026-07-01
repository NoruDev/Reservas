'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
    static associate(models) {
      Reserva.belongsTo(models.Servicio, { foreignKey: 'servicioId', as: 'Servicio' });
      Reserva.belongsTo(models.Usuario, { foreignKey: 'usuarioId', as: 'Usuario' });
    }
  }

  Reserva.init({
    servicioId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER,
    fecha: {
      type: DataTypes.DATEONLY, // YYYY-MM-DD format
      allowNull: false
    },
    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: 'activa'
    }
  }, {
    sequelize,
    modelName: 'Reserva',
    underscored: false,
    timestamps: true
  });
  
  return Reserva;
};