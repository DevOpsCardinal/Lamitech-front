import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup"
import { createConductorApi } from 'API/conductores';
import swal from 'sweetalert';
import useAuth from 'hooks/useAuth';
import { traerConductor } from 'API/conductores';
import { updateConductorApi } from 'API/conductores';

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

export default function EditarConductor() {

    const [estadoConduc, setEstadoConduc] = useState(null);
    const [busqueda, setBusqueda] = useState(null);
    const [proceso, setProceso] = useState(null);
    const [valor, setValor] = useState(null);


    const { auth } = useAuth();



    const formik = useFormik({
        initialValues: {
            cedula: "",
            nombreCom: "",

        },
        validationSchema: Yup.object({
            cedula: Yup.number(),
            nombreCom: Yup.string().required(true),

        }),
        onSubmit: async (formValue) => {

            console.log("formValue", formValue);

            if (estadoConduc == null) {
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

            const response = await updateConductorApi(formValue, auth, estadoConduc, busqueda)
            console.log("updateConductorApi",response)

            if (response?.error) {
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

            if (response?.result.rowsAffected) {
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


    const CambiarEstado = async () => {
        if (valor == "" || valor == null) {
            const mostrarAlert = () => {
                swal({
                    title: "Los datos enviados son incorrectos, debes escribir un valor",
                    icon: "error",
                    button: "Aceptar",
                    timer: "3000"
                })
            }
            mostrarAlert()
        }

        if (proceso == "" || proceso == null) {
            const mostrarAlert = () => {
                swal({
                    title: "Los datos enviados son incorrectos, debes seleccionar un parametro de busqueda",
                    icon: "error",
                    button: "Aceptar",
                    timer: "3000"
                })
            }
            mostrarAlert()
        }

        const response = await traerConductor(proceso, valor, auth)
        console.log(response)
        if (response?.length == 0) {
            const mostrarAlert = () => {
                swal({
                    title: "Los datos enviados son incorrectos",
                    icon: "error",
                    button: "Aceptar",
                    timer: "3000"
                })
            }
            mostrarAlert()
            return null
        }
        if (response?.[0]) {
            formik.setFieldValue('cedula', response?.[0].Cedula)
            formik.setFieldValue('nombreCom', response?.[0].Nombre)
            setEstadoConduc(`${response?.[0].Estado}`)
            setBusqueda(response)



        } else {
            if (valor == "" || valor == null) {
                const mostrarAlert = () => {
                    swal({
                        title: "No encontramos datos para esta busqueda",
                        icon: "error",
                        button: "Aceptar",
                        timer: "3000"
                    })
                }
                mostrarAlert()
            }
        }


    }
    console.log("estadoConduc", estadoConduc)
    return (
        <tbody  >
            <tr >
                <td>
                    {busqueda ? (<>
                        <button style={{ marginBottom: 20, backgroundColor: '#FFF',  border: 'none', color: 'BLACK', borderRadius: 10, fontSize: 40 }} type='button' onClick={() => setBusqueda(null)}>{`<-`}</button>
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
                                            disabled
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
                                {estadoConduc === null ? (<>
                                    <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginLeft: 35 }}>
                                        <Col className="pl-1" md="4s">
                                            <Dropdown>
                                                <Dropdown.Toggle style={{ border: 'none', backgroundColor: '#fff', color: "#000" }} variant="info" id="dropdown-basic">
                                                    Sin estado
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => setEstadoConduc('Activo')}>Activo</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => setEstadoConduc('Inactivo')}>Inactivo</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>

                                    </Row>
                                </>) : estadoConduc == "Activo" ? (<>
                                    <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginLeft: 35 }}>
                                        <Col className="pl-1" md="3s">
                                            <Button style={{ border: 'none', backgroundColor: '#fff', color: "#000" }} variant='info' onClick={() => setEstadoConduc(null)}>
                                                Estado: Activo
                                            </Button>
                                        </Col>
                                    </Row>
                                </>) : (<>
                                    <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginLeft: 35 }}>
                                        <Col className="pl-1" md="3s">
                                            <Button style={{ border: 'none', backgroundColor: '#fff', color: "#000" }} variant='info' onClick={() => setEstadoConduc(null)}>
                                                Estado: Inactivo
                                            </Button>
                                        </Col>
                                    </Row>



                                </>)}


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





                    </>) : (<>

                        <Row>

                            <label htmlFor="exampleInputEmail1" style={{ color: '#fff' }}>
                                Buscar Conductor
                            </label>
                            <Col className="pl-1" md="6">
                                {proceso === null || proceso == '' ? (<>
                                    <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                                        <Col className="pl-1" md="3s">
                                            <Dropdown>
                                                <Dropdown.Toggle style={{ border: 'none', backgroundColor: '#fff', color: "#cc444c", marginTop: 25 }} variant="info" id="dropdown-basic">
                                                    Proceso
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => setProceso('Cedula')}>Cédula</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => setProceso('Nombre')}>Nombre</Dropdown.Item>

                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                    </Row>

                                </>) : proceso === 'Cedula' ? (<>
                                    <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>
                                        <Col className="pl-1" md="3s">
                                            <Button style={{ border: 'none', backgroundColor: '#fff', color: "#cc444c", marginTop: 25 }} variant='info' onClick={() => setProceso('')}>
                                                Cédula
                                            </Button>
                                        </Col>
                                    </Row>
                                </>) : proceso === 'Nombre' ? (<>
                                    <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>
                                        <Col className="pl-1" md="3s">
                                            <Button style={{ border: 'none', backgroundColor: '#fff', color: "#cc444c", marginTop: 25 }} variant='info' onClick={() => setProceso('')}>
                                                Nombre
                                            </Button>
                                        </Col>
                                    </Row>
                                </>) : (<></>)}
                            </Col>
                            <Col className="pl-1" md="6">
                                <Form.Group>
                                    <label htmlFor="exampleInputEmail1" style={{ color: '#fff' }}>
                                        Escribe el valor
                                    </label>
                                    <Form.Control

                                        onChange={() => setValor(event.target.value)}

                                    ></Form.Control>
                                </Form.Group>
                            </Col>

                        </Row>


                        <Button onClick={() => CambiarEstado()} style={{ marginTop: '3vh', backgroundColor: '#fff', border: 'none', color: '#cc444c', borderRadius: 10 }} variant="info">
                            Buscar
                        </Button>
                    </>)}



                </td>
            </tr>
        </tbody>
    )
}
