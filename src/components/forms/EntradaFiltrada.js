import React from 'react'

import * as Yup from "yup"
import { createDespachoApi } from 'API/despacho';
import { createEntradaApi } from "API/entrada";
import { useFormik } from 'formik';
import { createDespachoSalidaApi } from 'API/despachoSalida';
import { createMateriPrimaSalidaApi } from 'API/materiaPrimaSalida';
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
    OverlayTrigger,
    Tooltip,
    Breadcrumb,
  } from "react-bootstrap";

export default function Despacho(despacho, entrada, peso, formSearch) {

  console.log()

   console.log("formSearchformSearchformSearchformSearchformSearchformSearchformSearch",formSearch)
    const formik = useFormik({
        initialValues: {
         
          tiqueteNum: "",
          placa: "",
          codigo: "",
          numInterno: "",
          tipoVehiculo: "",
          conductor: "",
          cedulaCiudadania: "",
          productoMateria: "",
          tipoProducto: "",
          cantidad: "",
          planta: "",
          clienteProveedor: "",
          transportadora: "",
          fechaPesoVacio: "",
          horaPesoVacio: "",
          fechaPesoLleno: "",
          horaPesoLleno: "",
          destino: "",
          civ: "",
          direccion: "",
          entregadoPor: "",
          recibidoPor: "",
          peso: peso,
        }, 
        validationSchema: Yup.object({
          
          tiqueteNum: Yup.string().required(true),
          placa: Yup.string().required(true),
          codigo: Yup.string().required(true),
          numInterno: Yup.string().required(true),
          tipoVehiculo: Yup.string().required(true),
          conductor: Yup.string().required(true),
          cedulaCiudadania: Yup.string().required(true),
          productoMateria: Yup.string().required(true),
          tipoProducto: Yup.string().required(true),
          cantidad: Yup.string().required(true),
          planta: Yup.string().required(true),
          clienteProveedor: Yup.string().required(true),
          transportadora: Yup.string().required(true),
          fechaPesoVacio: Yup.string().required(true),
          horaPesoVacio: Yup.string().required(true),
          fechaPesoLleno: Yup.string().required(true),
          horaPesoLleno: Yup.string().required(true),
          destino: Yup.string().required(true),
          civ: Yup.string().required(true),
          direccion: Yup.string().required(true),
          entregadoPor: Yup.string().required(true),
          recibidoPor: Yup.string().required(true),
         
        }),
        onSubmit: async (formValue)  => {
         
          if(despacho && entrada){
            const mostrarAlert = ()=>{
              swal({
                  title: 'no puedes tener "Despacho de Producto" y "Entrada de materia" marcados al mismo tiempo',
                  icon: "error",
                  button: "Aceptar",
              })
            }
            mostrarAlert()
            return null;
          }
    
          if(formSearch.attributes.caso == "Despacho"){
            const response = await createDespachoSalidaApi(formValue, auth, peso)
            console.log("response dasboard", response)
            if(response.error) mostrarAlert()
            if(response.data.attributes) mostrarAlertEnvio()
          } else {
            if(despacho && !entrada){
    
              const response = await createMateriPrimaSalidaApi(formValue, auth, peso)
              console.log("response dasboard", response)
              if(response.error) mostrarAlert()
              if(response.data.attributes) mostrarAlertEnvio()
            }
          }
    
          
        }
      })
  return (
    
    <tbody>
    <tr>
      <td>
        
      <Form  onSubmit={formik.handleSubmit}>
      <Col className="pl-1" md="4">
        <Form.Group>
          <label htmlFor="exampleInputEmail1">
            Tiquete Numero
          </label>
          <Form.Control
            name="tiqueteNum"
            placeholder="Tiquete Numero"
            type="text"
            onChange={formik.handleChange}
            disabled={formSearch ? true : false }
            onBlur={formik.handleBlur}
            value={formSearch ? formSearch.atrributes.noTiquete : formik.values.tiqueteNum}
            isInvalid={formik.errors.tiqueteNum}
          ></Form.Control>
        </Form.Group>
      </Col>
    <Row>
      
      <Col className="pr-1" md="3">
        <Form.Group>
          <label>Placa</label>
          <Form.Control
            name="placa"
            placeholder="placa"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formSearch ? true : false }
            value={formSearch ? formSearch.atrributes.placa : formik.values.placa}
            isInvalid={formik.errors.placa}
          ></Form.Control>
        </Form.Group>
      </Col>
      <Col className="px-1" md="3">
        <Form.Group>
          <label>Codigo</label>
          <Form.Control
            name="codigo"
            placeholder="Codigo"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formSearch ? true : false }
            value={formSearch ? formSearch.atrributes.idVehiculo : formik.values.codigo}
            isInvalid={formik.errors.codigo}
          ></Form.Control>
        </Form.Group>
      </Col>
      <Col className="pl-1" md="3">
        <Form.Group>
          <label htmlFor="exampleInputEmail1">
            No.Interno
          </label>
          <Form.Control
            name="numInterno"
            placeholder="No.Interno"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formSearch ? true : false }
            value={formSearch ? formSearch.atrributes.noInterno : formik.values.numInterno}
            isInvalid={formik.errors.numInterno}
          ></Form.Control>
        </Form.Group>
      </Col>
      <Col className="pl-1" md="3">
        <Form.Group>
          <label htmlFor="exampleInputEmail1">
            Tipo Vehiculo
          </label>
          <Form.Control
            name="tipoVehiculo"
            placeholder="Tipo Vehiculo"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formSearch ? true : false }
            value={formSearch ? formSearch.atrributes.tipoVehiculo : formik.values.tipoVehiculo}
            isInvalid={formik.errors.tipoVehiculo}
          ></Form.Control>
        </Form.Group>
      </Col>
    </Row>
    <Row>
      <Col className="pr-1" md="6">
        <Form.Group>
          <label>Conductor</label>
          <Form.Control
            name="conductor"
            placeholder="Conductor"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formSearch ? true : false }
            value={formSearch ? formSearch.atrributes.conductor : formik.values.conductor}
            isInvalid={formik.errors.conductor}
          ></Form.Control>
        </Form.Group>
      </Col>
      <Col className="pr-1" md="6">
        <Form.Group>
          <label>Cedula de Ciudadania</label>
          <Form.Control
            name="cedulaCiudadania"
            placeholder="Cedula de Ciudadania"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formSearch ? true : false }
            value={formSearch ? formSearch.atrributes.cedulaCiudadania : formik.values.cedulaCiudadania}
            isInvalid={formik.errors.cedula}
          ></Form.Control>
        </Form.Group>
      </Col>
    </Row>
    <Row>
      <Col className="pr-1" md="4">
        <Form.Group>
          <label>Producto/Materia Prima</label>
          <Form.Control
            name="productoMateria"
            placeholder="Producto/Materia Prima"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formSearch ? true : false }
            value={formSearch ? formSearch.atrributes.productoMateria : formik.values.productoMateria}
            isInvalid={formik.errors.materiaPrimaProducto}
          ></Form.Control>
        </Form.Group>
      </Col>
      <Col className="pl-1" md="6">
        <Form.Group>
          <label>Tipo de producto</label>
          <Form.Control
            name="tipoProducto"
            placeholder="Tipo de producto"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formSearch ? true : false }
            value={formSearch ? formSearch.atrributes.tipoProducto : formik.values.tipoProducto}
            isInvalid={formik.errors.tipoProducto}
          ></Form.Control>
        </Form.Group>
      </Col>
      <Col className="pl-1" md="2">
        <Form.Group>
          <label>Cantidad</label>
          <Form.Control
            name="cantidad"
            placeholder="Cantidad"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formSearch ? true : false }
            value={formSearch ? formSearch.atrributes.cantidad : formik.values.cantidad}
            isInvalid={formik.errors.cantidad}
          ></Form.Control>
        </Form.Group>
      </Col>
    </Row>
    <Row>
      <Col md="12">
        <Form.Group>
          <label>Planta</label>
          <Form.Control
            name="planta"
            placeholder="Planta"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formSearch ? true : false }
            value={formSearch ? formSearch.atrributes.planta : formik.values.planta}
            isInvalid={formik.errors.planta}
          ></Form.Control>
        </Form.Group>
      </Col>
    </Row>
    <Row>
      <Col md="12">
        <Form.Group>
          <label>Cliente/Proveedor</label>
          <Form.Control
            name="clienteProveedor"
            placeholder="Cliente/Proveedor"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formSearch ? true : false }
            value={formSearch ? formSearch.atrributes.clienteProveedor : formik.values.clienteProveedor}
            isInvalid={formik.errors.clienteProveedor}
          ></Form.Control>
        </Form.Group>
      </Col>
    </Row>

    <Row>
      <Col md="12">
        <Form.Group>
          <label>Transportadora</label>
          <Form.Control
            name="transportadora"
            placeholder="Transportadora"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formSearch ? true : false }
            value={formSearch ? formSearch.atrributes.transportadora : formik.values.transportadora}
            isInvalid={formik.errors.transportadora}
          ></Form.Control>
        </Form.Group>
      </Col>
    </Row>
    <Row>
      <Col className="pr-1" md="5">
        <Form.Group>
          <label>Fecha Peso Vacio</label>
          <Form.Control
            name="fechaPesoVacio"
            placeholder="Fecha Paso Vacio"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={ false }
            value={formSearch.attributes.fechaPesoVacio != "" || null ? formSearch.atrributes.fechaPesoVacio : formik.values.fechaPesoVacio}
            isInvalid={formik.errors.fechaPesoVacio}
          ></Form.Control>
        </Form.Group>
      </Col>
      <Col className="px-1" md="5">
        <Form.Group>
          <label>Hora Peso Vacio</label>
          <Form.Control
            name="horaPesoVacio"
            placeholder="Hora Peso Vacio"
            type="time"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formSearch ? true : false }
            value={formSearch ? formSearch.atrributes.horaPesoVacio : formik.values.horaPesoVacio}
            isInvalid={formik.errors.horaPesoVacio}
          ></Form.Control>
        </Form.Group>
      </Col>
      
    </Row>

    <Row>
      <Col className="pr-1" md="5">
        <Form.Group>
          <label>Fecha Peso LLeno</label>
          <Form.Control
             name="fechaPesoLleno"
             placeholder="Fecha Peso LLeno"
             type="date"
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             disabled={false}
             value={formSearch.attributes.fechaPesoLleno != "" || null  ? formSearch.atrributes.fechaPesoLleno : formik.values.fechaPesoLleno}
             isInvalid={formik.errors.fechaPesoLleno}
          ></Form.Control>
        </Form.Group>
      </Col>
      <Col className="px-1" md="5">
        <Form.Group>
          <label>Hora Peso Lleno</label>
          <Form.Control
            name="horaPesoLleno"
            placeholder="Hora Peso Lleno"
            type="time"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formSearch ? true : false }
             value={formSearch ? formSearch.atrributes.horaPesoLleno : formik.values.horaPesoLleno}
            isInvalid={formik.errors.horaPesoLleno}
          ></Form.Control>
        </Form.Group>
      </Col>
    </Row>
    <Row>
        <Col className="pr-1" md="3s">
          <Form.Group>
            <label>Destino</label>
            <Form.Control
              name="destino"
              placeholder="Destino"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formSearch ? true : false }
              value={formSearch ? formSearch.atrributes.origenDestino : formik.values.destino}
              isInvalid={formik.errors.destino}
            ></Form.Control>
          </Form.Group>
        </Col>
    </Row>
    <Row>
        <Col className="pr-1" md="3s">
          <Form.Group>
            <label>CIV</label>
            <Form.Control
              name="civ"
              placeholder="civ"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formSearch ? true : false }
              value={formSearch ? formSearch.atrributes.civ : formik.values.civ}
              isInvalid={formik.errors.civ}
            ></Form.Control>
          </Form.Group>
        </Col>
    </Row>
    <Row>
        <Col className="pr-1" md="3s">
          <Form.Group>
            <label>Dirección</label>
            <Form.Control
             name="direccion"
             placeholder="Dirección"
             type="text"
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             disabled={formSearch ? true : false }
             value={formSearch ? formSearch.atrributes.direccion : formik.values.direccion}
             isInvalid={formik.errors.direccion}
            ></Form.Control>
          </Form.Group>
        </Col>
    </Row>
    <Row>
        <Col className="pr-1" md="5">
          <Form.Group>
            <label>Entregado por</label>
            <Form.Control
              name="entregadoPor"
              placeholder="Entregado por"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formSearch ? true : false }
              value={formSearch ? formSearch.atrributes.entregadoPor : formik.values.entregadoPor}
              isInvalid={formik.errors.entregadoPor}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col className="pr-1" md="5">
          <Form.Group>
            <label>Recibido por</label>
            <Form.Control
              name="recibidoPor"
              placeholder="Recibido por"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formSearch ? true : false }
              value={formSearch ? formSearch.atrributes.recibidoPor : formik.values.recibidoPor}
              isInvalid={formik.errors.recibidoPor}
            ></Form.Control>
          </Form.Group>
        </Col>
    </Row>
    <Button type="submit" style={{marginTop: '5vh' ,backgroundColor: '#000', marginLeft: '4vh'}} variant="info">
      Poner en Transito
    </Button>
    
    {/* <Row>
      <Col md="12">
        <Form.Group>
          <label>About Me</label>
          <Form.Control
            cols="80"
            defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
            that two seat Lambo."
            placeholder="Here can be your description"
            rows="4"
            as="textarea"
          ></Form.Control>
        </Form.Group>
      </Col>
    </Row> */}

    

    <Button
      className="btn-fill pull-right"
      type="submit"
      variant="info"
      style={{marginTop: '5vh' ,backgroundColor: '#000', marginLeft: '4vh'}}
    >
      Despachar 
    </Button>

    <Button
      className="btn-fill pull-right"
      
      variant="info"
      style={{marginTop: '5vh' ,backgroundColor: '#000', marginLeft: '4vh'}}
    >
      Guardar 
    </Button>
    
  </Form>
      </td>
    </tr>
  </tbody>
  )
}
