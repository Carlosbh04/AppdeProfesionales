const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://MiniApp:X29513321x%40@miniapp.d9os6lt.mongodb.net/ProfesionalesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conexión exitosa a la base de datos');
}).catch((error) => {
  console.error('Error al conectar a la base de datos:', error.message);
  process.exit(1); 
});

module.exports = mongoose;
