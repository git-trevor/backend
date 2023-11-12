// Importamos el modelo de datos para las mascotas
import mp_pet from '../models/pet.model.js';

// Importamos el modelo de datos para completar info de mascotas
import mp_pet_detail from '../models/pet_detail.model.js'

import { __dirname, __filename } from '../config.js';

// Función para obtener todas las mascotas
export const getPets = async(req, res)=>{
    try{
        const pets = await mp_pet.find({user: req.user.id}).populate('user');
        res.json(pets)
    } catch(error){
        console.log(error);
        res.status(500).json({message: ['Error al obtener las mascotas.']});
    }
};

// Función para registrar una mascota
export const registerPet = async(req, res)=>{
    try{
        const {name, gender, age_year, age_month, age_day} = req.body;

        //* Bloque de código para subir la foto de la mascota en el servidor local
        // if (!req.files || Object.keys(req.files).length === 0){
        //     return res.status(400).json({message: ['No se subio el archivo.']});
        // }

        // let url_img = req.files.url_img;
        // let uploadPath = __dirname + 'imgs/' + url_img.name

        // url_img.mv(uploadPath, function(err){
        //     if (err)
        //         return res.status(500).send(err);
        // });
        //* Fin de código para subir la foto en el servidor local

        const newPet = new mp_pet({
            name,
            gender,
            age_year,
            age_month,
            age_day,
            // pet_image: url_img.name,
            user: req.user.id
        });

        const savedPet = await newPet.save();
        res.json(savedPet);
    } catch(error){
        console.log(error);
        res.status(500).json({message: ['Error al registrar a la mascota.']})
    }
};

// Función para obtener una mascota
export const getPet = async(req, res)=>{
    try{
        const pet = await mp_pet.findById(req.params.id).populate('user');

        if(!pet){
            return res.status(404).json({message: ['Mascota no encontrada.']})
        }

        res.json(pet);
    } catch(error){
        console.log(error);
        res.status(500).json({message: ['Error al obtener la información de la mascota.']})
    }
};

// Función para eliminar una mascota
export const deletePet = async(req, res)=>{
    try{
        const pet = await mp_pet.findByIdAndDelete(req.params.id);

        if(!pet){
            return res.status(404).json({message: ['Mascota no encontrada']});
        }
        res.json(pet);
    } catch(error){
        console.log(error);
        res.status(500).json({message: ['Error al eliminar la mascota.']})
    }
};

// Función para editar una mascota
export const editPet = async(req, res)=>{
    try{
        const pet = await mp_pet.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if(!pet){
            return res.status(404).json({message: ['Mascota no encontrada']});
        }

        res.json(pet);
    } catch(error){
        console.log(error);
        res.status(500).json({message: ['Error al acutalizar la información de la mascota.']})
    }
};

// Función para completar la información de una mascota
export const completeInfoPet = async(req, res)=>{
    try{
        const {pet_breed, pet_weight, pet_traits, pet_sterilized} = req.body;

        const completePet = new mp_pet_detail({
            pet_breed,
            pet_weight,
            pet_traits,
            pet_sterilized,
            pet: req.params.id
        });

        const savedPet = await completePet.save();
        res.json(savedPet);
    } catch(error){
        console.log(error);
        res.status(500).json({message: ['Error al completar la información de la mascota.']})
    }
};

// Función para obtener info una mascota
export const getInfoPet = async(req, res)=>{
    try{
        const infoPet = await mp_pet_detail.find({pet: req.params.id}).populate('pet');

        if(!infoPet){
            return res.status(404).json({message: ['Información de la mascota no encontrada.']})
        }

        res.json(infoPet);
    } catch(error){
        console.log(error);
        res.status(500).json({message: ['Error al obtener la información de la mascota.']})
    }
};