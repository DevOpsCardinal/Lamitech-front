
import {NICK} from '../utils/constans'


export async function setNickApi(nick) {
    try {
         localStorage.setItem(NICK, nick)
         return true;
    } catch (error) {
        
    }
}

export async function getNickApi(){
    try {
        const token =  localStorage.getItem(NICK);
        return token;
    } catch (error) {
        return null;
    }
}


export async function removeNickApi () {
    try {
          localStorage.removeItem(NICK)
         return true;
    } catch (error) {
        return null;
    }
}