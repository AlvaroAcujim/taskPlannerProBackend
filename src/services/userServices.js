const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {sendConfirmEmail} = require('./emailService');
//si se despliega meter en .env
const config = require('../../config.js');
const SECRET_KEY = config.SECRET_KEY;

    const insertUser = async (userData) => {
        try {
            const { username, password, email, role, tasks, events } = userData;

            const existUser = await User.findOne({username});
            const existUserMail = await User.findOne({email});
            if(existUser || existUserMail){
                throw new Error('Ya existe un usuario con ese username o email')
            }
            if(!username || !password || !email || !role){
                throw new Error('username, password, email y role son requeridos')
            }
            console.log('Hashing password');
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log('Hashed password -> ', hashedPassword);

            const user = new User({
                username, 
                password: hashedPassword, 
                email,
                role: role || 'user',
                tasks: tasks || [],
                events: events || []
            });
            await user.save();
            await sendConfirmEmail(email);
            return user
        } catch (err) {
            console.log('Error al crear usuario: ' , err);
            throw err;
        }
  };
    const getUserByid = async(id) => {
        try {
            const user = await User.findById(id).select('username image role events tasks');
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            console.log('Usuario encontrado:', user);
            return user;
        } catch (err) {
            console.error('Error al obtener usuario por username:', err);
            throw err;
        }
  }
  const getAllAdminUsers = async() => {
    try{
        const user = await User.find({role: 'admin'}).select('username image events');
        if(!user){
            throw new Error('Error al recoger los usuarios admin');
        }
        return user;
    }catch(err){
        console.log('Error al obtener los usuarios admin', err);
        throw err;
    }
  }
  
    const loginUser = async (identifier, password) => {
        try {
            const input = identifier.includes('@') ? {email: identifier} : {username: identifier};
            const user = await User.findOne(input).select('username image events tasks');
            if (!user) {
                throw new Error('Usuario no encontrado');
            } 
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Contraseña incorrecta');
            }
    
            const token = jwt.sign(
                {   id: user._id, 
                    role: user.role},
                    SECRET_KEY,
                {expiresIn: '1d'}
            );
            return token
        } catch (err) {
            console.log('Error al crear usuario: ' , err);
            throw err;
        }
  };
  module.exports = {insertUser, getUserByid, loginUser, getAllAdminUsers};
