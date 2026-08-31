
import { API_URL } from "utils/constans";

export async function createPlantaApi(formValue, auth) {
    try {
        const url = `${API_URL}/planta/createPlantas`
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


export async function getPlantaApi(auth) {
    try {
        const url = `${API_URL}/planta/getPlantas`
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


export const traerPlanta = async(proceso,valor, auth) =>{
    try{
        const url = `${API_URL}/planta/getOnePlanta`
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
        console.log('[traerPlanta body]'+params.body);
        const response = await fetch(url,params)
        const result = await response.json();
        return result
    }catch(error){
        console.log(error.message);
    }

}


export const updatePlanta = async(formValue, auth, busqueda)=>{
    try {
        const url = `${API_URL}/planta/updatePlanta`
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
        console.log('[updateMateriaPrima body]'+ JSON.stringify(params.body));
        console.log('[updateMateriaPrima busqueda[0]]'+JSON.stringify(busqueda[0]));
       const response = await fetch(url,params)

       const result = await response.json();
       return result;
    } catch (error) {
        console.log(error.message);
    }
}