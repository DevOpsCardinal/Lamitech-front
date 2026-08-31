import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup"
import swal from 'sweetalert';
import useAuth from 'hooks/useAuth';
import { cambiarLogo, cambiarRecibo } from 'API/configuraciones';
import { getRecibo } from 'API/configuraciones';

import {
    Button,
    Row,
    Col,
    Form,
} from "react-bootstrap";

export default function Recibo() {


    async function reciboF(){
        const reciboData = await getRecibo(auth);
        console.log("Datos recibo", reciboData);

        formik.setFieldValue('empresa', reciboData[0]?.Valor)
        formik.setFieldValue('departamento', reciboData[1]?.Valor)
        formik.setFieldValue('direccion', reciboData[2]?.Valor)
        formik.setFieldValue('telefono', reciboData[3]?.Valor)
        formik.setFieldValue('campo1', reciboData[4]?.Valor)
        formik.setFieldValue('campo2', reciboData[5]?.Valor)
    }

    useEffect(() => {
        reciboF()
    }, [])
    

   
    const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
    const { auth, setAuth } = useAuth();
    const seleccionarArchivo = async (event) => {
        await setArchivoSeleccionado(event.target.files[0]);

    };

    const formik = useFormik({
        initialValues: {
            empresa: "",
            departamento: "",
            direccion: "",
            telefono: "",
            campo1: "",
            campo2: "",

        },
        validationSchema: Yup.object({
            empresa: Yup.string().required(),
            departamento: Yup.string().required(),
            direccion: Yup.string().required(),
            telefono: Yup.string(),
            campo1: Yup.string(),
            campo2: Yup.string(),

        }),
        onSubmit: async (formValue) => {
            
            if (archivoSeleccionado == null || archivoSeleccionado == "") {
                const mostrarAlert = () => {
                    swal({
                        title: "Archivo 'Logo' no seleccionado",
                        icon: "error",
                        button: "Aceptar",
                        timer: "3000"
                    })
                }
                mostrarAlert()
            }

            const logo = await cambiarLogo(auth, formValue, archivoSeleccionado)
            if (!logo.message) {
                const mostrarAlert = () => {
                    swal({
                        title: "Hubo un error con el archivo",
                        icon: "error",
                        button: "Aceptar",
                        timer: "3000"
                    })
                }
                mostrarAlert()
            }

            const recibo = await cambiarRecibo(auth, formValue)
            if (recibo.message) {
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
                formik.resetForm()
                setAuth(null)
            }




            //formik.resetForm()
        }
    })
    return (
        <tbody  >
            <tr >
                <td>
                    {/* onSubmit={formik.handleSubmit} */}
                    <Form onSubmit={formik.handleSubmit}>
                        <h4 style={{ color: '#fff' }}>Campos del recibo</h4>
                        <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

                            <Col className="pr-1" md="5">
                                <Form.Group>
                                    <label style={{ color: '#fff' }}>Empresa</label>
                                    <Form.Control
                                        name="empresa"
                                        placeholder="Empresa"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.empresa}
                                        isInvalid={formik.errors.empresa}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col className="px-1" md="5">
                                <Form.Group>
                                    <label style={{ color: '#fff' }}>Departamento</label>
                                    <Form.Control
                                        name="departamento"
                                        placeholder="Departamento"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.departamento}
                                        isInvalid={formik.errors.departamento}
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
                                        Teléfono
                                    </label>
                                    <Form.Control
                                        name="telefono"
                                        placeholder="Teléfono"
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
                                        Campo Libre 1
                                    </label>
                                    <Form.Control
                                        name="campo1"
                                        placeholder="Campo Libre 1"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.campo1}
                                        isInvalid={formik.errors.campo1}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col className="pl-1" md="5">
                                <Form.Group>
                                    <label style={{ color: '#fff' }} htmlFor="exampleInputEmail1">
                                        Campo Libre 2
                                    </label>
                                    <Form.Control
                                        name="campo2"
                                        placeholder="Campo Libre 2"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.campo2}
                                        isInvalid={formik.errors.campo2}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>

                            <Col className="pl-1" md="5">
                                <Form.Group>
                                    <label style={{ color: '#fff' }} htmlFor="exampleInputEmail1">
                                        Logo
                                    </label>
                                    <Form.Control
                                        accept="image/png"
                                        name="archivo"
                                        placeholder="Logo"
                                        type="file"
                                        onChange={seleccionarArchivo}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.archivo}
                                        isInvalid={formik.errors.archivo}
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
