const {insertUser, loginUser, getUserByid, getAllAdminUsers, getUserByUsernameOrEmail} = require('../services/userServices');
const {createUserValidations, getUserByIdValidation, loginValidation, getUserByIdentifierValidation} = require('../validations/userValidations')
const userController = {
    createUser: [
        ...createUserValidations,
        async (req, res) => {
            try{
                const newUser = await insertUser(req.body);
                console.log('Usuario creado: ', newUser);
                const {username, role, tasks, events, _id} = newUser
                res.status(201).json({username, role, tasks, events, _id});
            }catch(err){
                console.log('Error al crear usuario: ', err);
                res.status(500).json({message:'Error interno del servidor', 
                    success: 'NOK', 
                    error: err.message})
            }
        },
    ],
    getUserById:[
        ...getUserByIdValidation,
        async(req, res) => {
            try{
                const {id} = req.params;
                const user = await getUserByid(id);
                res.status(200).json(user);
            }catch(err){
                console.log('Error al obtener el usuario por ID', err);
                res.status(500).json({error: 'Error al obtener usuario por ID'})
            }
        },
    ],
    getUserByUsernameOrEmail:[
        ...getUserByIdentifierValidation,
        async(req, res) => {
            try{
                const {identifier} = req.params;
                const result = await getUserByUsernameOrEmail(identifier);
                res.status(200).json(result);
            }catch(err){
                res.status(401).json({error: 'Error al encontrar usuario por identifier'})
            }
        },
    ],
    loginUser:[
        ...loginValidation,
        async(req, res) => {
            try{
                const {identifier, password} = req.body;
                const result = await loginUser(identifier, password);
                res.cookie('token', result, {
                httpOnly: false,
                sameSite: 'Lax', 
                maxAge: 1000 * 60 * 60 // 1 hora
                }).status(200).json({ message: 'te has logeado' });
            }catch(err){
                res.status(401).json({error: 'Error al logearte'})
            }
        },
    ],
    
    logoutUser: [
        async (req, res) => {
        try {
          res.cookie('token', '', { 
            expires: new Date(0), 
            httpOnly: true, 
            path: '/' 
          });
          res.status(200).json({ message: 'Sesión cerrada correctamente' });
        } catch (error) {
          console.error('Error de logout:', error);
          res.status(500).json({ message: 'Error interno del servidor', success: 'NOK', error: error.message });
        }
      },
    ],
    getAllAdminUsers: [
        async(req, res) => {
            try{
                const users = await getAllAdminUsers();
                res.status(200).json(users)
            }catch(err){
                console.log('Error al recibir los usuarios admin', err);
                res.status(500).json({message: 'Error al recibir users admins'})
            }
        }
    ]

}
module.exports = userController;