import { API_URL } from "utils/constans";



export async function updateVehiculoApi(formValue, auth, busqueda){
    try{
        const url = `${API_URL}/api/updateVehiculo`
        const params = {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                placa: busqueda[0].placa,
                tipo: formValue.tipo,
                // soat: formValue.soat,
                // tecnomecanica: formValue.tecnomecanica,
                // fechaSoat: formValue.fechaSoat,
                // fechaTecno: formValue.fechaTecno,

            })
        }
        const response = await fetch(url, params);
        const result = await response.json();

        return result

    }catch(error){
        return null
    }
}




export async function getVehiculoApi(auth) {



    try {
        const url = `${API_URL}/api/entradaTransito`
        const params = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },

        };
        const response = await fetch(url, params);
        const result = await response.json();
        console.log("Vehiculos", result)

        return result;
    } catch (error) {
        return null;
    }
}

export async function traerVehiculo(proceso, valor, auth){
    try {
        const url = `${API_URL}/api/buscarVehiculo`;
        const params = {
            method: 'POST',
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                busqueda: proceso,
                valor
            })
        };
        const response = await fetch(url, params);
        const result = await response.json();

        return result;
    } catch (error) {
        return null;
    }
}


export async function getAllVehiculos(auth){
    try {
        const url = `${API_URL}/vehiculo/getAllVehiculos`;
        const params = {
            headers:{
                "Content-Type":"application/json",
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

