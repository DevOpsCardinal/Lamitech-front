import React,{useState, useEffect} from "react";
import useAuth from "hooks/useAuth";
import { getConductoresApi } from "API/conductores";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


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


export default function Conductores() {
    const [conductores, setConductores] = useState(null)
    const [ultimoFiltro, setUltimoFiltro] = useState(null)

const {auth} = useAuth()


    useEffect(() => {
        (async () =>{
            const response = await getConductoresApi(auth)
            setConductores(response)

        })()
      }, [])



      const filtrar = query => {


       
        const result = conductores?.data.filter(function (lista) {
          return lista?.attributes.nombre.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
        })
        setUltimoFiltro(result)
      
  
      
    }


  return (

    <>
    
    <Col className="pl-1" md="4" style={{ marginBottom: 10}}>
      <Form.Group>
        <label htmlFor="exampleInputEmail1">
          Filtro por Nombre
        </label>
        <Form.Control
          name="fechaFinal"
          placeholder="Filtro por Nombre"
          type="text"
          onChange={(e) => filtrar(e.target.value)}
         
        ></Form.Control>
      </Form.Group>
    </Col>
    
    
    

    {ultimoFiltro ? (<>
    
    
    
        <div style={{height:300, overflow:'auto', marginBottom: 10}}>
        <Table className="table-hover table-striped" id="conductores">
                <thead>
                    <tr>
                        <th className="border-0">cedula</th>
                        <th className="border-0">nombre</th>
                        <th className="border-0">estado</th>
                    </tr>
                </thead>
                
                
            {ultimoFiltro?.map((conductor) => 
                
                <tbody key={conductor.id}>
                    <tr>
                    <td>{conductor.attributes.cedula}</td>
                    <td>{conductor.attributes.nombre}</td>
                    <td style={{ color: conductor.attributes.estado === true ? "#3ADF00": "#DF013A"}}>{conductor.attributes.estado === true ? "Activo": "Inactivo"}</td>
                    </tr>
                    
                </tbody>
            
            )}
                    
        </Table>
    </div>

    <ReactHTMLTableToExcel
                       id="test-table-xls-button"
                       className="download-table-xls-button"
                       table="conductores"
                       filename="tablexls"
                       sheet="tablexls"
                       buttonText="Descargar en Excel"/>
    
    
    
    
    
    </>) : (<>
    
    
        <div style={{height:300, overflow:'auto', marginBottom: 10}}>
        <Table className="table-hover table-striped" id="conductores">
                <thead>
                    <tr>
                        <th className="border-0">cedula</th>
                        <th className="border-0">nombre</th>
                        <th className="border-0">estado</th>
                    </tr>
                </thead>
                
                
            {conductores?.data.map((conductor) => 
                
                <tbody key={conductor.id}>
                    <tr>
                    <td>{conductor.attributes.cedula}</td>
                    <td>{conductor.attributes.nombre}</td>
                    <td style={{ color: conductor.attributes.estado === true ? "#3ADF00": "#DF013A"}}>{conductor.attributes.estado === true ? "Activo": "Inactivo"}</td>
                    </tr>
                    
                </tbody>
            
            )}
                    
        </Table>
    </div>

    <ReactHTMLTableToExcel
                       id="test-table-xls-button"
                       className="download-table-xls-button"
                       table="conductores"
                       filename="tablexls"
                       sheet="tablexls"
                       buttonText="Descargar en Excel"/>
    
    
    
    </>)}
    

    

    </>
  )
}
