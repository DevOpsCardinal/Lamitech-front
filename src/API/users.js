import { API_URL } from "utils/constans";

export async function registerApi(formData, auth, rol) {

    try {

        const url = `${API_URL}/users/registerUser`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                cedula: formData.cedula,
                apellido: formData.apellido,
                username: formData.username,
                nombre: formData.nombre,
                password: formData.password,
                rango: rol,
                estado: true
            })
        };

        const response = await fetch(url, params)
        const result = await response.json();
        return result;



    } catch (error) {

        console.log(error);
        return null;

    }

}







export async function updateUserApi(auth, formValue, rol, id, activarUser) {


    console.log("(auth, formValue, rol, id )", formValue, rol, id, activarUser)
    try {
        let params
        const url = `${API_URL}/users/updateUser`
        if (formValue.password !== "" && activarUser !== null) {
            params = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`
                },
                body: JSON.stringify({
                    id: id,
                    cedula: `${formValue.cedula}`,
                    username: `${formValue.username}`,
                    nombre: `${formValue.nombre}`,
                    apellido: `${formValue.apellido}`,
                    rango: `${rol}`,
                    password: formValue.password,
                    estado: activarUser
                })
            }
        } else if (formValue.password !== "" && activarUser === null) {
            params = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`
                },
                body: JSON.stringify({
                    id: id,
                    cedula: `${formValue.cedula}`,
                    username: `${formValue.username}`,
                    nombre: `${formValue.nombre}`,
                    apellido: `${formValue.apellido}`,
                    rango: `${rol}`,
                    password: formValue.password,
                })
            }
        } else if (formValue.password == "" && activarUser !== null) {
            params = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`
                },
                body: JSON.stringify({
                    id: id,
                    cedula: `${formValue.cedula}`,
                    username: `${formValue.username}`,
                    nombre: `${formValue.nombre}`,
                    apellido: `${formValue.apellido}`,
                    rango: `${rol}`,
                    estado: activarUser
                })
            }
        } else {
            return { error: "Error" }
        }
        const response = await fetch(url, params);
        const result = await response.json();
        console.log("resultresultresultresultresultresultresultresultresultresultresultresultresult", result)
        return result;
    } catch (error) {
        console.log(error)
        return null;
    }
}


export async function getAllUsers(auth) {
    try {
        const url = `${API_URL}/users/getUsers`
        const params = {

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },

        }
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
        return null;
    }
}




export async function loginApi(email, password) {

    try {
        const url =  `${API_URL}/auth/login`
        const params = {

            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        };
        const response = await fetch(url, params)
        const result = await response.json();

        return result;

    } catch (error) {

        console.log(error)
        return null;

    }
}