import React,{useState, useEffect} from "react";
import useAuth from "hooks/useAuth";
import { getClienteApi } from "API/cliente";
import { getAllUsers } from "API/users";

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
  Form
} from "react-bootstrap";


export default function EditUsers() {
    const [users, setUsers] = useState(null)


const {auth} = useAuth()


    useEffect(() => {
        (async () =>{
            const response = await getAllUsers(auth)
            console.log("getAllUsersgetAllUsersgetAllUsersgetAllUsersgetAllUsers",response)

        })()
      }, [])



     


  return (

    <>
        
    <div style={{height:300, overflow:'auto', marginBottom: 10}}>
        <Table className="table-hover table-striped" id="clientes">
                <thead>
                    <tr>
                    <th className="border-0">NIT</th>
                    <th className="border-0">Nombre</th>
                    <th className="border-0">Dirección</th>
                    <th className="border-0">Telefono</th>

                    

                    </tr>
                </thead>
                
                
            {users?.data.map((cliente) => 
                
                <tbody key={cliente.id}>
                    <tr>
                    <td>{cliente.attributes.nit}</td>
                    <td>{cliente.attributes.nombre}</td>
                    <td>{cliente.attributes.direccion}</td>
                    <td>{cliente.attributes.telefono}</td>
                    </tr>
                    
                </tbody>
            
            )}
                    
        </Table>
    </div>

    

    </>
  )
}
