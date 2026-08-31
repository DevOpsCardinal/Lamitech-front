import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup"
import { createConductorApi } from 'API/conductores';
import { crearTransportadoraApi } from 'API/transportadora';
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

export default function RegistrarTransportadora() {

  const { auth } = useAuth();


  const formik = useFormik({
    initialValues: {

      nit: "",
      nombre: "",
      direccion: "",
      telefono: "",
      observaciones: "",


    },
    validationSchema: Yup.object({

      nombre: Yup.string().required(true),
      nit: Yup.string(),
      direccion: Yup.string(),
      telefono: Yup.string(),
      observaciones: Yup.string()

    }),
    onSubmit: async (formValue) => {



      const response = await crearTransportadoraApi(formValue, auth)
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
            <h4 style={{ color: '#fff' }}>Registrar Transportadora</h4>
            <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

              <Col className="pr-1" md="5">
                <Form.Group>
                  <label style={{ color: '#fff' }}>NIT</label>
                  <Form.Control
                    name="nit"
                    placeholder="nit"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nit}
                    isInvalid={formik.errors.nit}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col className="pl-1" md="5">
                <Form.Group>
                  <label style={{ color: '#fff' }}>Nombre</label>
                  <Form.Control
                    name="nombre"
                    placeholder="Nombre"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nombre}
                    isInvalid={formik.errors.nombre}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
              <Col className="pl-1" md="5">
                <Form.Group>
                  <label style={{ color: '#fff' }} htmlFor="exampleInputEmail1">
                    Dirección
                  </label>
                  <Form.Control
                    name="direccion"
                    placeholder="Dirección"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.direccion}
                    isInvalid={formik.errors.direccion}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col className="pl-1" md="5">
                <Form.Group>
                  <label style={{ color: '#fff' }} htmlFor="exampleInputEmail1">
                    telefono
                  </label>
                  <Form.Control
                    name="telefono"
                    placeholder="Telefono"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.telefono}
                    isInvalid={formik.errors.telefono}
                  ></Form.Control>
                </Form.Group>
              </Col>

            </Row>
            <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
              <Col className="pl-1" md="5">
                <Form.Group>
                  <label style={{ color: '#fff' }} htmlFor="exampleInputEmail1">
                    Observaciones
                  </label>
                  <Form.Control
                    name="observaciones"
                    placeholder="Observaciones"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.observaciones}
                    isInvalid={formik.errors.observaciones}
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
