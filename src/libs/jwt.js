// Importamos la librería JsonWebToken (JWT) para crear el token
import jwt from 'jsonwebtoken';
import { MASTER_KEY } from '../config.js';

// Función para generar un token de inicio de sesión
export function createAccessToken(payload){
    return new Promise((resolve, reject)=>{
        jwt.sign(
            payload,
            MASTER_KEY,
            {
                expiresIn: "1d"
            },
            (err, token)=>{
                if(err){
                    reject(err);
                    console.log(err);
                }

                resolve(token);
            }
        )
    })
}