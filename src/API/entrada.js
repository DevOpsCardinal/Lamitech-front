import { API_URL } from "utils/constans";

export async function countTransito(auth) {
    try {
        const url = `${API_URL}/api/conteoTransito`
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


export async function ultimoTransito(auth, caso) {
    try {
        const url = `${API_URL}/transito/ultimoTransito`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                caso
            })

        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        return null;
    } 
}




export async function ultimoTransitoByPlaca(auth, placa) {
    try {
        const url = `${API_URL}/transito/ultimoTransitoByPlaca`
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



export async function createEntradaApi(formValue, auth, pesoNumEnv, checkDespacho, checkEntrada, procesoRecoger, procesoDescargar) {
    console.log("createEntradaApi", formValue);
    const caso = checkDespacho ? "Despacho" : "Ingreso"
  
        const url = `${API_URL}/transito/guardarTransito`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                    formValue,
                    bruto: caso=='Despacho'? 0: pesoNumEnv,
                    tara: caso=='Despacho'? pesoNumEnv: 0,
                    neto: "0",
                    operario: auth.nombre,
                    nickOperario: auth.nick,
                    caso,
                    procesoRecoger,
                    procesoDescargar
            })
        };
        const response = await fetch(url, params);
        console.log("resultresultresultresultresultresultresultresultresult", response)
        const result = await response.json();
        return result;
   
}


export async function getEntradasApi(auth) {
    try {
        const url = `${API_URL}/transito/geAllTransito`
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


export async function getEntradasProductoApi(auth) {
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
        return result;
    } catch (error) {
        return null;
    }
}

export async function getCountEntradas(auth) {
    try {
        const url = `${API_URL}/api/contarTransito`
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



export async function getEntradasMateriaApi(auth) {
    try {
        const url = `${API_URL}/api/entradas`
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


export async function getEntradasPorFechaApi(auth, fechaInicial, fechaFinal) {
    try {
        const url = `${API_URL}/api/entradas?&[filters][createdAt][$gt]=${fechaInicial}&[filters][createdAt][$lt]=${fechaFinal}`
        const params = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },

        };
        const response = await fetch(url, params);
        const result = await response.json();
        console.log(result)

    } catch (error) {
        return null;
    }
}


export async function deleteTransito(auth, id, iden) {
    try {
        const url = `${API_URL}/transito/borrarTransito`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                id,
                iden
            })

        };
        
        const response = await fetch(url, params);
        const result = await response.json();
        console.log(result)
        return result;
    } catch (error) {
        return null;
    }
}