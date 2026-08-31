
import { API_URL } from "utils/constans";


export const traerMateriaPrima= async(proceso, valor, auth) =>{
    try{
        const url = `${API_URL}/materiaPrima/getOneMateriaPrima`;
        const params={
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                busqueda:proceso,
                valor
            })
        }
        console.log('[traerMateriaPrima body]'+params.body);
        const response = await fetch(url,params);
        const result = await response.json();
        return result
    }catch(error){
        console.log(error.message);
    }
}

export const updateMateriaPrima = async(formValue, auth, busqueda) =>{
    try {
        const url = `${API_URL}/materiaPrima/updateMateriaPrima`
        const params ={
            method:'PUT',
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
        console.log('[updateMateriaPrima body]'+ JSON.stringify(params.body));
        console.log('[updateMateriaPrima busqueda[0]]'+JSON.stringify(busqueda[0]));
        const response = await fetch(url,params)
        const result = await response.json();
        return result
    } catch (error) {
        console.log(error.message);
    }
}

export async function createMateriaPrimaApi(formValue, auth) {
    try {
        const url = `${API_URL}/materiaPrima/createMateriaPrima`
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
        return result;
    } catch (error) {
        return null;
    }
}


export async function getMateriaPrimaApi(auth) {
    try {
        const url = `${API_URL}/materiaPrima/getMateriaPrimas`
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