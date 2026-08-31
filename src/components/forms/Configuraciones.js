import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup"
import { createConductorApi } from 'API/conductores';
import swal from 'sweetalert';
import useAuth from 'hooks/useAuth';
import io from 'socket.io-client'
import { cambiarTrama } from 'API/configuraciones';
import { useNavigate } from 'react-router-dom';
import { getTrama, getCom, cambiarCom, getDisplay, cambiarIpDisplay } from 'API/configuraciones';


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
import { getBasculas } from 'API/configuraciones';

const socket = io.connect("http://localhost:3001")

export default function Configutaciones() {
    const [trama, setTrama] = useState("");
    const [com1, setCom1] = useState("");
    const [com2, setCom2] = useState("");
    const [basculas, setBasculas] = useState(null);


    const [display, setDisplay] = useState("");




    const { auth, setAuth } = useAuth();

    useEffect(() => {
        (async () => {
            const responseBasculas = await getBasculas(auth)
            console.log("basculas", responseBasculas);
            setBasculas(responseBasculas[0]?.Valor)
            const response = await getTrama(auth)
            console.log("Trama", response)
            setTrama(response?.[0].Valor)
            console.log("Trama Configuraciones",trama)
            const com = await getCom(auth)
            console.log("coms",);
            setCom1(parseInt(com[0][0]?.Valor))
            setCom2(parseInt(com[1][0]?.Valor))

        })()
    }, [])

    const navigate = useNavigate();

    const [delimiter, setDelimiter] = useState("");




    const formik = useFormik({
        initialValues: {
            com: "",
            display: "",
            com2: "",
        },
        validationSchema: Yup.object({

            com: Yup.string().required(true),
            display: Yup.string(),
            com2: Yup.string(),

        }),
        onSubmit: async (formValue) => {
            
           if(!basculas){
            const mostrarAlert = () => {
                swal({
                    title: `Error en los datos`,
                    text: "selecciona la cantidad de básculas",
                    icon: "error",
                    button: "Aceptar",
                    timer: "3000"
                })
            }
            mostrarAlert()
             return null;
           }
            
            console.log("formValue Com", formValue)
            const com = await cambiarCom(auth, formValue, basculas)
            console.log("Com response", com)
            if (com[0]?.error) {
                const mostrarAlert = () => {
                    swal({
                        title: `Error en los datos`,
                        text: "Los datos enviados son incorrectos",
                        icon: "error",
                        button: "Aceptar",
                        timer: "3000"
                    })
                }
                mostrarAlert()
            }
            const response = await cambiarTrama(auth, trama)
            if (response.message) {

                if (trama == "Cardinal SMA" || trama == "Rice Lake IQ355" || trama == "AND" || trama == "Cardinal SB-200" || trama == "WI110" || trama == "Numero") {

                    socket.emit("com", { message: formik.values.com, delimit: delimiter })
                } else if (trama == "Cardinal SB-400" || trama == "Toledo Long/Short" || trama == "SB500 con Semáforo") {

                    socket.emit("com", { message: formik.values.com, delimit: "Cardinal SB-400" })
                }
                console.log("formValue", formValue)
                


                const mostrarAlert = () => {
                    swal({
                        title: `${response.message}`,
                        text: "Los datos enviados son incorrectos",
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
                        title: `${response.error}`,
                        text: "Los datos enviados son incorrectos",
                        icon: "error",
                        button: "Aceptar",
                        timer: "3000"
                    })
                }
                mostrarAlert()
            }


            setAuth(null)
            //formik.resetForm()
        }
    })

    return (
        <tbody  >
            <tr >
                <td>

                    <Form onSubmit={formik.handleSubmit}>

                        <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

                            <Col className="pr-1" md="5">
                                <Form.Group>
                                    <label style={{ color: '#fff' }}>COM Bascula 1</label>
                                    <Form.Control
                                        name="com"
                                        placeholder='2'
                                        type="number"
                                        onClick={() => setCom1(null)}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={com1 ?  com1: formik.values.com}
                                        isInvalid={formik.errors.com}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>

                            <Col className="pr-1" md="5">
                                <Form.Group>
                                    <label style={{ color: '#fff' }}>COM Bascula 2</label>
                                    <Form.Control
                                        name="com2"
                                        placeholder='3'
                                        type="number"
                                        disabled = {basculas == null ? true: basculas == "0" ? true : false}
                                        onClick={() => setCom2(null)}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={com2 ? com2 : formik.values.com2}
                                        isInvalid={formik.errors.com2}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>

                            {trama === null || trama == "" ? (<>

                                <Col className="pl-1" md="5">
                                    <label style={{ color: '#fff' }}>Trama</label>
                                    <Dropdown>
                                        <Dropdown.Toggle style={{ border: 'none', backgroundColor: '#fff', color: "#000" }} variant="info" id="dropdown-basic">
                                            Trama
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>

                                            <Dropdown.Item onClick={() => setTrama("Cardinal SMA")}>Cardinal SMA</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setTrama("Cardinal SB-400")}>Cardinal SB-400</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setTrama("Cardinal SB-200")}>Cardinal SB-200</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setTrama("Rice Lake IQ355")}>Rice Lake IQ355</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setTrama("AND")}>AND</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setTrama("WI110")}>WI110</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setTrama("Numero")}>Numero</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setTrama("Toledo Long/Short")}>Toledo Long/Short</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setTrama("SB500 con Semáforo")}>SB500 con Semáforo</Dropdown.Item>




                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>


                            </>) : (<>

                                <Col className="pl-1" md="5" style={{marginTop: 12}}>
                                    
                                    <Button style={{ border: 'none', backgroundColor: '#fff', color: "#000" }} variant='info' onClick={() => setTrama(null)}>
                                        {trama}
                                    </Button>
                                </Col>
                            </>)}


                            {basculas === null || basculas == "" ? (<>
                        
                        <Col className="pl-1" md="5">
                            <label style={{ color: '#fff' }}>Basculas</label>
                            <Dropdown>
                                <Dropdown.Toggle style={{ border: 'none', backgroundColor: '#fff', color: "#000" }} variant="info" id="dropdown-basic">
                                    basculas
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setBasculas("0")}>1 báscula</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setBasculas("1")}>2 básculas</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>


                        </>) : (<>
                           
                        <Col className="pl-1" md="5" style={{marginTop: 12}}>
                        
                            <Button style={{ border: 'none', backgroundColor: '#fff', color: "#000" }} variant='info' onClick={() => setBasculas(null)}>
                                {basculas == "0" ? "1 báscula": "2 básculas"}
                            </Button>
                        </Col>
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
                </td>
            </tr>
        </tbody >
    )
}
