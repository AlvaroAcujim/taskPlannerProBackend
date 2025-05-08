const app = require('./src/app.js');
const connectDB = require('./src/config/database.js');
const config = require('./config.js');
const port = config.PORT;
const startServer = async() => {
    try{
        await connectDB();

        app.listen(port, () => {
            console.log(`Servidor corriendo en http://localhost:${port}`);
        });
    }catch(err){
        console.log('No se ha podido levantar el servidor', err);
        process.exit(1);
    }
}
startServer();