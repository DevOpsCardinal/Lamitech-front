import { API_URL } from "utils/constans";
import { deleteTransito } from "./entrada";



export async function getIngresosByPlacaApi(auth, placa) {
    try {
        const url = `${API_URL}/ingreso/getIngresosByPlaca`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                placa
            })

        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        return null;
    }
}
export async function getMateriafechaApi(auth, fechaInicial, fechaFinal, proceso, busqueda, valor) {

    console.log(fechaInicial, fechaFinal)
    try {
        const url = `${API_URL}/ingreso/ingresosByDate`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                fechaInicial,
                fechaFinal,
                proceso,
                busqueda,
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

export async function getMateriPrimaSalidaLimitApi(auth) {
    try {
        const url = `${API_URL}/api/entradamaterias?pagination[limit]=10&sort=id:desc`
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

export async function countMateria(auth) {
    try {
        const url = `${API_URL}/api/conteoEntradaMaterias`
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





export async function getMateriPrimaSalidaApi(auth) {
    try {
        const url = `${API_URL}/ingreso/100ingresos`
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


export async function createMateriPrimaSalidaApi(auth, formSearch, peso, formValue,  procesoRecoger, procesoDescargar) {
    
    const netoCalculado = Number(formSearch.Bruto) - Number(peso)
    const bruto = formSearch.Bruto
    let tara = peso     
    const url = `${API_URL}/ingreso/guardarIngreso`
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`
        },
        body: JSON.stringify({
                    formValue,
                    bruto: `${bruto}`,
                    tara: tara,
                    neto: `${Number(netoCalculado) }`,
                    operario: auth.nombre,
                    nickOperario: auth.nick,
                    fechaIngreso: formSearch.Fecha_peso_lleno,
                    horaIngreso: formSearch.Hora_peso_lleno,
                    procesoRecoger,
                    procesoDescargar
        })

    };
    const response = await fetch(url, params); 
    const result = await response.json();
  
    if (result.error) {
        return null;
    } else {
        const response = await deleteTransito(auth, formValue.placa, formSearch.No_Shipment)
        if (response == null) {
            return null;
        }
        console.log("delete Transito", result)
        return result;
    }

}



export async function getUltimoIngreso(auth) {
    try {
        const url = `${API_URL}/ingreso/ultimoIngreso`
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


