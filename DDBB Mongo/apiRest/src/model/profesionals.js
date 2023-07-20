const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    titulo: String,
    experiencia: Number,
    habilidades: [String],
    educacion: String,
});

const User = mongoose.model('profesionals', userSchema);

module.exports = User;
