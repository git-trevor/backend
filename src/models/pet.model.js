// Importamos mongoose para la creación de la base de datos
import mongoose from 'mongoose';

// Creamos el esquema para la colección de mascotas
const petSchema = mongoose.Schema({
    name:{
        type: String,
        maxLength: [15, 'El nonmbre de la mascota debe ser máximo de 15 caracteres.'],
        trim: true,
        uppercase: true,
        required: true
    },
    gender:{
        type: String,
        minLength: [1, 'El genero debe ser mínimo de un caracter.'],
        maxLength: [1, 'El genero debe ser máximo de un caracter.'],
        enum: ['H', 'M'],   //H - Hembra; M - Macho
        trim: true,
        uppercase: true
    },
    age_year:{
        type: Number,
        required: [true, 'Se debe ingresar el año de nacimiento.'],
        default: Date.year
    },
    age_month:{
        type: Number,
        required: [true, 'Se debe ingresar el mes de nacimiento.'],
        default: Date.month,
        min: [1, 'Mes inválido.'],
        max: [12, 'Mes inválido']
    },
    age_day:{
        type: Number,
        required: [true, 'Se debe ingresar el día de nacimiento.'],
        default: Date.day,
        min: [1, 'Día inválido.'],
        max: [31, 'Día inválido']
    },
    pet_image:{
        type: String,
        trim: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mp_user',
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('mp_pet', petSchema);