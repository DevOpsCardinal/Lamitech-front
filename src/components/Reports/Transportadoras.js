import React,{useState, useEffect} from "react";
import useAuth from "hooks/useAuth";
import {getTransportadoraApi} from "API/transportadora";
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


export default function Transportadoras() {
    const [transportadoras, setTransportadoras] = useState(null)
    const [ultimoFiltro, setUltimoFiltro] = useState(null)

const {auth} = useAuth()


    useEffect(() => {
        (async () =>{
            const response = await getTransportadoraApi(auth)
            setTransportadoras(response)

        })()
      }, [])




      const filtrar = query => {


       
        const result = transportadoras?.data.filter(function (lista) {
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
            <Table className="table-hover table-striped" id="transportadoras">
                    <thead>
                        <tr>
                        <th className="border-0">NIT</th>
                        <th className="border-0">Nombre</th>
                        <th className="border-0">Dirección</th>
                        <th className="border-0">Telefono</th>

                        

                        </tr>
                    </thead>
                    
                    
                {ultimoFiltro?.map((transportadora) => 
                    
                    <tbody key={transportadora.id}>
                        <tr>
                        <td>{transportadora.attributes.nit}</td>
                        <td>{transportadora.attributes.nombre}</td>
                        <td>{transportadora.attributes.direccion}</td>
                        <td>{transportadora.attributes.telefono}</td>
                        </tr>
                        
                    </tbody>
                
                )}
                        
            </Table>
        </div>
        

        <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button"
                        table="transportadoras"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Descargar en Excel"/>
    
    
    
    </>) : (<>
    
    
    
    
        <div style={{height:300, overflow:'auto', marginBottom: 10}} >
            <Table className="table-hover table-striped" id="transportadoras">
                    <thead>
                        <tr>
                        <th className="border-0">NIT</th>
                        <th className="border-0">Nombre</th>
                        <th className="border-0">Dirección</th>
                        <th className="border-0">Telefono</th>

                        

                        </tr>
                    </thead>
                    
                    
                {transportadoras?.data.map((transportadora) => 
                    
                    <tbody key={transportadora.id}>
                        <tr>
                        <td>{transportadora.attributes.nit}</td>
                        <td>{transportadora.attributes.nombre}</td>
                        <td>{transportadora.attributes.direccion}</td>
                        <td>{transportadora.attributes.telefono}</td>
                        </tr>
                        
                    </tbody>
                
                )}
                        
            </Table>
        </div>

    
    
        <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button"
                        table="transportadoras"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Descargar en Excel"/>
    
    </>)}
    

        
    </>
  )
}
