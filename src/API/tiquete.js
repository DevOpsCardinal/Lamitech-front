
import { API_URL } from "utils/constans";



export const buscarTiquete = async(proceso, valor, auth) =>{
    try {
      const url = `${API_URL}/tiquete/traerTiquete`;
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
      console.log('[buscarTiquete 48]'+result);
      
      return result;
    } catch (error) {
      console.log('[buscarTiquete 52]'+error.message);
      return null;
    }
  }

  export const updateTiquete = async(formValue, auth, busqueda) =>{
    try {
      const url = `${API_URL}/tiquete/updateTiquete`
      const params = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`
        },
        body: JSON.stringify({
          busqueda,
          formValue
  
        })
      
      }
    
      const response = await fetch(url, params)
      const result = await response.json();
      return result
    } catch (error) {
      console.log('[updateTransportadoraApi]'+ error.message);
      return null
    }
  }