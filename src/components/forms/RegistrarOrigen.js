import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup"
import { createOrigenApi } from 'API/origen';
import swal from 'sweetalert';
import useAuth from 'hooks/useAuth';

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
  Dropdown,
  DropdownButton
} from "react-bootstrap";

export default function RegistrarOrigen() {

  const { auth } = useAuth();


  const formik = useFormik({
    initialValues: {
      codigo: "",
      nombre: "",
      detalles: "",
      
    },
    validationSchema: Yup.object({
      codigo: Yup.string().required(true),
      nombre: Yup.string().required(true),
    
      detalles: Yup.string(),
    }),
    onSubmit: async (formValue) => {
      const response = await createOrigenApi(formValue, auth)
      console.log(response)

      if (response.error) {
        const mostrarAlert = () => {
          swal({
            title: "Los datos enviados son incorrectos, es probable que ya existan en la base de datos",
            icon: "error",
            button: "Aceptar",
            timer: "3000"
          })
        }
        mostrarAlert()
      }

      if (response.result.rowsAffected) {
        const mostrarAlert = () => {
          swal({
            title: "Los datos fueron enviados correctamentes",
            text: "Los datos enviados son incorrectos",
            icon: "success",
            button: "Aceptar",
            timer: "3000"
          })
        }
        mostrarAlert()
      }
      formik.resetForm()
    }
  })
  return (
    <tbody  >
      <tr >
        <td>
          {/* onSubmit={formik.handleSubmit} */}
          <Form onSubmit={formik.handleSubmit}>
            <h4 style={{ color: '#fff' }}>Registrar Origen</h4>
            <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

              <Col className="pr-1" md="5">
                <Form.Group>
                  <label style={{ color: '#fff' }}>Codigo</label>
                  <Form.Control
                    name="codigo"
                    placeholder="codigo"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.codigo}
                    isInvalid={formik.errors.codigo}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col className="px-1" md="5">
                <Form.Group>
                  <label style={{ color: '#fff' }}>Nombre</label>
                  <Form.Control
                    name="nombre"
                    placeholder="nombre"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nombre}
                    isInvalid={formik.errors.nombre}
                  ></Form.Control>
                </Form.Group>
              </Col>


              <Col style={{ marginTop: 10 }} className="pl-1" md="5">
                <Form.Group>
                  <label style={{ color: '#fff' }}>Detalles</label>
                  <Form.Control
                    name="detalles"
                    placeholder="Detalles"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.detalles}
                    isInvalid={formik.errors.detalles}
                  ></Form.Control>
                </Form.Group>
              </Col>

              
            </Row>


            <Button type="submit" style={{ marginTop: '5vh', backgroundColor: '#fff', marginLeft: '4vh', color: '#000', border: 'none', borderRadius: 10 }} variant="info">
                            Guardar
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







          </Form>
        </td>
      </tr>
    </tbody>
  )
}
