// Importamos la librería zod para realizar las validaciones desde los esquemas de la base de datos
import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string({
        required_error: 'El nombre de usuario es requerido.'
    }),
    email: z.string({
        required_error: 'El email es requerido.'
    }).email({
        required_error: 'El formato del email es inválido.'
    }),
    password: z.string({
        required_error: 'La contraseña es requerida.'
    }).min(5, {
        message: 'La contraseña debe contener al menos 5 caracteres.'
    })
});

export const loginSchema = z.object({
    email: z.string({
        required_error: 'El email es requerido.'
    }).email({
        required_error: 'El formato del email es inválido.'
    }),
    password: z.string({
        required_error: 'La contraseña es requerida.'
    }).min(5, {
        message: 'La contraseña debe contener al menos 5 caracteres.'
    })
});