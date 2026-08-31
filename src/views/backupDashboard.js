import React, { useState, useEffect, useRef } from "react";
import ChartistGraph from "react-chartist";
import { getPeso } from "API/peso";
import useAuth from "hooks/useAuth";
import swal from 'sweetalert';
import Despacho from "components/forms/Despacho";
import Entrada from "components/forms/Entrada";
import { createDespachoSalidaApi } from "API/despachoSalida";
import socketIOCliente from 'socket.io-client'
import { useFormik } from "formik";
import * as Yup from "yup"
import { createMateriPrimaSalidaApi } from "API/materiaPrimaSalida";
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from "components/pdf/pdf";
import Pdf from 'components/pdf/pdf';
import Modal from "components/modals/ModalPdf";
import { getConductoresApi } from "API/conductores";
import { getMateriaPrimaApi } from "API/materiaPrima";
import { getPlantaApi } from "API/planta";
import { getClienteApi } from "API/cliente";
import { getTransportadoraApi } from "API/transportadora";
import { getCivs } from "API/civ";
import { useNavigate } from 'react-router-dom';
import { getTrama } from "API/configuraciones";
import { getDisplay } from "API/configuraciones";
import { useMediaQuery } from 'react-responsive'





let pesoT
let pesoG
let pesoN

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
    Form,
    OverlayTrigger,
    Tooltip,
    Breadcrumb,
    Dropdown,
} from "react-bootstrap";


function Dashboard() {
    const { auth } = useAuth();
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const navigate = useNavigate();

    let result
    const [trama, setTrama] = useState("null");
    const [peso, setPeso] = useState(null);
    const [despacho, setDespacho] = useState(false)
    const [entrada, setEntrada] = useState(false)
    const [formSearch, setFormSearch] = useState(null)
    const [checkEntrada, setCheckEntrada] = useState(null)
    const [checkDespacho, setCheckDespacho] = useState(null)
    const [checkMccain, setCheckMccain] = useState(false)

    const [materiaPrima, setMateriaPrima] = useState(null)
    const [checkDespachoFin, setCheckDespachoFin] = useState(null)
    const [modalConstructor, setModalConstructor] = useState(null)
    const [fecha, setFecha] = useState(null)
    const [hora, setHora] = useState(null)
    const [volumenEstado, setVolumenEstado] = useState(null)
    const [unidadEstado, setUnidadEstado] = useState(null)
    const [pdf, setPdf] = useState(null)
    const [recibo, setRecibo] = useState(null)
    const [recibo2, setRecibo2] = useState(true)


    ///////////

    const [vehiculos, setVehiculos] = useState(null)
    const [materia, setMateria] = useState(null)
    const [planta, setPlanta] = useState(null)
    const [filtro, setFiltro] = useState(null)
    const [transportadora, setTransportadora] = useState(null)
    const [destino, setDestino] = useState(null)
    const [conductor, setconductor] = useState(null)
    const [civs, setCivs] = useState(null)
    const [dropdown, setDropdown] = useState(null)
    const [dropdownMateria, setDropdownMateria] = useState(null)
    const [filtroMateria, setFiltroMateria] = useState(null)
    const [dropdownPlanta, setdropdownPlanta] = useState(null)
    const [filtroPlanta, setfiltroPlanta] = useState(null)
    const [proveedor, setProveedor] = useState(null)
    const [dropdownProveedor, setdropdownProveedor] = useState(null)
    const [filtroProveedor, setFiltroProveedor] = useState(null)
    const [dropdownTransportadora, setDropdownTransportadora] = useState(null)
    const [filtroTransportadora, setfiltroTransportadora] = useState(null)
    const [dropwdownDestino, setdropwdownDestino] = useState(null)
    const [filtroDestino, setFiltroDestino] = useState(null)
    const [numTiquete, setNumTiquete] = useState(null)
    const [dropdownConduc, setdropdownConduc] = useState(null)
    const [dropdowncivs, setDropdowncivs] = useState(null)
    const [filtroConductor, setFiltroConductor] = useState(null)
    const [filtroCivs, setFiltroCivs] = useState(null)
    const [pesoActivo, setPesoActivo] = useState(null)
    const [display, setDisplay] = useState("")



    const socket = useRef();


    const mostrarAlertEnvio = () => {
        swal({
            title: "Datos de Despacho ingresados correctamente",
            text: "Los datos son correctos",
            icon: "success",
            button: "Aceptar",
            timer: "3000"
        })
    }


    const getVehiculos = async () => {
        const response = await getVehiculoApi(auth)
        setVehiculos(response)
        setDropdown(true)
    }

    const getMateria = async () => {
        const response = await getMateriaPrimaApi(auth)
        setMateria(response)
        setDropdownMateria(true)
    }


    const getCiv = async () => {
        const response = await getCivs(auth)
        setCivs(response)
        setDropdowncivs(true)
    }

    const getPlantas = async () => {
        const response = await getPlantaApi(auth)
        setPlanta(response)
        setdropdownPlanta(true)
    }

    const getProveedor = async () => {
        const response = await getClienteApi(auth)
        setProveedor(response)
        setdropdownProveedor(true)
    }


    const getTransportadora = async () => {
        const response = await getTransportadoraApi(auth)
        setTransportadora(response)
        setDropdownTransportadora(true)
    }


    const getDestino = async () => {
        const response = await getDestinoApi(auth)
        setDestino(response)
        setdropwdownDestino(true)
    }


    const getConduct = async () => {
        const response = await getConductoresApi(auth)
        setconductor(response)
        setdropdownConduc(true)
    }





    const filtrarMateria = query => {

        const result = materia?.data.filter(function (lista) {
            return lista?.attributes.nombre.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
        })
        setFiltroMateria(result)
    }


    const filtrarPlanta = query => {

        const result = planta?.data.filter(function (lista) {
            return lista?.attributes.nombre.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
        })
        setfiltroPlanta(result)
    }


    const filtrarProveedor = query => {
        const result = proveedor?.data.filter(function (lista) {
            return lista?.attributes.nombre.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
        })
        setFiltroProveedor(result)
    }

    const filtrarVehiculos = query => {

        const result = vehiculos?.data.filter(function (lista) {
            return lista?.attributes.placa.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
        })
        setFiltro(result)
    }



    const filtroConductorF = query => {

        const result = conductor?.data.filter(function (lista) {
            return lista?.attributes.nombre.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
        })
        setFiltroConductor(result)
    }


    const filtrarTransportadora = query => {

        const result = transportadora?.data.filter(function (lista) {
            return lista?.attributes.nombre.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
        })
        setfiltroTransportadora(result)
    }


    const filtrarDestino = query => {

        const result = destino?.data.filter(function (lista) {
            return lista?.attributes.nombre.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
        })
        setFiltroDestino(result)
    }


    const filtrarCivs = query => {

        const result = civs?.data.filter(function (lista) {
            return lista?.attributes.civ.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
        })
        setFiltroCivs(result)
    }

    const guardarFiltro = (placa) => {

        formik.setFieldValue("placa", placa.attributes.placa)
        formik.setFieldValue("codigo", placa.attributes.codigo)
        formik.setFieldValue("numInterno", placa.attributes.noInterno)
        formik.setFieldValue("tipoVehiculo", placa.attributes.volumenVehiculo)

        setDropdown(null)
    }

    const guardarFiltroMateria = (placa) => {
        formik.setFieldValue("productoMateria", placa.attributes.nombre)
        formik.setFieldValue("tipoProducto", placa.attributes.tipo)
        formik.setFieldValue("cantidad", placa.attributes.codigo)
        setDropdownMateria(null)
    }

    const guardarFiltroPlanta = (placa) => {
        formik.setFieldValue("planta", placa.attributes.nombre)
        setdropdownPlanta(null)
    }

    const guardarFiltroProveedor = (placa) => {
        formik.setFieldValue("clienteProveedor", placa.attributes.nombre)
        setdropdownProveedor(null)
    }

    const guardarFiltroTransportadora = (placa) => {
        formik.setFieldValue("transportadora", placa.attributes.nombre)
        setDropdownTransportadora(null)
    }

    const guardarFiltroDestino = (placa) => {
        formik.setFieldValue("destino", placa.attributes.nombre)
        setdropwdownDestino(null)
    }


    const guardarFiltroConduct = (placa) => {
        formik.setFieldValue("conductor", placa.attributes.nombre)
        formik.setFieldValue("cedulaCiudadania", placa.attributes.cedula)

        setdropdownConduc(null)
    }


    const guardarFiltroCivs = (placa) => {
        formik.setFieldValue("civ", placa.attributes.civ)
        formik.setFieldValue("direccion", ` ${placa.attributes.civ}` + `${placa.attributes.nombreEjeVia} ` + `${placa.attributes.nombreExtremoInicial} ` + `${placa.attributes.nombreExtremoFinal} ` + `  ${placa.attributes.tipoMalla} `)
        setDropdowncivs(null)
    }





    const formik = useFormik({
        initialValues: {

            tiqueteNum: formSearch ? formSearch?.No_Tiquete : "",
            placa: formSearch ? formSearch?.Placa : "",
            codigo: formSearch ? formSearch.IdVehiculo : "",
            numInterno: formSearch ? formSearch.No_Interno : "",
            tipoVehiculo: formSearch ? formSearch.Tipo_Vehiculo : "",
            conductor: "",
            cedulaCiudadania: formSearch ? formSearch.Cedula : "",
            productoMateria: formSearch ? formSearch.materiaPrima_Producto : "",
            tipoProducto: formSearch ? formSearch.Tipo_Producto : "",
            cantidad: formSearch ? formSearch.Id_Producto : "",
            planta: formSearch ? formSearch.Planta : "",
            clienteProveedor: formSearch ? formSearch.Cliente_Proveedor : "",
            transportadora: formSearch ? formSearch.Transportadora : "",
            civ: formSearch ? formSearch.Civ : "",
            direccion: formSearch ? formSearch.Direccion : "",
            entregadoPor: formSearch ? formSearch.Entregado_Por : "",
            recibidoPor: formSearch ? formSearch.Recibido_Por : "",
            observaciones: formSearch ? formSearch.Observaciones : "",
            despachoProducto: checkDespacho,
            entradaMateriaPrima: checkEntrada,



        },
        validationSchema: Yup.object({

            tiqueteNum: Yup.string(),
            placa: Yup.string(),
            codigo: Yup.string(),
            numInterno: Yup.string(),
            tipoVehiculo: Yup.string(),
            conductor: Yup.string(),
            cedulaCiudadania: Yup.string(),
            productoMateria: Yup.string(),
            tipoProducto: Yup.string(),
            cantidad: Yup.string(),
            planta: Yup.string(),
            clienteProveedor: Yup.string(),
            transportadora: Yup.string(),


            civ: Yup.string(),
            direccion: Yup.string(),
            entregadoPor: Yup.string(),
            recibidoPor: Yup.string(),
            observaciones: Yup.string(),

        }),
        onSubmit: async (formValue) => {


            let peso = 0

            if (formSearch?.Caso == "Despacho") {

                const response = await createDespachoSalidaApi(auth, formSearch, pesoNumEnv, formValue, volumenEstado, unidadEstado)





                pesoT = formSearch?.Tara
                pesoG = pesoNumEnv
                pesoN = pesoNumEnv - parseInt(formSearch?.Tara)



                setRecibo2(formValue)
                setRecibo(formSearch)


                if (response.error) {
                    const mostrarAlert = () => {
                        swal({
                            title: "Despacho Errado",
                            icon: "error",
                            button: "Aceptar",
                            timer: "3000"
                        })
                    }

                    mostrarAlert()
                    return null
                }

                navigate('/admin/recibo', { state: { auth, formSearch, pesoNumEnv, formValue, volumenEstado, unidadEstado, pesoT, pesoG, pesoN, recibo2, Recibo: formSearch, Recibo2: formValue } });
                const mostrarAlert = () => {
                    swal({
                        title: "Despacho Exitoso",
                        icon: "success",
                        button: "Aceptar",
                        timer: "3000"
                    })
                }



                mostrarAlert()





            } else {
                const response = await createMateriPrimaSalidaApi(auth, formSearch, pesoNumEnv, formValue, volumenEstado, unidadEstado)




                pesoT = pesoNumEnv
                pesoG = formSearch.Bruto
                pesoN = parseInt(formSearch?.Bruto) - pesoNumEnv



                setPdf(true)
                setRecibo2(formValue)
                setRecibo(formSearch)

                setFormSearch(null)

                if (response.error) {
                    const mostrarAlert = () => {
                        swal({
                            title: "Despacho Errado",
                            icon: "error",
                            button: "Aceptar",
                            timer: "3000"
                        })
                    }
                    mostrarAlert()
                    return null
                }
                navigate('/admin/recibo', { state: { auth, formSearch, pesoNumEnv, formValue, volumenEstado, unidadEstado, pesoT, pesoG, pesoN, recibo2, Recibo: formSearch, Recibo2: formValue } });
                const mostrarAlert = () => {
                    swal({
                        title: "Despacho Exitoso",
                        icon: "success",
                        button: "Aceptar",
                        timer: "3000"
                    })
                }

                mostrarAlert()

            }


        }
    })


    const mostrarAlert = () => {
        swal({
            title: "Error",
            text: "Los datos enviados son incorrectos",
            icon: "error",
            button: "Aceptar",
            timer: "3000"
        })
    }







    useEffect(() => {

        (async () => {
            const response = await getTrama(auth)

            response[0].Valor ? setTrama(response[0].Valor) : setTrama("null");

            const responseDisplay = await getDisplay(auth)

            responseDisplay[0].Valor ? setDisplay(responseDisplay[0].Valor) : setDisplay("null");



        })()



        const traerPeso = () => {

            socket.current = socketIOCliente('http://localhost:3000')
            socket.current.on("peso", (data) => {



                if (pesoActivo == null) {

                    setPeso(data)
                } else {


                }

            })
            return () => {
                socket.disconnect();
                socket.disconnect();

            }

        }

        traerPeso()




        if (formSearch) {

            const formulario = () => {
                formik.setFieldValue("tiqueteNum", formSearch.No_Tiquete)
                formik.setFieldValue("placa", formSearch.Placa)
                formik.setFieldValue("codigo", formSearch.Idvehiculo)
                formik.setFieldValue("numInterno", formSearch.No_Interno)
                formik.setFieldValue("conductor", formSearch.Conductor)
                formik.setFieldValue("cedulaCiudadania", formSearch.Cedula)
                formik.setFieldValue("productoMateria", formSearch.MateriaPrima_Producto)
                formik.setFieldValue("tipoProducto", formSearch.Tipo_Producto)
                formik.setFieldValue("cantidad", formSearch.Id_Producto)
                formik.setFieldValue("planta", formSearch.Planta)
                formik.setFieldValue("clienteProveedor", formSearch.Cliente_Proveedor)
                formik.setFieldValue("transportadora", formSearch.Transportadora)
                formik.setFieldValue("civ", formSearch.Civ)
                formik.setFieldValue("direccion", formSearch.Direccion)
                formik.setFieldValue("entregadoPor", formSearch.Entregado_Por)
                formik.setFieldValue("recibidoPor", formSearch.Recibido_Por)
                formik.setFieldValue("observaciones", formSearch.Observaciones)



            }

            formulario()

        }







    }, [formSearch])

    const hoy = new Date()

    const fecha2 = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
    const hora2 = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();


    let digito1
    let digito2
    let digito3


    let newStr
    let newStr2
    let pesostr
    let pesoSalida

    if (trama == "Cardinal SMA") {
        newStr = peso?.toString().slice(1, -3)
        newStr2 = newStr?.substring(3)
        pesostr = newStr2?.split(/\s+/).join('')
        pesoSalida = peso?.toString().substring(3).split(/\s+/).join('')
    } else if (trama == "Rice Lake IQ355") {
        newStr = peso?.toString().slice(1, -3)
        newStr2 = newStr?.substring(1)
        pesostr = newStr2?.split(/\s+/).join('')
        pesoSalida = peso?.toString().substring(3).split(/\s+/).join('')
    } else if (trama == "Cardinal SB-200") {
        newStr = peso?.toString().slice(1, -10)
        newStr2 = newStr?.substring(1)
        pesostr = newStr2?.split(/\s+/).join('')
        pesoSalida = peso?.toString().substring(3).split(/\s+/).join('')
    } else if (trama == "AND") {
        newStr = peso?.toString().slice(1, -2)
        newStr2 = newStr?.substring(3)
        pesostr = newStr2?.split(/\s+/).join('')
        pesoSalida = peso?.toString().substring(3).split(/\s+/).join('')
    } else if (trama == "Cardinal SB-400") {
        newStr = peso?.toString().slice(1, -8)
        newStr2 = newStr?.substring(1)
        pesostr = newStr2?.split(/\s+/).join('')
        pesoSalida = peso?.toString().substring(3).split(/\s+/).join('')
    } else if (trama == "WI110") {
        newStr = peso?.toString().slice(1, -2)
        newStr2 = newStr?.substring(3)
        pesostr = newStr2?.split(/\s+/).join('')
        pesoSalida = peso?.toString().substring(3).split(/\s+/).join('')
    } else if (trama == "WI110") {
        newStr = peso?.toString().slice(1, -2)
        newStr2 = newStr?.substring(3)
        pesostr = newStr2?.split(/\s+/).join('')
        pesoSalida = peso?.toString().substring(3).split(/\s+/).join('')
    }
    else if (trama == "Numero") {
        newStr = peso?.toString().slice(0)
        newStr2 = newStr?.substring(0)
        pesostr = newStr2?.split(/\s+/).join('')
        pesoSalida = peso?.toString().substring(0).split(/\s+/).join('')
    }
    else if (trama == "Toledo Long/Short") {
        newStr = peso?.toString().slice(1, -6)
        newStr2 = newStr?.substring(4)
        pesostr = newStr2?.split(/\s+/).join('')
        pesoSalida = peso?.toString().substring(0).split(/\s+/).join('')
    }
    else if (trama == "SB500 con Semáforo") {
        newStr = peso?.toString().slice(1, -4)
        newStr2 = newStr?.substring(1)
        pesostr = newStr2?.split(/\s+/).join('')
        pesoSalida = peso?.toString().substring(0).split(/\s+/).join('')
    }








    const pesoNumEnv = Number(pesostr)
    if (pesostr) {
        const pesoNum = Number(pesostr)


        if (pesoNum) {
            if (pesoNum > 100) {
                try {
                    const url = display = "" || display == "NULL" || !display ? `http://127.0.0.1:8000/dato?peso=${pesoSalida}` : `http://${display}/dato?peso=${pesoSalida}`;
                    const response = fetch(url);
                } catch (error) {

                }


            } else {
                try {
                    const url = display = "" || display == "NULL" || !display ? `http://127.0.0.1:8000/display?ms=Bienvenido` : `http://${display}/display?ms=Bienvenido`;
                    const response = fetch(url);
                } catch (error) {

                }

            }

        } else {
            const url = display = "" || display == "NULL" || !display ? `http://127.0.0.1:8000/display?ms=Bienvenido` : `http://${display}/display?ms=Bienvenido`;
            const response = fetch(url);
        }
    }


    const estadoDespachoProducto = () => {
        setCheckDespachoFin(false)
        setCheckEntrada(false)
        setCheckDespacho(true)
        setEntrada(false)
        setFormSearch(null)

    }

    const estadoEntradaMateriaPrima = () => {
        setCheckDespachoFin(false)
        setCheckDespacho(false)
        setEntrada(false)
        setCheckEntrada(true)
        setFormSearch(null)
    }
    const estadoMccain = () => {
        setCheckMccain(!checkMccain)

    }

    const despachofunction = () => {
        setCheckDespachoFin(true)
        setCheckEntrada(false)
        setCheckDespacho(false)
        setEntrada(!entrada)

    }
    const cambiarVolumen = query => {
        setUnidadEstado(query)
        const neto = formSearch?.attributes.caso == "Entrada" ? parseInt(formSearch?.attributes.bruto) - pesoNumEnv : formSearch?.attributes.caso == "Despacho" ? pesoNumEnv - parseInt(formSearch?.attributes.tara) : "0"
        const volumen = Number(neto) / Number(query)
        setVolumenEstado(volumen.toFixed(2))
    }


    const despachoSalida = async () => {

    }













    return (
        <>
            <Container style={{ marginTop: '-3.0vh' }}>
                <Row style={{ marginTop: 20, marginBottom: isTabletOrMobile ? 0 : 20 }}>
                    <Col lg="pl-1" sm="6" >
                        <Card className="card-stats" style={{ height: 50 }}>
                            <Card.Body>
                                <Row style={{ marginBottom: '4vh' }}>
                                    <tbody>
                                        <tr>
                                            <td style={{}}>
                                                <Form.Check className="mb-1 pl-0" style={{ marginTop: '-3.5vh' }}>
                                                    <Form.Check.Label >
                                                        <Form.Check.Input
                                                            checked={checkDespacho}
                                                            type="checkbox"
                                                            onChange={() => estadoDespachoProducto()}


                                                        ></Form.Check.Input>
                                                        <span className="form-check-sign"></span>
                                                    </Form.Check.Label>
                                                </Form.Check>
                                            </td>
                                            <td >
                                                Despacho Producto
                                            </td>
                                        </tr>
                                    </tbody>
                                </Row>
                            </Card.Body>

                        </Card>
                    </Col>
                    <Col lg="3" sm="6">
                        <Card className="card-stats" style={{ height: 50 }}>
                            <Card.Body>
                                <Row style={{ marginBottom: '4vh', }}>
                                    <tbody>
                                        <tr>
                                            <td style={{}}>
                                                <Form.Check className="mb-1 pl-0" style={{ marginTop: '-3.5vh' }}>
                                                    <Form.Check.Label >
                                                        <Form.Check.Input
                                                            checked={checkEntrada}
                                                            type="checkbox"
                                                            onChange={() => estadoEntradaMateriaPrima()}
                                                            value={checkDespacho}
                                                        ></Form.Check.Input>
                                                        <span className="form-check-sign"></span>
                                                    </Form.Check.Label>
                                                </Form.Check>
                                            </td>
                                            <td >
                                                Entrada materia
                                            </td>
                                        </tr>
                                    </tbody>
                                </Row>
                            </Card.Body>

                        </Card>
                    </Col>
                    <Col lg="3" sm="6">
                        <Card className="card-stats" style={{ height: 50 }}>
                            <Card.Body>
                                <Row style={{ marginBottom: '4vh' }}>
                                    <tbody>
                                        <tr>
                                            <td style={{}}>
                                                <Form.Check className="mb-1 pl-0" style={{ marginTop: '-3.5vh' }}>
                                                    <Form.Check.Label >
                                                        <Form.Check.Input
                                                            checked={checkDespachoFin}
                                                            type="checkbox"
                                                            onChange={() => despachofunction()}

                                                        ></Form.Check.Input>
                                                        <span className="form-check-sign"></span>
                                                    </Form.Check.Label>
                                                </Form.Check>
                                            </td>
                                            <td >
                                                En Transito
                                            </td>
                                        </tr>
                                    </tbody>
                                </Row>
                            </Card.Body>

                        </Card>
                    </Col>

                    {/*<Col lg="3" sm="6">
            <Card className="card-stats" style={{ height: 50 }}>
              <Card.Body>
                <Row style={{ marginBottom: '4vh', }}>
                  <tbody>
                    <tr>
                      <td style={{}}>
                        <Form.Check className="mb-1 pl-0" style={{ marginTop: '-3.5vh' }}>
                          <Form.Check.Label >
                            <Form.Check.Input
                              checked={checkMccain}
                              type="checkbox"
                              onChange={() => estadoMccain()}
                              value={checkMccain}
                            ></Form.Check.Input>
                            <span className="form-check-sign"></span>
                          </Form.Check.Label>
                        </Form.Check>
                      </td>
                      <td >
                        Mc.Cain
                      </td>
                    </tr>
                  </tbody>
                </Row>
              </Card.Body>

            </Card>
  </Col>*/}

                </Row>
                {isTabletOrMobile ? (<>

                    <Row style={{ marginTop: -40 }}>

                        <Col className="pl-1" md="3">

                            <Card.Title as="h4">báscula</Card.Title>
                            <Card.Title as="h2" style={{ backgroundColor: '#cc444c' }}>
                                <div style={{ justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
                                    {pesostr} kg
                                </div>
                            </Card.Title>
                        </Col>

                        <Col className="pl-1" md="3" >
                            <Card.Title as="h4">Tara</Card.Title>
                            <Card.Title as="h2" style={{ backgroundColor: '#cc444c', }}>
                                <div style={{ justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
                                    {formSearch?.Caso ? formSearch?.Caso == "Entrada" ? pesoNumEnv + " " + "kg" : formSearch?.Caso == "Despacho" ? formSearch?.Tara + " " + "kg" : checkEntrada ? "" : pesoNumEnv + " " + "kg" : checkEntrada ? "0" + " " + "kg" : pesoNumEnv + " " + "kg"}
                                </div>
                            </Card.Title>
                        </Col>

                        <Col className="pl-1" md="3">
                            <Card.Title as="h4">Bruto</Card.Title>
                            <Card.Title as="h2" style={{ backgroundColor: '#cc444c', }}>
                                <div style={{ justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
                                    {formSearch?.Caso ? formSearch?.Caso == "Entrada" ? formSearch?.Bruto + " " + "kg" : formSearch?.Caso == "Despacho" ? pesoNumEnv + " " + "kg" : checkEntrada ? pesoNumEnv : "0" + " " + "kg" : checkEntrada ? pesoNumEnv : "0" + " " + "kg"}
                                </div>
                            </Card.Title>
                        </Col>
                        <Col className="pl-1" md="3" >
                            <Card.Title as="h4">Neto</Card.Title>
                            <Card.Title as="h2" style={{ backgroundColor: '#cc444c' }}>
                                <div style={{ justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
                                    {formSearch?.Caso == "Entrada" ? parseInt(formSearch?.Bruto) - pesoNumEnv + " " + "kg" : formSearch?.Caso == "Despacho" ? pesoNumEnv - parseInt(formSearch?.Tara) + " " + "kg" : "0" + " " + "kg"}
                                </div>
                            </Card.Title>
                        </Col>


                        <Col className="pl-1" md="3" >
                            <Form.Group >
                                <label style={{ fontWeight: 'bold', fontSize: 10 }}>Unidad</label>
                                <Form.Control
                                    style={{ height: 25, height: "5vh", backgroundColor: "#cc444c", color: "#fff" }}
                                    name="unidad"
                                    placeholder="0"
                                    type="number"

                                    disabled={false}
                                    onChange={(e) => cambiarVolumen(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col className="pl-1" md="3" >
                            <Form.Group >
                                <label style={{ fontWeight: 'bold', fontSize: 10 }}>volumen</label>
                                <Form.Control
                                    style={{ height: 25, height: "5vh", backgroundColor: "#cc444c", color: "#fff" }}
                                    name="volumen"
                                    placeholder="0"

                                    disabled={true}

                                    value={volumenEstado}


                                ></Form.Control>

                            </Form.Group>
                        </Col>
                    </Row>





                </>) : (<></>)}
                <Row >
                    <Col md="8"  >
                        <Card style={{ marginTop: '-3.0vh' }}>

                            <Card.Body >


                                {formSearch ? (<>

                                    <tbody>
                                        <tr>
                                            <td>

                                                <Form onSubmit={formik.handleSubmit}>

                                                    <Row>

                                                        <Col className="pr-1" md="3" style={{ marginTop: '-2.0vh' }}>
                                                            <Form.Group  >
                                                                <label style={{ fontWeight: 'bold', fontSize: 10 }}>Placa</label>
                                                                <Form.Control
                                                                    style={{ height: '2vh' }}
                                                                    name="placa"
                                                                    placeholder="placa"
                                                                    type="text"
                                                                    disabled
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.placa}
                                                                    isInvalid={formik.errors.placa}

                                                                ></Form.Control>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col className="px-1" md="3" style={{ marginTop: '-2.0vh' }}>
                                                            <Form.Group>
                                                                <label style={{ fontWeight: 'bold', fontSize: 10 }}>Codigo</label>
                                                                <Form.Control
                                                                    style={{ height: '2vh' }}
                                                                    name="codigo"
                                                                    placeholder="Codigo"
                                                                    type="text"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.codigo}
                                                                    isInvalid={formik.errors.codigo}
                                                                ></Form.Control>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col className="pl-1" md="3" style={{ marginTop: '-2.0vh' }}>
                                                            <Form.Group>
                                                                <label style={{ fontWeight: 'bold', fontSize: 10 }}>No.Interno</label>
                                                                <Form.Control
                                                                    style={{ height: '2vh' }}
                                                                    name="numInterno"
                                                                    placeholder="No.Interno"
                                                                    type="text"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.numInterno}
                                                                    isInvalid={formik.errors.numInterno}
                                                                ></Form.Control>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col className="pl-1" md="3" style={{ marginTop: '-2.0vh' }}>
                                                            <Form.Group>
                                                                <label style={{ fontWeight: 'bold', fontSize: 10 }}>Proceso</label>
                                                                <Form.Control
                                                                    style={{ height: '2vh' }}
                                                                    name="CASO"
                                                                    placeholder="CASO"
                                                                    type="text"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formSearch.Caso}
                                                                    isInvalid={formik.errors.CASO}
                                                                ></Form.Control>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    {checkMccain ? (<>


                                                        <Row>

                                                            <Col className="pr-1" md="3" style={{ marginTop: '-2.0vh' }}>
                                                                <Form.Group  >
                                                                    <label style={{ fontWeight: 'bold', fontSize: 10 }}>Campo 1</label>
                                                                    <Form.Control
                                                                        style={{ height: '2vh' }}
                                                                        name="placa"
                                                                        placeholder="placa"
                                                                        type="text"
                                                                        disabled
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        value={formik.values.campo1}
                                                                        isInvalid={formik.errors.campo1}

                                                                    ></Form.Control>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col className="px-1" md="3" style={{ marginTop: '-2.0vh' }}>
                                                                <Form.Group>
                                                                    <label style={{ fontWeight: 'bold', fontSize: 10 }}>campo2</label>
                                                                    <Form.Control
                                                                        style={{ height: '2vh' }}
                                                                        name="codigo"
                                                                        placeholder="Codigo"
                                                                        type="text"
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        value={formik.values.campo2}
                                                                        isInvalid={formik.errors.campo2}
                                                                    ></Form.Control>
                                                                </Form.Group>
                                                            </Col>

                                                        </Row>


                                                    </>) : (<></>)}

                                                    <Row>
                                                        {dropdownConduc ? (<>

                                                            <Col className="pr-1" md="6" style={{ marginTop: '-3vh' }}>
                                                                <Form.Group>
                                                                    <label style={{ fontWeight: 'bold', fontSize: 10 }}>Conductor</label>
                                                                    <Form.Control
                                                                        style={{ height: '2vh' }}

                                                                        name="conductor"
                                                                        placeholder="Conductor"
                                                                        type="text"
                                                                        onFocus={() => getConduct()}

                                                                        onChange={(text) => filtroConductorF(text.target.value)}

                                                                    ></Form.Control>
                                                                </Form.Group>
                                                            </Col>

                                                            {filtroConductor ? (<>

                                                                <div style={{ height: 300, overflow: 'auto', marginBottom: 10 }}>
                                                                    {filtroConductor.map(
                                                                        (placa) => (
                                                                            <>

                                                                                <li><button key={placa.id} style={{ backgroundColor: '#fff', marginLeft: '4vh', color: '#000' }} variant="info" type="button" onClick={() => guardarFiltroConduct(placa)} >
                                                                                    {placa?.attributes.nombre}
                                                                                </button>
                                                                                </li>
                                                                            </>
                                                                        )
                                                                    )}
                                                                </div>


                                                            </>) : (<>




                                                            </>)}

                                                        </>) : (<>



                                                            <Col className="pr-1" md="3" style={{ marginTop: '-3vh' }}>
                                                                <Form.Group>
                                                                    <label style={{ fontWeight: 'bold', fontSize: 10 }}>Conductor</label>
                                                                    <Form.Control
                                                                        style={{ height: '2vh' }}

                                                                        name="conductor"
                                                                        placeholder="Conductor"
                                                                        type="text"
                                                                        onFocus={() => getConduct()}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}

                                                                        value={formik.values.conductor}
                                                                        isInvalid={formik.errors.conductor}
                                                                    ></Form.Control>
                                                                </Form.Group>
                                                            </Col>


                                                        </>)}



                                                        <Col className="pr-1" md="6" style={{ marginTop: '-2.0vh' }}>
                                                            <Form.Group>
                                                                <label style={{ fontWeight: 'bold', fontSize: 10 }}>Cedula de Ciudadania</label>
                                                                <Form.Control
                                                                    style={{ height: '2vh' }}
                                                                    name="cedulaCiudadania"
                                                                    placeholder="Cedula de Ciudadania"
                                                                    type="text"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.cedulaCiudadania}
                                                                    isInvalid={formik.errors.cedulaCiudadania}
                                                                ></Form.Control>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        {dropdownMateria ? (<>


                                                            <Col className="pr-1" md="4" style={{ marginTop: '-2vh' }}>
                                                                <Form.Group>
                                                                    <label style={{ fontWeight: 'bold', fontSize: 10 }}>Producto/Materia Prima</label>
                                                                    <Form.Control
                                                                        style={{ height: '2vh' }}

                                                                        name="productoMateria"
                                                                        placeholder="Producto/Materia Prima"
                                                                        type="text"
                                                                        onFocus={() => getMateria()}
                                                                        onChange={(text) => filtrarMateria(text.target.value)}

                                                                    ></Form.Control>
                                                                </Form.Group>
                                                            </Col>

                                                            {filtroMateria ? (<>

                                                                <div style={{ height: 300, overflow: 'auto', marginBottom: 10 }}>
                                                                    {filtroMateria.map(
                                                                        (placa) => (
                                                                            <>
                                                                                <h4>{placa.attributes.despachoProducto == true ? "Despacho de producto" : placa.attributes.entradaMateriaPrima == true ? "Entrada materia Prima" : !placa.attributes ? "Api sin señal" : ""}</h4>
                                                                                <li><button key={placa.id} style={{ backgroundColor: '#fff', marginLeft: '4vh', color: '#000' }} variant="info" type="button" onClick={() => guardarFiltroMateria(placa)} >
                                                                                    {placa?.attributes.nombre}
                                                                                </button>
                                                                                </li>
                                                                            </>
                                                                        )
                                                                    )}
                                                                </div>


                                                            </>) : (<></>)}





                                                        </>) : (<>

                                                            <Col className="pr-1" md="4" style={{ marginTop: '-2vh' }}>
                                                                <Form.Group>
                                                                    <label style={{ fontWeight: 'bold', fontSize: 10 }}>Producto/Materia Prima</label>
                                                                    <Form.Control
                                                                        style={{ height: '2vh' }}

                                                                        name="productoMateria"
                                                                        placeholder="Producto/Materia Prima"
                                                                        type="text"
                                                                        onFocus={() => getMateria()}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}

                                                                        value={formik.values.productoMateria}
                                                                        isInvalid={formik.errors.productoMateria}
                                                                    ></Form.Control>
                                                                </Form.Group>
                                                            </Col>



                                                        </>)}
                                                        <Col className="pl-1" md="6" style={{ marginTop: '-2.0vh' }}>
                                                            <Form.Group>
                                                                <label style={{ fontWeight: 'bold', fontSize: 10 }}>Tipo de producto</label>
                                                                <Form.Control
                                                                    style={{ height: '1vh' }}

                                                                    name="tipoProducto"
                                                                    placeholder="Tipo de producto"
                                                                    type="text"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.tipoProducto}
                                                                    isInvalid={formik.errors.tipoProducto}
                                                                ></Form.Control>
                                                            </Form.Group>
                                                        </Col>

                                                    </Row>
                                                    {dropdownPlanta ? (<>


                                                        <Col className="pr-1" md="4" style={{ marginTop: '-2vh' }}>
                                                            <Form.Group>
                                                                <label style={{ fontWeight: 'bold', fontSize: 10 }}>Planta</label>
                                                                <Form.Control
                                                                    style={{ height: '2vh' }}

                                                                    name="planta"
                                                                    placeholder="Planta"
                                                                    type="text"
                                                                    onFocus={() => getPlantas()}
                                                                    onChange={(text) => filtrarPlanta(text.target.value)}

                                                                ></Form.Control>
                                                            </Form.Group>
                                                        </Col>

                                                        {filtroPlanta ? (<>

                                                            <div style={{ height: 300, overflow: 'auto', marginBottom: 10 }}>
                                                                {filtroPlanta.map(
                                                                    (placa) => (
                                                                        <>
                                                                            <h4>{placa.attributes.despachoProducto == true ? "Despacho de producto" : placa.attributes.entradaMateriaPrima == true ? "Entrada materia Prima" : !placa.attributes ? "Api sin señal" : ""}</h4>
                                                                            <li><button key={placa.id} style={{ backgroundColor: '#fff', marginLeft: '4vh', color: '#000' }} variant="info" type="button" onClick={() => guardarFiltroPlanta(placa)} >
                                                                                {placa?.attributes.nombre}
                                                                            </button>
                                                                            </li>
                                                                        </>
                                                                    )
                                                                )}
                                                            </div>


                                                        </>) : (<></>)}





                                                    </>) : (<>

                                                        <Col md="12" style={{ marginTop: '-2vh' }}>
                                                            <Form.Group>
                                                                <label style={{ fontWeight: 'bold', fontSize: 10 }}>Planta</label>
                                                                <Form.Control
                                                                    style={{ height: '2vh' }}

                                                                    name="planta"
                                                                    placeholder="Planta"
                                                                    type="text"
                                                                    onFocus={() => getPlantas()}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}

                                                                    value={formik.values.planta}
                                                                    isInvalid={formik.errors.planta}
                                                                ></Form.Control>
                                                            </Form.Group>
                                                        </Col>



                                                    </>)}
                                                    {dropdownProveedor ? (<>


                                                        <Col className="pr-1" md="4" style={{ marginTop: '-2vh' }}>
                                                            <Form.Group>
                                                                <label style={{ fontWeight: 'bold', fontSize: 10 }}>Cliente/Proveedor</label>
                                                                <Form.Control
                                                                    style={{ height: '2vh' }}

                                                                    name="clienteProveedor"
                                                                    placeholder="Cliente/Proveedor"
                                                                    type="text"
                                                                    onFocus={() => getProveedor()}
                                                                    onChange={(text) => filtrarProveedor(text.target.value)}

                                                                ></Form.Control>
                                                            </Form.Group>
                                                        </Col>

                                                        {filtroProveedor ? (<>

                                                            <div style={{ height: 300, overflow: 'auto', marginBottom: 10 }}>
                                                                {filtroProveedor.map(
                                                                    (placa) => (
                                                                        <>
                                                                            <h4>{placa.attributes.despachoProducto == true ? "Despacho de producto" : placa.attributes.entradaMateriaPrima == true ? "Entrada materia Prima" : !placa.attributes ? "Api sin señal" : ""}</h4>
                                                                            <li><button key={placa.id} style={{ backgroundColor: '#fff', marginLeft: '4vh', color: '#000' }} variant="info" type="button" onClick={() => guardarFiltroProveedor(placa)} >
                                                                                {placa?.attributes.nombre}
                                                                            </button>
                                                                            </li>
                                                                        </>
                                                                    )
                                                                )}
                                                            </div>

                                                        </>) : (<></>)}

                                                    </>) : (<>
                                                        <Row>
                                                            <Col md="12" style={{ marginTop: '-2vh' }}>
                                                                <Form.Group>
                                                                    <label style={{ fontWeight: 'bold', fontSize: 10 }}>Cliente/Proveedor</label>
                                                                    <Form.Control
                                                                        style={{ height: '2vh' }}

                                                                        name="clienteProveedor"
                                                                        placeholder="Cliente/Proveedor"
                                                                        type="text"
                                                                        onFocus={() => getProveedor()}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}

                                                                        value={formik.values.clienteProveedor}
                                                                        isInvalid={formik.errors.clienteProveedor}
                                                                    ></Form.Control>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>


                                                    </>)}

                                                    <Row>
                                                        {dropdownTransportadora ? (<>
                                                            <Col className="pr-1" md="4" style={{ marginTop: '-2vh' }}>
                                                                <Form.Group>
                                                                    <label style={{ fontWeight: 'bold', fontSize: 10 }}>Transportadora</label>
                                                                    <Form.Control
                                                                        style={{ height: '2vh' }}

                                                                        name="transportadora"
                                                                        placeholder="Transportadora"
                                                                        type="text"
                                                                        onFocus={() => getTransportadora()}
                                                                        onChange={(text) => filtrarTransportadora(text.target.value)}
                                                                    ></Form.Control>
                                                                </Form.Group>
                                                            </Col>
                                                            {filtroTransportadora ? (<>
                                                                <div style={{ height: 300, overflow: 'auto', marginBottom: 10 }}>
                                                                    {filtroTransportadora.map(
                                                                        (placa) => (
                                                                            <>
                                                                                <h4>{placa.attributes.despachoProducto == true ? "Despacho de producto" : placa.attributes.entradaMateriaPrima == true ? "Entrada materia Prima" : !placa.attributes ? "Api sin señal" : ""}</h4>
                                                                                <li> <button key={placa.id} style={{ backgroundColor: '#fff', marginLeft: '4vh', color: '#000' }} variant="info" type="button" onClick={() => guardarFiltroTransportadora(placa)} >
                                                                                    {placa?.attributes.nombre}
                                                                                </button>
                                                                                </li>
                                                                            </>
                                                                        )
                                                                    )}
                                                                </div>

                                                            </>) : (<></>)}

                                                        </>) : (<>

                                                            <Col md="12" style={{ marginTop: '-2vh' }}>
                                                                <Form.Group>
                                                                    <label style={{ fontWeight: 'bold', fontSize: 10 }}>Transportadora</label>
                                                                    <Form.Control
                                                                        style={{ height: '2vh' }}

                                                                        name="transportadora"
                                                                        placeholder="Transportadora"
                                                                        type="text"
                                                                        onFocus={() => getTransportadora()}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}

                                                                        value={formik.values.transportadora}
                                                                        isInvalid={formik.errors.transportadora}
                                                                    ></Form.Control>
                                                                </Form.Group>
                                                            </Col>



                                                        </>)}
                                                    </Row>
                                                    <Row>
                                                        <Col className="pr-1" md="5" style={{ marginTop: '-2.0vh' }}>
                                                            <Form.Group>
                                                                <label> Fecha y hora paso vacio </label>
                                                                <Form.Control
                                                                    style={{ height: '2vh' }}

                                                                    name="fecha"
                                                                    placeholder="Fecha Paso Vacio"
                                                                    type="text"
                                                                    disabled
                                                                    value={formSearch?.Caso == "Despacho" ? formSearch.Fecha_Peso_Vacio == "0" || formSearch.Fecha_Peso_Vacio == " " ? fecha2 + "   " + hora2 : formSearch.Fecha_Peso_Vacio : fecha2 + "   " + hora2}
                                                                ></Form.Control>
                                                            </Form.Group>
                                                        </Col>

                                                        <Col className="pr-1" md="5" style={{ marginTop: '-2.0vh' }}>
                                                            <Form.Group>
                                                                <label> Fecha y hora paso lleno</label>
                                                                <Form.Control
                                                                    style={{ height: '2vh' }}

                                                                    name="fecha"
                                                                    placeholder="Fecha Paso Vacio"
                                                                    type="text"
                                                                    disabled
                                                                    value={formSearch?.Caso == "Entrada" ? formSearch.Fecha_Peso_Lleno == "0" || formSearch.Fecha_Peso_Lleno == " " ? fecha2 + "   " + hora2 : formSearch.Fecha_Peso_Lleno : fecha2 + "   " + hora2}
                                                                ></Form.Control>
                                                            </Form.Group>
                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col className="pr-1" md="3s" style={{ marginTop: '-2.0vh' }}>
                                                            <Form.Group>
                                                                <label style={{ fontWeight: 'bold', fontSize: 10 }}>Destino</label>
                                                                <Form.Control
                                                                    style={{ height: '2vh' }}

                                                                    name="destino"
                                                                    placeholder="Destino"
                                                                    type="text"
                                                                    disabled
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.destino}
                                                                    isInvalid={formik.errors.destino}
                                                                ></Form.Control>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    {dropdowncivs ? (<>
                                                        <Col className="pr-1" md="3s" style={{ marginTop: '-2.0vh' }}>
                                                            <Form.Group>
                                                                <label style={{ fontWeight: 'bold', fontSize: 10 }}>Civ</label>
                                                                <Form.Control
                                                                    style={{ height: '2vh' }}

                                                                    name="civ"
                                                                    placeholder="Civ"
                                                                    type="text"
                                                                    onFocus={() => getCiv()}
                                                                    onChange={(text) => filtrarCivs(text.target.value)}
                                                                ></Form.Control>
                                                            </Form.Group>
                                                        </Col>
                                                        {filtroCivs ? (<>
                                                            <div style={{ height: 300, overflow: 'auto', marginBottom: 10 }}>
                                                                {filtroCivs.map(
                                                                    (placa) => (
                                                                        <>
                                                                            <h4>{placa.attributes.despachoProducto == true ? "Despacho de producto" : placa.attributes.entradaMateriaPrima == true ? "Entrada materia Prima" : !placa.attributes ? "Api sin señal" : ""}</h4>
                                                                            <li><button key={placa.id} style={{ backgroundColor: '#fff', marginLeft: '4vh', color: '#000' }} variant="info" type="button" onClick={() => guardarFiltroCivs(placa)} >
                                                                                {placa?.attributes.civ} - {placa?.attributes.nombreEjeVia}
                                                                            </button>
                                                                            </li>
                                                                        </>
                                                                    )
                                                                )}
                                                            </div>

                                                        </>) : (<></>)}

                                                    </>) : (<>

                                                        <Row>
                                                            <Col className="pr-1" md="3s" style={{ marginTop: '-2.0vh' }}>
                                                                <Form.Group>
                                                                    <label style={{ fontWeight: 'bold', fontSize: 10 }}>Civ</label>
                                                                    <Form.Control
                                                                        style={{ height: '2vh' }}

                                                                        name="civ"
                                                                        placeholder="civ"
                                                                        type="text"
                                                                        onFocus={() => getCiv()}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}

                                                                        value={formik.values.civ}
                                                                        isInvalid={formik.errors.civ}
                                                                    ></Form.Control>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>



                                                    </>)}

                                                    <Row>
                                                        <Col className="pr-1" md="3s" style={{ marginTop: '-2.0vh' }}>
                                                            <Form.Group>
                                                                <label style={{ fontWeight: 'bold', fontSize: 10 }}>Dirección</label>

                                                                <Form.Control
                                                                    style={{ height: '2vh' }}

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
                                                    </Row>
                                                    <Row>
                                                        <Col className="pr-1" md="5" style={{ marginTop: '-2.0vh' }}>
                                                            <Form.Group>
                                                                <label style={{ fontWeight: 'bold', fontSize: 10 }}>Entregado Por</label>
                                                                <Form.Control
                                                                    style={{ height: '2vh' }}

                                                                    name="entregadoPor"
                                                                    placeholder="Entregado por"
                                                                    type="text"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.entregadoPor}
                                                                    isInvalid={formik.errors.entregadoPor}
                                                                ></Form.Control>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col className="pr-1" md="5" style={{ marginTop: '-2.0vh' }}>
                                                            <Form.Group>
                                                                <label style={{ fontWeight: 'bold', fontSize: 10 }}>Recibido Por</label>

                                                                <Form.Control
                                                                    style={{ height: '2vh' }}

                                                                    name="recibidoPor"
                                                                    placeholder="Recibido por"
                                                                    type="text"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.recibidoPor}
                                                                    isInvalid={formik.errors.recibidoPor}
                                                                ></Form.Control>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md="12" style={{ marginTop: '-2.0vh' }}>
                                                            <Form.Group>
                                                                <label style={{ fontWeight: 'bold', fontSize: 10 }}>Observaciones</label>

                                                                <Form.Control style={{ height: '2vh' }}
                                                                    name="observaciones"
                                                                    cols="80"
                                                                    placeholder="Observaciones"
                                                                    rows="4"
                                                                    as="textarea"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.observaciones}
                                                                    isInvalid={formik.errors.observaciones}

                                                                ></Form.Control>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <div style={{ display: 'flex', flex: 1 }}>

                                                            <button type="submit" style={{ backgroundColor: '#cc444c', marginLeft: '4vh', color: "white", border: 'none', width: 120, height: 50, borderRadius: 10, marginTop: 10 }} variant="info">
                                                                Despachar
                                                            </button>
                                                        </div>
                                                    </Row>





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


                                </>) : (<>

                                    {entrada ? (<>


                                        <Entrada setEntrada={setEntrada} setFormSearch={setFormSearch} />


                                    </>) : (<>


                                        <Despacho setEntrada={setEntrada} formSearch={formSearch} despacho={despacho} entrada={entrada} checkEntrada={checkEntrada} checkDespacho={checkDespacho} pesoNumEnv={pesoNumEnv} checkMccain={checkMccain} />


                                    </>)}

                                </>)}
                            </Card.Body>

                        </Card>
                    </Col>
                    <Col style={{ marginTop: -40 }} md="2">


                        <Card.Body style={{ height: '20vh', width: '50vh' }}>
                            <div style={{ marginLeft: '4vw' }}
                                className="ct-chart ct-perfect-fourth"
                                id="chartPreferences"
                            >
                                <Card.Title as="h4">báscula</Card.Title>
                                <Card.Title as="h2" style={{ height: '8vh', width: '30vh', backgroundColor: '#cc444c', textAlign: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: '5vh' }}>
                                    <div style={{ justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
                                        {pesostr} kg
                                    </div>
                                </Card.Title>

                            </div>

                            <div style={{ marginLeft: '4vw', marginTop: "-11vw" }}

                            >
                                <div>TARA</div>
                                <Card.Title as="h2" style={{ height: '8vh', width: '30vh', backgroundColor: '#cc444c', textAlign: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: '5vh' }}>
                                    <div style={{ justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
                                        {formSearch?.Caso ? formSearch?.Caso == "Entrada" ? pesoNumEnv + " " + "kg" : formSearch?.Caso == "Despacho" ? formSearch?.Tara + " " + "kg" : checkEntrada ? "" : pesoNumEnv + " " + "kg" : checkEntrada ? "0" + " " + "kg" : pesoNumEnv + " " + "kg"}
                                    </div>
                                </Card.Title>
                                <div>BRUTO</div>
                                <Card.Title as="h2" style={{ height: '8vh', width: '30vh', backgroundColor: '#cc444c', textAlign: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: '5vh' }}>
                                    <div style={{ justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
                                        {formSearch?.Caso ? formSearch?.Caso == "Entrada" ? formSearch?.Bruto + " " + "kg" : formSearch?.Caso == "Despacho" ? pesoNumEnv + " " + "kg" : checkEntrada ? pesoNumEnv : "0" + " " + "kg" : checkEntrada ? pesoNumEnv : "0" + " " + "kg"}
                                    </div>
                                </Card.Title>
                                <div>NETO</div>
                                <Card.Title as="h2" style={{ height: '8vh', width: '30vh', backgroundColor: '#cc444c', textAlign: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: '5vh' }}>
                                    <div style={{ justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
                                        {formSearch?.Caso == "Entrada" ? parseInt(formSearch?.Bruto) - pesoNumEnv + " " + "kg" : formSearch?.Caso == "Despacho" ? pesoNumEnv - parseInt(formSearch?.Tara) + " " + "kg" : "0" + " " + "kg"}
                                    </div>
                                </Card.Title>
                                <Card.Body >
                                    <Col className="pl-1" md="9" style={{ marginTop: "2vh", height: "5vh" }}>
                                        <Form.Group >
                                            <label style={{ fontWeight: 'bold', fontSize: 10 }}>Unidad</label>
                                            <Form.Control
                                                style={{ height: 25, height: "5vh", backgroundColor: "#cc444c", color: "#fff" }}
                                                name="unidad"
                                                placeholder="0"
                                                type="number"

                                                disabled={false}
                                                onChange={(e) => cambiarVolumen(e.target.value)}




                                            ></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col className="pl-1" md="9" style={{ marginTop: "4vh" }}>
                                        <Form.Group >
                                            <label style={{ fontWeight: 'bold', fontSize: 10 }}>volumen</label>
                                            <Form.Control
                                                style={{ height: 25, height: "5vh", backgroundColor: "#cc444c", color: "#fff" }}
                                                name="volumen"
                                                placeholder="0"

                                                disabled={true}

                                                value={volumenEstado}


                                            ></Form.Control>

                                        </Form.Group>

                                    </Col>
                                </Card.Body>

                            </div>
                        </Card.Body>

                    </Col>
                </Row>
                <Row>
                    <Col md="6">

                    </Col>

                </Row>

                {pdf && (<>
                    <Modal Estado={setPdf} Recibo={recibo} Recibo2={recibo2} Peso={pesoNumEnv} Estado2={setPesoActivo} volumenEstado={volumenEstado} unidadEstado={unidadEstado} PesoT={pesoT} PesoG={pesoG} PesoN={pesoN} />
                </>)}
            </Container>
        </>
    );
}

export default Dashboard;
