/*
    Event Routes
    /api/events
 */

const { Router } = require("express");
const { check } = require('express-validator');
const router = Router();

// Controllers
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

// Middleware
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

// Middle Custom
const { isDate } = require("../helpers/isDate");

// Validacion global de Middleware Validacion Token
router.use(validarJWT);

// Obtener eventos
router.get('/', [], getEventos);

// Crear un nuevo evento
router.post('/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento);

// Actualizar evento
router.put('/:id', [], actualizarEvento);

// Borrar evento
router.delete('/:id', [], eliminarEvento);

module.exports = router;