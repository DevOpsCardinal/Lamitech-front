import { API_URL } from "utils/constans";


export async function getTrailersfechaApi(auth, fechaInicial, fechaFinal) {

    console.log("getDespachosfechaApi", fechaInicial, fechaFinal)
    try {
        const url = `${API_URL}/trailer/getTrailersfechaApi`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                fechaInicial,
                fechaFinal,
            })
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        return null;
    }
}


export async function get100Trailers(auth) {
    try {
        const url = `${API_URL}/trailer/get100Trailers`
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

export async function getTrailer(auth, trailer) {
    try {
        const url = `${API_URL}/trailer/getTrailer`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
               trailer
            })
        };
        const response = await fetch(url, params);
        const result = await response.json();

        return result;
    } catch (error) {
        return null;
    }
}


export async function getTrailer2(auth, trailer, placa, proceso, fecha) {
    try {
        const url = `${API_URL}/trailer/getTrailer2`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
               trailer,
                placa,
                proceso,
                fecha
            })
        };
        const response = await fetch(url, params);
        const result = await response.json();

        return result;
    } catch (error) {
        return null;
    }
}