// Importamos la MASTER_KEY para comparar los datos de inicio de sesión
import { MASTER_KEY } from "../config.js";

// Importamos JWT para validar el token
import jwt from 'jsonwebtoken';

// Función para validar que el usuario haya iniciado sesión
/* Para considerar que esta función sea un middleware es necesario el tercer parámetro 'next', que nos indica
   que después de esta función se ejecutara otra */
export const accessRequired = (req, res, next)=>{
    // Obtenemos el token
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({message: ['No ha iniciado sesión, acceso denegado.']})
    }

    jwt.verify(token, MASTER_KEY, (err, user)=>{
        if(err){
            return res.status(403).json({message: ['Token inválido.']})
        }

        // Si no hay error se guarda la información del usuario en el objeto req
        req.user = user;

        next();
    })
}