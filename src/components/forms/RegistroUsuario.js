import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup"
import { createConductorApi } from 'API/conductores';
import { crearTransportadoraApi } from 'API/transportadora';
import swal from 'sweetalert';
import useAuth from 'hooks/useAuth';
import { registerApi, updateUserApi } from 'API/users';


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

export default function RegistroUsuario({ user, estado }) {

    console.log("useruseruseruseruseruseruseruseruser", user, estado)
    const [estadoUser, setEstadoUser] = useState(null)
    const [activarUser, setActivarUser] = useState(null)
    const { auth } = useAuth();

    const formik = useFormik({
        initialValues: {
            cedula: user ? user.Cedula : "",
            username: user ? user.Nick : "",
            nombre: user ? user.Nombre : "",
            apellido: user ? user.Apellido : "",
            password: "",
            repetirContraseña: "",


        },
        validationSchema: Yup.object({
            nombre: Yup.string().required(true),
            cedula: Yup.string().required(true),
            apellido: Yup.string().required(true),
            password: user ? Yup.string() : Yup.string().required(true),
            repetirContraseña: user ? Yup.string().oneOf([Yup.ref("password")], true) : Yup.string().required(true).oneOf([Yup.ref("password")], true)
        }),
        onSubmit: async (formValue) => {

            console.log("activarUser", activarUser)

            const rol = estadoUser === true ? "100" : "1"

            if (user) {



                const response = await updateUserApi(auth, formValue, rol, user.Cedula, activarUser)
                if (response.result.rowsAffected) {
                    estado(null)
                    const mostrarAlert = () => {
                        swal({
                            title: "Edición Exitosa",
                            icon: "success",
                            button: "Aceptar",
                            timer: "3000"
                        })
                    }
                    mostrarAlert()

                }

                if (response.error) {
                    const mostrarAlert = () => {
                        swal({
                            title: "Selecciona un rol",
                            icon: "error",
                            button: "Aceptar",
                            timer: "3000"
                        })
                    }
                    mostrarAlert()
                }



            } else {


                if (!estadoUser) {
                    const mostrarAlert = () => {
                        swal({
                            title: "debe escoger un rol de usuario",
                            icon: "error",
                            button: "Aceptar",
                            timer: "3000"
                        })
                    }
                    mostrarAlert()
                }



                const response = await registerApi(formValue, auth, rol)
                console.log("Usuario", response)


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
        }
    })
    return (
        <tbody  >
            <tr >
                <td>
                    {/* onSubmit={formik.handleSubmit} */}
                    <Form onSubmit={formik.handleSubmit}>
                        <h4 style={{ color: '#fff' }}>{user ? "Editar usuario": "Registrar Usuario"}</h4>
                        <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

                            <Col className="pr-1" md="5">
                                <Form.Group>
                                    <label style={{ color: '#fff' }}>Cedula</label>
                                    <Form.Control
                                        name="cedula"
                                        placeholder="1039473558"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.cedula}
                                        isInvalid={formik.errors.cedula}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>

                            <Col className="pr-1" md="5">
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
                            <Col className="pr-1" md="5">
                                <Form.Group>
                                    <label style={{ color: '#fff' }}>Apellido</label>
                                    <Form.Control
                                        name="apellido"
                                        placeholder="Apellido"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.apellido}
                                        isInvalid={formik.errors.apellido}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col className="pr-1" md="5">
                                <Form.Group>
                                    <label style={{ color: '#fff' }}>Usuario</label>
                                    <Form.Control
                                        name="username"
                                        placeholder="Usuario"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.username}
                                        isInvalid={formik.errors.username}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                            <Col className="pl-1" md="5">
                                <Form.Group>
                                    <label style={{ color: '#fff' }} htmlFor="exampleInputEmail1">
                                        Contraseña
                                    </label>
                                    <Form.Control
                                        name="password"
                                        placeholder="Contraseña"
                                        type="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        isInvalid={formik.errors.password}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col className="pl-1" md="5">
                                <Form.Group>
                                    <label style={{ color: '#fff' }} htmlFor="exampleInputEmail1">
                                        Repetir contraseña
                                    </label>
                                    <Form.Control
                                        name="repetirContraseña"
                                        placeholder="Repetir Contraseña"
                                        type="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.repetirContraseña}
                                        isInvalid={formik.errors.repetirContraseña}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>


                            {estadoUser === null ? (<>
                                <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginLeft: 35 }}>
                                    <Col className="pl-1" md="3s">
                                        <Dropdown>
                                            <Dropdown.Toggle style={{ border: 'none', backgroundColor: '#fff', color: "#000" }} variant="info" id="dropdown-basic">
                                                Rol
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => setEstadoUser(true)}>Administrador</Dropdown.Item>
                                                <Dropdown.Item onClick={() => setEstadoUser(false)}>Usuario</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>
                                </Row>

                            </>) : estadoUser === false ? (<>
                                <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginLeft: 35 }}>
                                    <Col className="pl-1" md="3s">
                                        <Button style={{ border: 'none', backgroundColor: '#fff', color: "#000" }} variant='info' onClick={() => setEstadoUser(null)}>
                                            Usuario
                                        </Button>
                                    </Col>
                                </Row>
                            </>) : estadoUser === true ? (<>
                                <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginLeft: 35 }}>
                                    <Col className="pl-1" md="3s">
                                        <Button style={{ border: 'none', backgroundColor: '#fff', color: "#000" }} variant='info' onClick={() => setEstadoUser(null)}>
                                            Administrador
                                        </Button>
                                    </Col>
                                </Row>
                            </>) : (<></>)}


                            {activarUser === null ? (<>
                                <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginLeft: 35 }}>
                                    <Col className="pl-1" md="3s">
                                        <Dropdown>
                                            <Dropdown.Toggle style={{ border: 'none', backgroundColor: '#fff', color: "#000" }} variant="info" id="dropdown-basic">
                                                Activar/Desactivar
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => setActivarUser(true)}>Activo</Dropdown.Item>
                                                <Dropdown.Item onClick={() => setActivarUser(false)}>Inactivo</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>

                                </Row>
                            </>) : activarUser === false ? (<>
                                <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginLeft: 35 }}>
                                    <Col className="pl-1" md="3s">
                                        <Button style={{ border: 'none', backgroundColor: '#fff', color: "#000" }} variant='info' onClick={() => setActivarUser(null)}>
                                            Inactivo
                                        </Button>
                                    </Col>
                                </Row>
                            </>) : activarUser === true ? (<>
                                <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginLeft: 35 }}>
                                    <Col className="pl-1" md="3s">
                                        <Button style={{ border: 'none', backgroundColor: '#fff', color: "#000" }} variant='info' onClick={() => setActivarUser(null)}>
                                            Activo
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
