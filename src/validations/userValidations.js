const {body, param, validationResult} = require('express-validator');

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
};

const createUserValidations = [
    body('username')
        .notEmpty()
        .withMessage('El username es requerido')
        .isString()
        .withMessage('El nombre debe ser texto'),
    body('password')
        .notEmpty()
        .withMessage('La password es requerida')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres'), 
    body('email')
        .notEmpty()
        .withMessage('El email es requerido')
        .isEmail()
        .withMessage('Debe proporcionar un email válido'),
    body('role')
        .optional()
        .isIn(['admin', 'user'])
        .withMessage('El rol debe ser admin o user'),
    body('tasks')
        .optional()
        .isArray()
        .withMessage('Tasks debe ser un array'),
    body('events')
        .optional()
        .isArray()
        .withMessage('Events debe ser un array'),

    validateResult
];
const getUserByIdValidation = [
    param('id')
        .isMongoId()
        .withMessage('Debe ser un ID de MongoDB válido'),

    validateResult
];
const loginValidation = [
    body('identifier')
        .notEmpty()
        .withMessage('Debes ingresar un email o username')
        .isString()
        .withMessage('El email o el username debe de ser texto'),
    body('password')
        .notEmpty()
        .withMessage('La password es requerida')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres'),
    validateResult
];
module.exports = {createUserValidations, getUserByIdValidation, loginValidation}