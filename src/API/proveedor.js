import { API_URL } from "utils/constans";

export async function crearProveedorApi(formValue, auth){
    try {
        const url =`${API_URL}/prov/createProveedor`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({data: {
                nit: formValue.nit,
                nombre: formValue.nombre,
                direccion: formValue.direccion,
                telefono: formValue.telefono,
                observaciones: formValue.observaciones,
            }})
          };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        return null;
    }
}


export async function getProveedorApi(auth){
    try {
        const url =`${API_URL}/prov/getProveedores`
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

export const updateProveedor = async(formValue, auth, busqueda) =>{

        try {
            const url = `${API_URL}/prov/updateProveedor`
            const params ={
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`
                },
                body: JSON.stringify({
                    nombre: formValue.nombre,
                    nit: busqueda[0].NIT,
                    direccion: formValue.direccion,
                    telefono: formValue.telefono,
                    observaciones: formValue.observaciones,
                })
            }
            console.log('[UpdateProveedor  body]'+JSON.stringify(params.body));
            console.log('[UpdateProveedor busqueda[0]]'+JSON.stringify(busqueda[0]));
            const response = await fetch(url,params);
            const result = await response.json();
            return result
        } catch (error) {
            console.log(error.message);
            return null
        }

}



export const traerProveedor = async(proceso, valor, auth) =>{
    try {
        const url = `${API_URL}/prov/getOneProveedor`
        const params={
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                busqueda: proceso,
                valor,
            })
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result
    } catch (error) {
        console.log(error);
    }

}

