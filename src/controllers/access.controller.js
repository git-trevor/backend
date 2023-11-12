// Importamos el modelo de datos para los usuarios
import mp_user from '../models/user.model.js';

// Importamos el módulo bcryptjs para encriptar el password
import bcryptjs from 'bcryptjs';

// Importamos el archivo jwt para usar el token
import { createAccessToken } from '../libs/jwt.js';

import jwt from 'jsonwebtoken';
import { MASTER_KEY } from '../config.js';

// Función para registrar usuarios
export const registro = async(req, res)=>{
    // Declaro variables para guardar los datos que recibamos para el registro del usuario
    const { username, email, password } = req.body;

    try{
        // Validamos que el email no este ya registrado
        const userFound = await mp_user.findOne({email});

        if(userFound){
            // Si encontro un usuario con el email que se envía, retorna un mensaje de error
            return res.status(400).json({message: ['El email ya se encuentra registrado.']})
        }

        // Encriptamos la contraseña recibida
        const passwordEncripted = await bcryptjs.hash(password, 10);

        // Creamos un objeto de usuario con los datos recibidos
        const newUser = new mp_user({
            username,
            email,
            password: passwordEncripted
        });

        // Guardamos en la base de datos el nuevo usuario
        const userSaved = await newUser.save();

        // Creamos el token con la información del usuario
        const token = await createAccessToken({id: userSaved._id})
        res.cookie('token', token, {
            secure: true,
            sameSite: 'none',
            httpOnly: true
        });

        // Mandamos como respuesta la información del usuario que fue registrado, omitiendo el password
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email
        });
    } catch(error){
        console.log(error);
        res.status(500).json({message: ['Error al crear un usuario.']})
    }
}

// Función para iniciar sesión
export const login = async(req, res)=>{
    const {email, password} = req.body;

    try{
        const userFound = await mp_user.findOne({email});

        if(!userFound){
            return res.status(400).json({message: ['El usuario no se encontro.']})
        }

        // Comparamos el password proporcionado con el de la base de datos, si es igual se genera token y cookie
        const passwordMatch = await bcryptjs.compare(password, userFound.password);

        if(!passwordMatch){
            return res.status(400).json({message: ['La contraseña no coincide.']})
        }

        const token = await createAccessToken({id: userFound._id});
        res.cookie('token', token, {
            secure: true,
            sameSite: 'none',
            httpOnly: true
        });

        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });
    } catch(error){
        console.log(error);
    }
}

// Función para cerrar sesión
export const logout = (req, res)=>{
    res.cookie('token', '', {
        expires: new Date(0)
    });

    return res.sendStatus(200);
}

// Función para mostrar los datos del usuario que inicio sesión
export const profile = async(req, res)=>{
    const userFound = await mp_user.findById(req.user.id);

    if(!userFound){
        return res.status(400).json({message: ['Usuario no encontrado.']})
    }

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email
    })
}

// Función para validar el token de inicio de sesión
export const verifyToken = async (req, res)=>{
    const { token } = req.cookies;

    if(!token)
        return res.status(401).json({message:["No autorizado"]});

    jwt.verify(token, MASTER_KEY, async (err, user)=>{
        if(err)
            return res.status(401).json({message:["No autorizado"]});

        const userFound = await mp_user.findById(user.id);

        if(!userFound)
            return res.status(401).json({message:["No autorizado"]});

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })
    })
}