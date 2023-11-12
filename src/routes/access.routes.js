// Importamos Router de express para construir las rutas de la aplicación
import { Router } from 'express';

// Importamos las funciones de acceso
import { registro, login, logout, profile, verifyToken } from '../controllers/access.controller.js';

// Importamos la función middleware
import { accessRequired } from '../middlewares/validateToken.js';

// Importamos el validador del esquema
import { validateSchema } from '../middlewares/validator.middleware.js';

// Importamos los esquemas de validación
import { registerSchema, loginSchema } from '../schemas/access.schemas.js';

const router = Router();

// En cada ruta mandamos llamar las funciones correspondientes
router.get('/verify', verifyToken)
router.post('/registro', validateSchema(registerSchema), registro);
router.post('/login', validateSchema(loginSchema),  login);
router.post('/logout', logout);
router.get('/profile', accessRequired, profile);

export default router;