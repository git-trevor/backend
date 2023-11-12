// Importamos Router de express para construir las rutas de la aplicación
import { Router } from 'express';

// Importamos la función middleware
import { accessRequired } from '../middlewares/validateToken.js';

// Importamos las funciones para controlar información de mascotas
import { getPets, registerPet, getPet, deletePet, editPet, completeInfoPet, getInfoPet } from '../controllers/pet.controller.js';

// Importamos el validador del esquema
import { validateSchema } from '../middlewares/validator.middleware.js';

// Importamos los esquemas de validación
import { petSchema } from '../schemas/pet.schemas.js';

const router = Router();

// Obtener todas las mascotas
router.get('/pets', accessRequired, getPets);

// Registrar una mascota
router.post('/pets', validateSchema(petSchema), accessRequired, registerPet);

// Completar información de la mascota
router.post('/petsInfo/:id', completeInfoPet);

// Obtener información de la mascota
router.put('/petsInfo/:id', getInfoPet);

// Obtener una mascota por id
router.get('/pets/:id', accessRequired, getPet);

// Eliminar una mascota por id
router.delete('/pets/:id', accessRequired, deletePet);

// Editar información de una mascota por id
router.put('/pets/:id', accessRequired, editPet);

export default router;