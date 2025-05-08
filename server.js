const app = require('./src/app');
const connectDB = require('./src/config/database');

import { PORT } from './config.js';

const startServer = async() => {
    try{
        await connectDB();

        app.listen(port, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    }catch(err){
        console.log('No se ha podido levantar el servidor', err);
        process.exit(1);
    }
}
startServer();