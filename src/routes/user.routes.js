// Importamos Router de express para construir las rutas de la aplicación
import { Router } from 'express';

// Importamos las funciones de acceso
import { createUser, editUser, deleteUser, getUsers, getUser } from '../controllers/user.controller.js';

// Importamos la función middleware
import { accessRequired } from '../middlewares/validateToken.js';

// Importamos el validador del esquema
import { validateSchema } from '../middlewares/validator.middleware.js';

// Importamos los esquemas de validación
import { registerSchema } from '../schemas/access.schemas.js';

const router = Router();

// En cada ruta mandamos llamar las funciones correspondientes
// Crear un usuario
router.post('/usuario', accessRequired, validateSchema(registerSchema), createUser);

// Editar un usuario
router.put('/usuario/:id', accessRequired, editUser);

// Eliminar un usuario
router.delete('/usuario/:id', accessRequired, deleteUser);

// Obtener todos los productos
router.get('/usuario', accessRequired, getUsers);

// Obtener un producto por Id
router.get('/usuario/:id', accessRequired, getUser);

export default router;