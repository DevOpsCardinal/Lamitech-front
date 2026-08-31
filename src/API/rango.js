
import {RANGO} from '../utils/constans'


export async function setRangoApi(rango) {
    try {
         localStorage.setItem(RANGO, rango)
         return true;
    } catch (error) {
        
    }
}

export async function getRangoApi(){
    try {
        const rango =  localStorage.getItem(RANGO);
        return rango;
    } catch (error) {
        return null;
    }
}


export async function removeRangoApi(){
    try {
          localStorage.removeItem(RANGO)
         return true;
    } catch (error) {
        return null;
    }
}