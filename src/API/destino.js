
import { API_URL } from "utils/constans";

export async function createDestinoApi(formValue, auth) {
    try {
        const url = `${API_URL}/destino/createDestino`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                codigo: formValue.codigo,
                nombre: formValue.nombre,
                detalles: formValue.detalles,
            })
        };
        const response = await fetch(url, params);
        const result = await response.json();
        console.log("000000000", result)
        return result;
    } catch (error) {
        return null;
    }
}


export async function getDestinoApi(auth) {
    try {
        const url = `${API_URL}/destino/getDestinos`
        const params = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        return null;
    }
}


export const traerDestino = async(proceso,valor, auth) =>{
    try{
        const url = `${API_URL}/destino/getOneDestino`
        const params ={
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                busqueda: proceso,
                valor
            })
        }
        console.log('[traerDestino body]'+params.body);
        const response = await fetch(url,params)
        const result = await response.json();
        return result
    }catch(error){
        console.log(error.message);
    }

}


export const updateDestino = async(formValue, auth, busqueda)=>{
    try {
        const url = `${API_URL}/destino/updateDestino`
        const params ={
            method: 'PUT',
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                codigo: busqueda[0].Codigo,
                nombre: formValue.nombre,
                detalles: formValue.detalles
            })
        }
        console.log('[updateDestino body]'+ JSON.stringify(params.body));
        console.log('[updateDestino busqueda[0]]'+JSON.stringify(busqueda[0]));
       const response = await fetch(url,params)
       const result = await response.json();
       return result;
    } catch (error) {
        console.log(error.message);
    }
}