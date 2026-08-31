import React,{useState, useEffect} from "react";
import useAuth from "hooks/useAuth";
import { getVehiculoApi } from "API/vehiculos";


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


export default function Vehiculos() {
    const [vehiculos, setVehiculos] = useState(null)
    const [ultimoFiltro, setUltimoFiltro] = useState(null)

const {auth} = useAuth()


    useEffect(() => {
        (async () =>{
            const response = await getVehiculoApi(auth)
            setVehiculos(response)

        })()
      }, [])


      const filtrar = query => {


       
        const result = vehiculos?.data.filter(function (lista) {
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
        <Table className="table-hover table-striped">
                <thead>
                    <tr>
                    <th className="border-0">Placa</th>
                    <th className="border-0">Codigo</th>
                    <th className="border-0">No.interno</th>
                    <th className="border-0">Tipo de Vehiculo</th>
                    <th className="border-0">Conductor</th>
                    <th className="border-0">Cedula</th>



                    

                    </tr>
                </thead>
                
                
            {ultimoFiltro?.map((vehiculo) => 
                
                <tbody key={vehiculo.id}>
                    <tr>
                        <td>{vehiculo.attributes.placa}</td>
                        <td>{vehiculo.attributes.codigo}</td>
                        <td>{vehiculo.attributes.noInterno}</td>
                        <td>{vehiculo.attributes.tipoVehiculo}</td>
                        <td>{vehiculo.attributes.conductor}</td>
                        <td>{vehiculo.attributes.cedula}</td>
                    </tr>
                    
                </tbody>
            
            )}
                    
        </Table>

    </div>
        
        
        </>) : (<>
        
        
            <div style={{height:300, overflow:'auto', marginBottom: 10}}>
        <Table className="table-hover table-striped">
                <thead>
                    <tr>
                    <th className="border-0">Placa</th>
                    <th className="border-0">Codigo</th>
                    <th className="border-0">No.interno</th>
                    <th className="border-0">Tipo de Vehiculo</th>
                    <th className="border-0">Conductor</th>
                    <th className="border-0">Cedula</th>



                    

                    </tr>
                </thead>
                
                
            {vehiculos?.data.map((vehiculo) => 
                
                <tbody key={vehiculo.id}>
                    <tr>
                        <td>{vehiculo.attributes.placa}</td>
                        <td>{vehiculo.attributes.codigo}</td>
                        <td>{vehiculo.attributes.noInterno}</td>
                        <td>{vehiculo.attributes.tipoVehiculo}</td>
                        <td>{vehiculo.attributes.conductor}</td>
                        <td>{vehiculo.attributes.cedula}</td>
                    </tr>
                    
                </tbody>
            
            )}
                    
        </Table>

    </div>
        
        </>)}

    


    </>
  )
}
