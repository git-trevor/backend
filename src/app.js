// Importo la librería express, para crear el servidor
import express from 'express';

// Importo la librería morgan, para tener un log de las peticiones al servidor (solo en desarrollo y en consola)
import morgan from 'morgan';

// Importamos las rutas de acceso
import accessRoutes from './routes/access.routes.js';

// Importamos las rutas del CRUD de mascotas
import petRoutes from './routes/pet.routes.js';

// Importamos las rutas del CRUD de usuarios
import userRoutes from './routes/user.routes.js';

// Importamos la librería cookie-parser para procesar las cookies
import cookieParser from 'cookie-parser';

// Importamo la librería cors para permitir peticiones externas
import cors from 'cors';

// Importamos la libreria file-upload
import fileUpload from 'express-fileupload';

// Creo el servidor
const medipet = express();

// Indico al servidor que utilizará cors
medipet.use(cors({
    origin: [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost',
        'http://localhost/medipet',
        'https://medipet-r3og.onrender.com',
        'https://frontend-q63q.onrender.com'
    ],
    credentials: true
}));

// Indico al servidor que use la libreria morgan
medipet.use(morgan('dev'));

// Indico que los datos recibidos serán en formato JSON
medipet.use(express.json());

// Indicamos al servidor que las cookies se manejaran como objetos JSON
medipet.use(cookieParser());

// Indicamos que la aplicación utilizara file-upload
medipet.use(fileUpload());

// Indico al servidor que utilice los objetos accessRoutes, petRoutes y userRoutes
medipet.use('/medipet/', accessRoutes);
medipet.use('/medipet/', petRoutes);
medipet.use('/medipet/', userRoutes);

export default medipet;