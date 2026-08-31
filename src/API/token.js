
import {TOKEN} from '../utils/constans'


export async function setTokenApi(token) {
    try {
         localStorage.setItem(TOKEN, token)
         return true;
    } catch (error) {
        
    }
}

export async function getTokenApi(){
    try {
        const token =  localStorage.getItem(TOKEN);
        return token;
    } catch (error) {
        return null;
    }
}


export async function removeTokenApi () {
    try {
          localStorage.removeItem(TOKEN)
         return true;
    } catch (error) {
        return null;
    }
}