import { API_URL } from "utils/constans";

export async function getPeso(){
    try {
        const url =`${API_URL}/api/pesos/13734`
        const params = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        return null;
    }
}
