
import {ESTADO} from '../utils/constans'


export async function setEstadoApi(estado) {
    try {
         localStorage.setItem(ESTADO, estado)
         return true;
    } catch (error) {
        
    }
}

export async function getEstadoApi(){
    try {
        const estado =  localStorage.getItem(ESTADO);
        return estado;
    } catch (error) {
        return null;
    }
}


export async function removeEstadoApi(){
    try {
          localStorage.removeItem(ESTADO)
         return true;
    } catch (error) {
        return null;
    }
}