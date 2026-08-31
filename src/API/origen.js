
import { API_URL } from "utils/constans";

export async function createOrigenApi(formValue, auth) {
    try {
        const url = `${API_URL}/origen/createOrigen`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({data:{
                codigo: formValue.codigo,
                nombre: formValue.nombre,
                detalles: formValue.detalles,
                Materia_Prima_Certificada: formValue.Materia_Prima_Certificada,
            }})
        };
        const response = await fetch(url, params);
        const result = await response.json();
        console.log("000000000", result)
        return result;
    } catch (error) {
        return null;
    }
}


export async function getOrigenApi(auth) {
    try {
        const url = `${API_URL}/origen/getOrigenes`
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


export const traerOrigen = async(proceso,valor, auth) =>{
    try{
        const url = `${API_URL}/origen/getOneOrigen`
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
        console.log('[traerOrigen body]'+params.body);
        const response = await fetch(url,params)
        const result = await response.json();
        return result
    }catch(error){
        console.log(error.message);
    }

}


export const updateOrigen = async(formValue, auth, busqueda)=>{
    try {
        const url = `${API_URL}/origen/updateOrigen`
        const params ={
            method: 'PUT',
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                codigo: busqueda[0].Codigo,
                nombre: formValue.nombre,
                detalles: formValue.detalles,
                Materia_Prima_Certificada: formValue.Materia_Prima_Certificada
            })
        }
        console.log('[updateOrigen body]'+ JSON.stringify(params.body));
        console.log('[updateOrigen busqueda[0]]'+JSON.stringify(busqueda[0]));
       const response = await fetch(url,params)
       const result = await response.json();
       return result;
    } catch (error) {
        console.log(error.message);
    }
}