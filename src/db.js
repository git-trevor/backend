// Importamos mongoose para la creación de la base de datos
import mongoose from 'mongoose';

export const DBConection = async()=>{
    try{
        //* Conexión a la BD local
        // await mongoose.connect('mongodb://127.0.0.1/medipet')

        //* Conexión a la BD en MongoDB Atlas
        const url = 'mongodb+srv://adm_medipet:N02.M03.D12@cluster0.z06ksut.mongodb.net/?retryWrites=true&w=majority'       
        await mongoose.connect(url)

        console.log('Conexión a la Base de Datos Medipet realizada.');
    } catch(error){
        console.log('Error de conexión: ' + error);
    }
}