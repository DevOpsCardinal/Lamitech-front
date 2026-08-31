import { API_URL } from "utils/constans";


export const updateTransportadora = async(formValue, auth, busqueda) =>{
  try {
    const url = `${API_URL}/transport/updateTransportadora`
    const params = {
      method: 'PUT',
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
    console.log('[UpdateTransportadora]'+JSON.stringify(params.body));
    console.log('[UpdateTransportadoraaaaaaaaaaa]'+JSON.stringify(busqueda[0]));
    const response = await fetch(url, params)
    const result = await response.json();
    return result
  } catch (error) {
    console.log('[updateTransportadoraApi]'+ error.message);
    return null
  }
}

export const traerTransportadora = async(proceso, valor, auth) =>{
  try {
    const url = `${API_URL}/transport/getOneTransportadora`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        busqueda: proceso,
        valor,
      }),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    console.log('[TraerTransportadora 48]'+result);
    return result;
  } catch (error) {
    console.log('[TraerTransportadora 52]'+error.message);
    return null;
  }
}


export async function crearTransportadoraApi(formValue, auth) {
  try {
    const url = `${API_URL}/transport/createTransportadora`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        nombre: formValue.nombre,
        nit: formValue.nit,
        direccion: formValue.direccion,
        telefono: formValue.telefono,
        observaciones: formValue.observaciones,
      }),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

export async function getTransportadoraApi(auth) {
  try {
    const url = `${API_URL}/transport/getTransportadoras`;
    const params = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}
