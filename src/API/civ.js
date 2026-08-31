import { API_URL } from "utils/constans";

export async function createCiv(formValue, auth) {


    try {
        const url = `${API_URL}/api/civ`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                civ: formValue.civ,
                nombreEjeVia: formValue.nombreEjeVia,
                nombreExtremoInicial: formValue.nombreExtremoInicial,
                nombreExtremoFinal: formValue.nombreExtremoFinal,
                tipoMalla: formValue.tipoMalla,
            })

        };
        const response = await fetch(url, params);
        const result = await response.json();
        console.log("civs", result)
        return result;
    } catch (error) {
        return null;
    }
}


export async function getCivs(auth) {
    try {
        const url = `${API_URL}/api/civ`
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