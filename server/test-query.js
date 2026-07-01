require('dotenv').config();
const { Reserva, Servicio, Usuario } = require('./models');

async function testQuery() {
  try {
    console.log('Fetching reservas with include...');
    const reservas = await Reserva.findAll({
      include: ['Servicio', 'Usuario']
    });
    
    console.log(JSON.stringify(reservas, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
}

testQuery();
