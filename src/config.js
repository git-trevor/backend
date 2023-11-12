import * as url from 'url';

// Creamos una variable con la llave secreta para la generación del token
export const MASTER_KEY = 'N02.M03.D12'

// Creo variables globales para guardar la ruta y el filename
export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = url.fileURLToPath(new URL('.', import.meta.url));