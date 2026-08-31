import React,{useState, useEffect} from "react";
import useAuth from "hooks/useAuth";
import { getMateriaPrimaApi } from "API/materiaPrima";
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


export default function MateriasPrimas() {
    const [materiasPrimas, setMateriasPrimas] = useState(null)
    const [ultimoFiltro, setUltimoFiltro] = useState(null)

const {auth} = useAuth()


    useEffect(() => {
        (async () =>{
            const response = await getMateriaPrimaApi(auth)
            setMateriasPrimas(response)

        })()
      }, [])


      const filtrar = query => {


       
        const result = materiasPrimas?.data.filter(function (lista) {
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

            <Table className="table-hover table-striped" id="materiasPrimas">
                    <thead>
                        <tr>
                            <th className="border-0">Codigo</th>
                            <th className="border-0">nombre</th>
                        </tr>
                    </thead>
                    
                    
                {ultimoFiltro?.map((materia) => 
                    
                    <tbody key={materia.id}>
                        <tr>
                        <td>{materia.attributes.codigo}</td>
                        <td>{materia.attributes.nombre}</td>
                        </tr>
                        
                    </tbody>
                
                )}
                        
            </Table>
            </div>

            <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button"
                        table="materiasPrimas"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Descargar en Excel"/>
        
        
        
        
        
        </>) : (<>
        
        
        
            <div style={{height:300, overflow:'auto', marginBottom: 10}}>

            <Table className="table-hover table-striped" id="materiasPrimas">
                    <thead>
                        <tr>
                            <th className="border-0">Codigo</th>
                            <th className="border-0">nombre</th>
                        </tr>
                    </thead>
                    
                    
                {materiasPrimas?.data.map((materia) => 
                    
                    <tbody key={materia.id}>
                        <tr>
                        <td>{materia.attributes.codigo}</td>
                        <td>{materia.attributes.nombre}</td>
                        </tr>
                        
                    </tbody>
                
                )}
                        
            </Table>
            </div>

        
            <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button"
                        table="materiasPrimas"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Descargar en Excel"/>
        
        
        </>)}

    
    </>
  )
}
