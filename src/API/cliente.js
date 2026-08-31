import { API_URL } from "utils/constans";


export async function updateClienteApi(formValue, auth, busqueda) {
    try {
        const url = `${API_URL}/cliente/updateCliente`
        const params = {
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
        };
        const response = await fetch(url, params);
        const result = await response.json();
        console.log("clienteclienteclienteclienteclienteclientecliente", result)
        return result;
    } catch (error) {
        return null;
    }
}



export async function traerCliente(proceso, valor, auth) {
    try {
        const url = `${API_URL}/cliente/getOneCliente`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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

export async function crearClienteApi(formValue, auth) {
    try {
        const url = `${API_URL}/cliente/createCliente`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                nombre: formValue.nombre,
                nit: formValue.nit,
                direccion: formValue.direccion,
                telefono: formValue.telefono,
                observaciones: formValue.observaciones,
            })
        };
        console.log(url);//revisar url
        console.log(params);
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        return null;
    }
}


export async function getClienteApi(auth) {
    try {
        const url = `${API_URL}/cliente/getClientes`
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