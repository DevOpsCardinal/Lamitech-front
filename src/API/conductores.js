
import { API_URL } from "utils/constans";


export async function updateConductorApi(formValue, auth, estadoConduc, busqueda) {
    try {
        const url = `${API_URL}/conduc/updateConductor`
        const params = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                cedula: busqueda[0].Cedula,
                nombre: formValue.nombreCom,
                estado: estadoConduc,
            })
        };
        const response = await fetch(url, params);
        const result = await response.json();

        return result;
    } catch (error) {
        return null;
    }
}


export async function traerConductor(proceso, valor, auth) {
    try {
        const url = `${API_URL}/conduc/getOneConductor`
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

export async function createConductorApi(formValue, auth, estadoConduc) {
    try {
        const url = `${API_URL}/conduc/createConductor`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                cedula: formValue.cedula,
                nombre: formValue.nombreCom,
                estado: estadoConduc,
            })
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        return null;
    }
}


export async function getConductoresApi(auth) {
    try {
        const url = `${API_URL}/conduc/getConductores`
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