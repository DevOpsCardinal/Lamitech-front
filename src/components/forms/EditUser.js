import React, { useState, useEffect } from "react";
import useAuth from "hooks/useAuth";
import { getClienteApi } from "API/cliente";
import { getAllUsers } from "API/users";
import RegistroUsuario from "./RegistroUsuario";

// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Table,
    Container,
    Row,
    Col,
    Form,
} from "react-bootstrap";


export default function EditUser({ estado }) {

    const [users, setUsers] = useState(null)
    const [form, setForm] = useState(null)


    const { auth } = useAuth()


    useEffect(() => {
        (async () => {
            const response = await getAllUsers(auth)
            console.log("Usuarios", response)
            setUsers(response)
        })()
    }, [])



    const editar = (user) => {



        setForm(user)
    }


    return (

        <>
          {form ? (<>


            <button type="button" onClick={() => setForm(null)}>X</button>

            <RegistroUsuario user={form} estado={estado} />


            </>) : (<>

            <div style={{ height: 300, overflow: 'auto', marginBottom: 10 }}>
                <Table className="table-hover table-striped" id="clientes">
                    <thead>
                        <tr>
                            <th className="border-0" style={{ color: '#fff' }}>Editar</th>
                            <th className="border-0" style={{ color: '#fff' }}>Cedula</th>
                            <th className="border-0" style={{ color: '#fff' }}>Nombre</th>
                            <th className="border-0" style={{ color: '#fff' }}>Apellido</th>
                            <th className="border-0" style={{ color: '#fff' }}>Tipo</th>
                            <th className="border-0" style={{ color: '#fff' }}>Estado</th>

                        </tr>
                    </thead>


                    {users?.map((user) =>



                        <tbody key={user.id} style={{ backgroundColor: '#fff' }}>
                            <tr>
                                <td>
                                    <button type="button" onClick={() => editar(user)}>Editar</button>
                                </td>
                                <td>{user.Cedula}</td>
                                <td>{user.Nombre}</td>
                                <td>{user.Apellido}</td>
                                <td>{user.rango === 100 ? "Administrador" : "Usuario"}</td>
                                <td style={{ color: user.estado === "true" ? "#3ADF00" : "#DF013A" }}>{user.estado === "true" ? "Activo" : "Inactivo"}</td>


                            </tr>

                        </tbody>

                    )}

                </Table>
            </div>


      




            </>)}
        </>
    
    )
}
