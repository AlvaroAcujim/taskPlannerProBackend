const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        await mongoose.connect('mongodb+srv://alvaroacu:pB18CuGiZF5q2Veo@cluster0.uxlva.mongodb.net/taskPlannerDB?retryWrites=true&w=majority&appName=Cluster0')
        console.log('Conexión a la base de datos establecida correctamente');
    } catch(err){
        console.log('Error al conectar a la BBDD: ', err);
        process.exit(1);
    }
};
module.exports = connectDB;