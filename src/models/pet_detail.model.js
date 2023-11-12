// Importamos mongoose para la creación de la base de datos
import mongoose from 'mongoose';

// Creamos el esquema para completar los datos del registro de mascota
const petSchemaDetail = mongoose.Schema({
    //* Raza
    pet_breed:{
        type: String,
        maxLength: [25, 'La raza de la mascota debe ser máximo de 25 caracteres.'],
        trim: true,
        uppercase: true
    },
    //* Peso
    pet_weight:{
        type: Number,
        default: 0.0,
    },
    //* Color de pelaje, color de ojos, etc...
    pet_traits:{
        type: String,
        maxLength: [300, 'Las características no deben sobrepasar los 300 caracteres.'],
        trim: true,
        uppercase: true
    },
    //* Mascota esterilizada
    pet_sterilized:{
        type: String,
        enum: ['S', 'N'],   //S - Sí; N - No
        trim: true,
        uppercase: true
    },
    pet:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mp_pet',
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('mp_pet_detail', petSchemaDetail);