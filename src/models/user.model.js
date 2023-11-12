// Importamos mongoose para la creación de la base de datos
import mongoose from 'mongoose';

// Creamos el esquema para la colección de usuarios
/* Los datos que se van a almacenar son username, email y password (por el momento) */
const userSchema = mongoose.Schema({
    username:{
        type: String,
        minLength: [5, 'El nombre de usuario debe contener al menos 5 caracteres.'],
        maxLength: [30, 'El nombre de usuario debe ser máximo de 30 caracteres.'],
        trim: true,
        uppercase: true,
        required: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        minLength: [5, 'La contraseña debe contener al menos 5 caracteres.'],
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('mp_user', userSchema);