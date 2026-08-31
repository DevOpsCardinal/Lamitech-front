import React, { useState } from "react";
import { getEntradasApi } from "./entrada";
import { API_URL } from "utils/constans";
import { deleteTransito } from "./entrada";
import moment from 'moment/moment';
import 'moment/locale/es'






export async function getDespachosByPlacaApi(auth, placa) {
    try {
        const url = `${API_URL}/despacho/getDespachosByPlaca`
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

export async function ultimoDespacho(auth) {
    try {
        const url = `${API_URL}/despacho/ultimoDespacho`
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

export async function countDespachos(auth) {
    try {
        const url = `${API_URL}/despacho/countDespachos`
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



export async function getDespachosSalidaApi(auth) {
    try {
        const url = `${API_URL}/despacho/100despachos`
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



export async function cierreManual(auth, form) {
    try {

        const url = `${API_URL}/api/despachos`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                data: {
                    placa: form.Placa,
                    conductor: form.Conductor,
                    cedula: form.Cedula,
                    producto: "AFTP - TERMINADO",
                    planta: "",
                    cliente: form.Cliente_Proveedor,
                    transportadora: "",
                    bruto: form.Bruto,
                    tara: form.Tara,
                    neto: form.Neto,
                    noTiquete: form.No_Tiquete,
                    operario: form.Operario,
                    nickOperario: form.Nick_Operario,
                    noInterno: "",
                    tipoVehiculo: "",
                    entregadoPor: "",
                    recibidoPor: "",
                    direccion: "",
                    civ: "",
                    idVehiculo: "",
                    tipoProducto: "",
                    idProducto: "",
                    nitCliente: form.NitCliente,
                    metodoPago: form.MetodoPago,
                    observaciones: form.Observaciones,
                    fechaPesoVacio: form.Fecha_peso_vacio,
                    fechaPesoLleno: '1900-01-01',
                    HoraPesoVacio: form.Hora_peso_vacio,
                    HoraPesoLleno: '',
			No_Shipment: form.No_Shipment,
                	No_Sello: form.no_Sello,
                	No_R: form.no_R,
                	No_Contenedor: form.no_Contenedor,
                    tarifa: 12000,
                    repesaje: 0,
                    Operario2: form.Operario2

                }
            })

        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        return null;
    }
}


export async function getDespachosSalidaLimitApi(auth) {
    try {
        const url = `${API_URL}/`
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



export async function createDespachoSalidaApi(auth, formSearch, peso, formValue, procesoRecoger, procesoDescargar) {
    
    console.log("auth", auth);
    console.log("formSearch", formSearch);
    console.log("peso", peso);
    console.log("formValue", formValue);




    const netoCalculado = Number(peso) - Number(formSearch.Tara)
    const bruto = peso
    const tara = formSearch.Tara
        const url = `${API_URL}/despacho/guardarDespacho`
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
                    fechaIngreso: formSearch.Fecha_peso_vacio,
                    horaIngreso: formSearch.Hora_peso_vacio,
                    procesoRecoger,
                    procesoDescargar
            })
        };
        const response = await fetch(url, params);
        const result = await response.json();
        console.log("result",result);
  
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



export async function ultimaSalidaApi(auth, proceso, valor) {
    
    console.log("proceso", proceso);
    console.log("valor", valor);
    



  
        const url = `${API_URL}/despacho/updateUltimaSalida`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                    proceso,
                    valor
            })
        };
        const response = await fetch(url, params);
        const result = await response.json();
        
  
    if (result.error) {
        return null;
    } else {
       
        return result;



    }


}



export async function getDespachosfechaApi(auth, fechaInicial, fechaFinal, proceso, busqueda, valor) {

    console.log("getDespachosfechaApi", fechaInicial, fechaFinal)
    try {
        const url = `${API_URL}/despacho/despachosByDate`
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