// Importamos la librería zod para realizar las validaciones desde los esquemas de la base de datos
import { z } from 'zod';

export const petSchema = z.object({
    name: z.string({
        required_error: 'El nombre de la mascota es requerido.'
    }).max(15, {
        message: 'El nonmbre de la mascota debe ser máximo de 15 caracteres.'
    }),
    // gender: z.string({
    //     required_error: 'El sexo de la mascota es requerido.'
    // }).min(1, {
    //     message: 'El genero debe ser mínimo de un caracter.'
    // }).max(1, {
    //     message: 'El genero debe ser mínimo de un caracter.'
    // }),
    age_year: z.number({
        required_error: 'Se debe ingresar el año de nacimiento.'
    }),
    age_month: z.number({
        required_error: 'Se debe ingresar el mes de nacimiento.'
    }),
    age_day: z.number({
        required_error: 'Se debe ingresar el día de nacimiento.'
    })
});