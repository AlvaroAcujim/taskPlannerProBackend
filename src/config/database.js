const mongoose = require('mongoose');
import { DB_USER, DB_PASS } from '../../config.js';

const connectDB = async() => {
    try{
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.uxlva.mongodb.net/taskPlannerDB?retryWrites=true&w=majority&appName=Cluster0`)
        console.log('Conexión a la base de datos establecida correctamente');
    } catch(err){
        console.log('Error al conectar a la BBDD: ', err);
        process.exit(1);
    }
};
module.exports = connectDB;