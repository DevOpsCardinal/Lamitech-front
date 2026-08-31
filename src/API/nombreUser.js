
import {NOMBRE} from '../utils/constans'


export async function setNombreUserApi(nombre) {
    try {
         localStorage.setItem(NOMBRE, nombre)
         return true;
    } catch (error) {
        
    }
}

export async function getNombreUserApi(){
    try {
        const nombre =  localStorage.getItem(NOMBRE);
        return nombre;
    } catch (error) {
        return null;
    }
}


export async function removeNombreUserApi(){
    try {
          localStorage.removeItem(NOMBRE)
         return true;
    } catch (error) {
        return null;
    }
}