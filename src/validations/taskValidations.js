const {body, param, validationResult} = require('express-validator');

const validateResult = (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }
    next();
}

const createTaskValidation = [ 
    body('title')
        .notEmpty()
        .withMessage('El titulo es requerido')
        .isString()
        .withMessage('El titulo debe ser texto'),
    body('description')
        .notEmpty()
        .withMessage('La descripcion es requerida')
        .isString()
        .withMessage('La descripcion debe ser texto'),
    body('status')
        .notEmpty()
        .withMessage('El estado es requerido')
        .isString()
        .withMessage('El estado debe ser texto'),
    body('date')
        .notEmpty()
        .withMessage('La fecha es requerida')
        .isDate()
        .withMessage('La fecha debe ser una fecha'),
        validateResult
];
const removeTaskValidation = [
    param('taskId')
        .isMongoId()
        .withMessage('El id del task no es valido'),
        validateResult
]
const updateTaskValidation = [
    param('taskId')
        .isMongoId()
        .withMessage('El id del task no es valido'),
    body('title')
        .notEmpty()
        .withMessage('El titulo es requerido')
        .isString()
        .withMessage('El titulo debe ser texto'),
    body('description')
        .notEmpty()
        .withMessage('La descripcion es requerida')
        .isString()
        .withMessage('La descripcion debe ser texto'),
    body('status')
        .notEmpty()
        .withMessage('El estado es requerido')
        .isString()
        .withMessage('El estado debe ser texto'),
    body('date')
        .notEmpty()
        .withMessage('La fecha es requerida')
        .isDate()
        .withMessage('La fecha debe ser una fecha'),
        validateResult
]

module.exports = {createTaskValidation, removeTaskValidation,updateTaskValidation}