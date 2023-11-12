// Importamos el modelo de datos para los usuarios
import mp_user from '../models/user.model.js';

// Importamos el módulo bcryptjs para encriptar el password
import bcryptjs from 'bcryptjs';

// Importamos el archivo jwt para usar el token
import { createAccessToken } from '../libs/jwt.js';

// Función para crear un usuario
export const createUser = async (req, res) =>{
    const {username, email, password} = req.body;

    try{
        // Validamos que el email no este ya registrado
        const userFound = await mp_user.findOne({email});

        if(userFound){
            // Si encontro un usuario con el email que se envía, retorna un mensaje de error
            return res.status(400).json({message: ['El email ya se encuentra registrado.']})
        }
        
        const passwordHash = await bcryptjs.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: passwordHash
        });

        const savedUser = await newUser.save();
        res.json({
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email
        });
    } catch(error){
        console.log(error);
        res.status(500).json({message: ['Error al crear un usuario.']})
    }
}

// Función para editar un usuario
export const editUser = async (req, res)=>{
    const {username, password} = req.body;

    try{
        const passwordHash = await bcryptjs.hash(password, 10);
        const user = await mp_user.findByIdAndUpdate(req.params.id, {username: username, password: passwordHash}, {new: true});

        if(!user)
            return res.status(404).json({message: ['Usuario no encontrado.']})
        res.json(user);
    } catch(error){
        console.log(error);
        res.status(500).json({message: ['Error al actualizar al usuario.']})
    }
};

// Función para eliminar un usuario
export const deleteUser = async (req, res)=>{
    try{
        const user = await mp_user.findByIdAndDelete(req.params.id);

        if(!user)
            res.status(400).json({message: ['Usuario no encontrado.']})
        res.json(user);
    } catch(error){
        console.log(error);
        res.status(500).json({message: ['Error al eliminar al usuario.']})
    }
};

// Función para obtener todos los usuarios
export const getUsers = async (req, res)=>{
    try{
        const users = await mp_user.find();

        res.json(users);
    } catch(error){
        console.log(error);
        res.status(500).json({message: ['Error al obtener los usuarios.']});
    }
};

// Función para obtener un producto
export const getUser = async (req, res)=>{
    try{
        const user = await mp_user.findById(req.params.id);

        if(!user)
            return res.status(400).json({message: ['Usuario no encontrado.']})
        res.json(user);
    } catch(error){
        console.log(error);
        res.status(500).json({message: ['Error al otener el usuario.']})
    }
};