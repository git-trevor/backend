// Importo el servidor desde el archivo de creación
import medipet from "./app.js";

// Importo la conexión de la base de datos
import { DBConection } from './db.js';

// Conecto la Base de Datos
DBConection();

const PORT = process.env.PORT || 3000

// Asigno el puerto 3000 al servidor
medipet.listen(PORT);
console.log('Servidor corriendo en el puerto ' + PORT);