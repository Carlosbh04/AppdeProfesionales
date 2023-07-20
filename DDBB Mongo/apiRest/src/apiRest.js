const mongoose = require('./database');
const app = require('./app'); 
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor API REST funcionando en el puerto ${PORT}`);
});
