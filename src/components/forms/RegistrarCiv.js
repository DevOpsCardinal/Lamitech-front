import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup"
import { createConductorApi } from 'API/conductores';
import { crearTransportadoraApi } from 'API/transportadora';
import swal from 'sweetalert';
import useAuth from 'hooks/useAuth';
import { createCiv } from 'API/civ';

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
            civ: "",
            nombreEjeVia: "",
            nombreExtremoInicial: "",
            nombreExtremoFinal: "",
            tipoMalla: "",
        },
        validationSchema: Yup.object({
            civ: Yup.string(),
            nombreEjeVia: Yup.string(),
            nombreExtremoInicial: Yup.string(),
            nombreExtremoFinal: Yup.string(),
            tipoMalla: Yup.string(),
        }),
        onSubmit: async (formValue) => {



            const response = await createCiv(formValue, auth)
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
                    <Form style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center' }} onSubmit={formik.handleSubmit}>
                        <h4 style={{ color: 'white' }}>Registrar Civ</h4>
                        <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

                            <Col className="pr-1" md="5">
                                <Form.Group>
                                    <label style={{ color: 'white' }}>CIV</label>
                                    <Form.Control
                                        name="civ"
                                        placeholder="nit"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.civ}
                                        isInvalid={formik.errors.civ}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col className="px-1" md="5">
                                <Form.Group>
                                    <label style={{ color: 'white' }}>Nombre Eje Via</label>
                                    <Form.Control
                                        name="nombreEjeVia"
                                        placeholder="Nombre Eje Via"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.nombreEjeVia}
                                        isInvalid={formik.errors.nombreEjeVia}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                            <Col className="pl-1" md="5">
                                <Form.Group>
                                    <label style={{ color: 'white' }} htmlFor="exampleInputEmail1">
                                        Nombre Extremo Inicial
                                    </label>
                                    <Form.Control
                                        name="nombreExtremoInicial"
                                        placeholder="direccion"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.nombreExtremoInicial}
                                        isInvalid={formik.errors.nombreExtremoInicial}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col className="pl-1" md="5">
                                <Form.Group>
                                    <label style={{ color: 'white' }} htmlFor="exampleInputEmail1">
                                        Nombre Extremo Final
                                    </label>
                                    <Form.Control
                                        name="nombreExtremoFinal"
                                        placeholder="telefono"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.nombreExtremoFinal}
                                        isInvalid={formik.errors.nombreExtremoFinal}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>

                        </Row>
                        <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                            <Col className="pl-1" md="5">
                                <Form.Group>
                                    <label style={{ color: 'white' }} htmlFor="exampleInputEmail1">
                                        Tipo Malla
                                    </label>
                                    <Form.Control
                                        name="tipoMalla"
                                        placeholder="telefono"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.tipoMalla}
                                        isInvalid={formik.errors.tipoMalla}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>

                        </Row>

                        <Button type="submit" style={{ marginTop: '5vh', backgroundColor: '#fff', marginLeft: '4vh', color: 'black', border: 'none', borderRadius: 10 }} variant="info">
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
