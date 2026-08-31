
import { API_URL } from "utils/constans";

export async function cambiarTrama(auth, trama) {


    try {
        const url = `${API_URL}/config/cambiarTrama`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                trama
            })

        };
        const response = await fetch(url, params);
        const result = await response.json();

        return result;
    } catch (error) {
        return null;
    }
}


export async function getTrama(auth) {

    const url = `${API_URL}/config/trama`
    const params = {

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`
        },

    };
    const response = await fetch(url, params);
    const result = await response.json();

    return result;

}



export async function getCom(auth) {

    const url = `${API_URL}/api/com`
    const params = {

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`
        },

    };
    const response = await fetch(url, params);
    const result = await response.json();

    return result;

}


export async function cambiarCom(auth, com, basculas) {
    try {
        const url = `${API_URL}/config/cambiarComs`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                com,
                basculas
            })
        };
        const response = await fetch(url, params);
        const result = await response.json();

        return result;
    } catch (error) {
        return null;
    }
}

export async function getDisplay(auth) {

    const url = `${API_URL}/api/display`
    const params = {

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`
        },

    };
    const response = await fetch(url, params);
    const result = await response.json();

    return result;

}

export async function cambiarIpDisplay(auth, display) {

    console.log("Enviar", display)

    const url = `${API_URL}/api/display`
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`
        },
        body: JSON.stringify({
            display
        })
    };
    const response = await fetch(url, params);
    const result = await response.json();

    return result;

}

export async function getRecibo(auth) {
    const url = `${API_URL}/config/recibo`
    const params = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`
        },

    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
}



export async function cambiarLogo(auth, formValue, archivo) {

    const formData = new FormData();
    formData.append('archivo', archivo);

    const url = `${API_URL}/archivos/upload`
    const params = {
        method: "POST",
        headers: {

            Authorization: `Bearer ${auth.token}`
        },
        body: formData
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;


}


export async function cambiarRecibo(auth, formValue) {

    
    const url = `${API_URL}/config/recibo`
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`
        },
        body: JSON.stringify({
            empresa: formValue.empresa,
            departamento: formValue.departamento,
            direccion: formValue.direccion,
            telefono: formValue.telefono,
            campo1: formValue.campo1,
            campo2: formValue.campo2,
        })
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;


}


export async function getBasculas(auth) {
    const url = `${API_URL}/config/basculas`
    const params = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`
        },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;

}

export async function tokenLimite() {

    const url = `${API_URL}/auth/token`
    const params = {

        headers: {
            "Content-Type": "application/json"
        },

    };
    const response = await fetch(url, params);
    const result = await response.json();

    return result;

}
