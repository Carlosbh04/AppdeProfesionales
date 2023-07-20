const Profesional = require('../model/profesionals');

// Obtiene los datos del profesional cuyo nombre y apellido se pasan como parámetro
const getProfesional = async (req, res, next) => {
  try {
    const { nombre, apellido } = req.body; // Accede al parámetro "nombre" y "apellido" desde el cuerpo de la solicitud
    const profesional = await Profesional.findOne({ nombre, apellido });

    if (!profesional) {
      return res.status(404).json({ message: 'Profesional no encontrado' });
    }

    res.json(profesional);
  } catch (error) {
    next(error);
  }
};


// Obtiene toda la colección de profesionales
const getAllProfesionales = async (req, res, next) => {
  try {
    const profesionales = await Profesional.find();
    res.json(profesionales);
  } catch (error) {
    next(error);
  }
};

// Añade un nuevo profesional en la colección de profesionales
const createProfesional = async (req, res, next) => {
  try {
    const { nombre, apellido, titulo, experiencia, habilidades, educacion } = req.body;
    const profesional = new Profesional({ nombre, apellido, titulo, experiencia, habilidades, educacion });
    await profesional.save();
    res.json({ message: 'Profesional agregado exitosamente' });
  } catch (error) {
    next(error);
  }
};


// Modifica los datos de un profesional por su nombre
const updateProfesional = async (req, res, next) => {
  try {
    const { nombre } = req.body; // Accede al parámetro "nombre" desde el cuerpo de la solicitud
    const updatedProfesional = await Profesional.findOneAndUpdate(
      { nombre },
      req.body,
      { new: true }
    );

    if (!updatedProfesional) {
      return res.status(404).json({ message: 'Profesional no encontrado' });
    }

    res.json({ message: 'Profesional actualizado exitosamente' });
  } catch (error) {
    next(error);
  }
};

const deleteProfesional = async (req, res, next) => {
  try {
    const { nombre } = req.body; // Accede al parámetro "nombre" desde el cuerpo de la solicitud
    await Profesional.findOneAndDelete({ nombre });
    res.json({ message: 'Profesional eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getProfesional,
  getAllProfesionales,
  createProfesional,
  updateProfesional,
  deleteProfesional,
};
