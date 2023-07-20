const express = require('express');
const router = express.Router();
const { getProfesional, getAllProfesionales, createProfesional, updateProfesional, deleteProfesional } = require('../controller/user.controller');

// Obtiene los datos de un profesional específico por su nombre y apellido
router.get('/profesionales/:nombre/:apellido', getProfesional);

// Obtiene toda la colección de profesionales
router.get('/profesionales', getAllProfesionales);

// Añade un nuevo profesional en la colección de profesionales
router.post('/profesionales', createProfesional);

// Modifica los datos de un profesional por su nombre
router.put('/profesionales/:nombre', updateProfesional);

// Elimina a un profesional de la lista por su nombre
router.delete('/profesionales/:nombre', deleteProfesional);

module.exports = router;
