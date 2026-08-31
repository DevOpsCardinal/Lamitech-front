import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup"
import { createConductorApi } from 'API/conductores';
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

export default function RegistrarConductor() {

    const [estadoConduc, setEstadoConduc] = useState(null);
    const { auth } = useAuth();


    const formik = useFormik({
        initialValues: {
            cedula: "",
            nombreCom: "",
           
        },
        validationSchema: Yup.object({
            cedula: Yup.number().required(true),
            nombreCom: Yup.string().required(true),
         
        }),
        onSubmit: async (formValue) => {

            if (estadoConduc === null) {
                const mostrarAlert = () => {
                    swal({
                        title: "Debes escoger un estado",
                        icon: "error",
                        button: "Aceptar",
                    })
                }
                mostrarAlert()
                return null;
            }

            const response = await createConductorApi(formValue, auth, estadoConduc)
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

                    <Form style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }} onSubmit={formik.handleSubmit}>
                        <h4 style={{ color: 'white' }}>Registrar Conductor</h4>
                        <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

                            <Col className="pr-1" md="5">
                                <Form.Group>
                                    <label style={{ color: 'white' }}>Cedula</label>
                                    <Form.Control
                                        name="cedula"
                                        placeholder="cedula"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.cedula}
                                        isInvalid={formik.errors.cedula}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                           
                            

                            <Col className="px-1" md="5">
                                <Form.Group>
                                    <label style={{ color: 'white' }}>Nombre Completo</label>
                                    <Form.Control
                                        name="nombreCom"
                                        placeholder="nombreCom"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.nombreCom}
                                        isInvalid={formik.errors.nombreCom}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                            {estadoConduc === null ? (< >
                                <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginLeft: 35 }}>
                                    <Col className="pl-1" md="4s">
                                        <Dropdown>
                                            <Dropdown.Toggle style={{ border: 'none', backgroundColor: '#fff', color: "#000" }} variant="info" id="dropdown-basic">
                                                Sin estado
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => setEstadoConduc(true)}>Activo</Dropdown.Item>
                                                <Dropdown.Item onClick={() => setEstadoConduc(false)}>Inactivo</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>

                                </Row>
                            </>) : estadoConduc === false ? (<>
                                <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginLeft: 35 }}>
                                    <Col className="pl-1" md="3s">
                                        <Button style={{ border: 'none', backgroundColor: '#fff', color: "#000" }} variant='info' onClick={() => setEstadoConduc(null)}>
                                            Estado: Inactivo
                                        </Button>
                                    </Col>
                                </Row>
                            </>) : estadoConduc === true ? (<>
                                <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginLeft: 35 }}>
                                    <Col className="pl-1" md="3s">
                                        <Button style={{ border: 'none', backgroundColor: '#fff', color: "#000" }} variant='info' onClick={() => setEstadoConduc(null)}>
                                            Estado: Activo
                                        </Button>
                                    </Col>
                                </Row>



                            </>) : (<></>)}


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
