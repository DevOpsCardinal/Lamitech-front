import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { createEntradaApi } from "API/entrada";
import { useFormik } from "formik";
import useAuth from "hooks/useAuth";
import { getVehiculoApi } from "API/vehiculos";
import { getMateriaPrimaApi } from "API/materiaPrima";
import { getPlantaApi } from "API/planta";
import { getProveedorApi } from "API/proveedor";
import { getTransportadoraApi } from "API/transportadora";
import { getDestinoApi } from "API/destino";
import { getConductoresApi } from "API/conductores";
import { getCivs } from "API/civ";
import { getClienteApi } from "API/cliente";
import moment from "moment/moment";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { createDespachoSalidaApi } from "API/despachoSalida";
import ultimaSalida from "./ultimaSalida";
import Modal2 from "components/modals/Modal";
import {
  Button,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { getProductoApi } from "API/producto";
import { getOrigenApi } from "API/origen";
import Modal from "components/modals/modatPdfTransito";



export default function Despacho({
  setTransito,
  transito,
  despacho,
  entrada,
  pesoNumEnv,
  formSearch,
  checkEntrada,
  checkDespacho,
  checkMccain,
  procesoRecoger,
  procesoDescargar
}) {
  const { auth } = useAuth();
  const isTabletOrMobile = useMediaQuery({ query: "(min-width: 1292px)" });
  const isTabletOrMobile2 = useMediaQuery({ query: "(min-width: 1400px)" });
  const navigate = useNavigate();
  const [vehiculos, setVehiculos] = useState(null);
  const [materiaProducto, setMateriaProducto] = useState(null);
  const [planta, setPlanta] = useState(null);
  const [filtro, setFiltro] = useState(null);

  const [filtro2, setFiltro2] = useState(null);
  /*States para actualizar registros*/

  const [transportadora, setTransportadora] = useState(null);
  const [destinoOrigen, setDestinoOrigen] = useState(null);
  const [conductor, setconductor] = useState(null);
  const [civs, setCivs] = useState(null);
  const [dropdown, setDropdown] = useState(null);
  const [dropdownMateriaProducto, setDropdownMateriaProducto] = useState(null);
  const [filtroMateriaProducto, setFiltroMateriaProducto] = useState(null);
  const [dropdownPlanta, setdropdownPlanta] = useState(null);
  const [filtroPlanta, setfiltroPlanta] = useState(null);
  const [proveedorCliente, setProveedorCliente] = useState(null);
  const [dropdownProveedorCliente, setdropdownProveedorCliente] =
    useState(null);
  const [filtroProveedorCliente, setFiltroProveedorCliente] = useState(null);
  const [dropdownTransportadora, setDropdownTransportadora] = useState(null);
  const [filtroTransportadora, setfiltroTransportadora] = useState(null);
  const [dropwdownDestinoOrigen, setdropwdownDestinoOrigen] = useState(null);
  const [filtroDestinoOrigen, setFiltroDestinoOrigen] = useState(null);
  const [numTiquete, setNumTiquete] = useState(null);
  const [dropdownConduc, setdropdownConduc] = useState(null);
  const [dropdowncivs, setDropdowncivs] = useState(null);
  const [filtroConductor, setFiltroConductor] = useState(null);
  const [filtroCivs, setFiltroCivs] = useState(null);
  const [vehiculosTransito, setVehiculosTransito] = useState(null);
  const [UltimaSalida, setUltimaSalida] = useState(null);


  

  const [pdf, setPdf] = useState(null);

  const [placaTransito, setPlacaTransito] = useState(null);
  

  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hoy = new Date();

  const fecha =
    hoy.getDate() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getFullYear();
  const hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
  const fecha2 = moment().format("L");
  const hora2 = moment().format("LTS");

  let fechaActual;
  let fechaActual2;

  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (month < 10) {
    if (day.length == 1) {
      fechaActual = `0${day}/0${month}/${year}`;
      fechaActual2 = `${year}-0${month}-0${day}`;
    } else {
      fechaActual = `${day}/0${month}/${year}`;
      fechaActual2 = `${year}-0${month}-${day}`;
    }
  } else {
    if (day.length == 1) {
      fechaActual = `0${day}/${month}/${year}`;
      fechaActual2 = `${year}-${month}-0${day}`;
    } else {
      fechaActual = `${day}/${month}/${year}`;
      fechaActual2 = `${year}-${month}-${day}`;
    }
  }

  const mostrarAlertEnvio = () => {
    swal({
      title: "Datos de Despacho ingresados correctamente",
      text: "Los datos son correctos",
      icon: "success",
      button: "Aceptar",
      timer: "3000",
    });
  };

  const getVehiculos = async () => {
    const response = await getVehiculoApi(auth);
    setVehiculos(response?.datos[0].vehiculos);
    setVehiculosTransito(response?.datos[0].transito);

    setDropdown(true);
  };

  const getMateriaProducto = async () => {
    setFiltroMateriaProducto(null);
    if (checkDespacho) {
      const response = await getProductoApi(auth);
      console.log("Producto", response);
      setMateriaProducto(response);
      setDropdownMateriaProducto(true);
    } else if(checkEntrada){
      const response = await getMateriaPrimaApi(auth);
      console.log("Materia", response);

      setMateriaProducto(response);
      setDropdownMateriaProducto(true);
    } else {
      const mostrarAlert = () => {
        swal({
            title: `Debes seleccionar "Ingreso" o "Despacho`,
            text: 'Debes seleccionar "Ingreso" o "Despacho',
            icon: "error",
            button: "Aceptar",
            timer: "3000"
        })
    }
    mostrarAlert()
    }
  };
  const onBlurMateriaProducto = async () => {
      setDropdownMateriaProducto(false);
  };
  const getCiv = async () => {
    const response = await getCivs(auth);
    setCivs(response);
    setDropdowncivs(true);
  };

  const getPlantas = async () => {
    const response = await getPlantaApi(auth);
    setPlanta(response);
    setdropdownPlanta(true);
  };

  const onBlurPlanta = async () => {
    setdropdownPlanta(null);
  };

  const getClienteProveedor = async () => {
    setFiltroProveedorCliente(null);
    if (checkDespacho) {
      const response = await getClienteApi(auth);
      console.log("cliente", response);
      setProveedorCliente(response);
      setdropdownProveedorCliente(true);
    } else if (checkEntrada) {
      const response = await getProveedorApi(auth);
      console.log("Proveedor", response);
      setProveedorCliente(response);
      setdropdownProveedorCliente(true);
    }else {
      const mostrarAlert = () => {
        swal({
            title: `Debes seleccionar "Ingreso" o "Despacho`,
            text: 'Debes seleccionar "Ingreso" o "Despacho',
            icon: "error",
            button: "Aceptar",
            timer: "3000"
        })
    }
    mostrarAlert()
    }
  };

  const onBlurClienteProveedor = async () => {
      setdropdownProveedorCliente(false);
  };

  const getTransportadora = async () => {
    const response = await getTransportadoraApi(auth);
    setTransportadora(response);
    setDropdownTransportadora(true);
  };

  const onBlurTransportadora = async () => {
    setDropdownTransportadora(null);
  };

  const getDestinoOrigen = async () => {
    setFiltroDestinoOrigen(null)
    if(checkDespacho){
      const response = await getDestinoApi(auth);
      console.log("Destino", response);
      setDestinoOrigen(response);
      setdropwdownDestinoOrigen(true);
    }else if(checkEntrada){
      const response = await getOrigenApi(auth);
      console.log("Origen", response);
      setDestinoOrigen(response);
      setdropwdownDestinoOrigen(true);
    }else {
      const mostrarAlert = () => {
        swal({
            title: `Debes seleccionar "Ingreso" o "Despacho`,
            text: 'Debes seleccionar "Ingreso" o "Despacho',
            icon: "error",
            button: "Aceptar",
            timer: "3000"
        })
    }
    mostrarAlert()
    }
    
  };

  const onBlurDestinoOrigen = () =>{
    setdropwdownDestinoOrigen(null);
  }

  const getConduct = async () => {
    const response = await getConductoresApi(auth);
    setconductor(response);

    setdropdownConduc(true);
  };

  const onBlurConduc = async () => {
    setdropdownConduc(false);
  };

  const filtrarMateriaProducto = (query) => {
    const queryLowerCase = query.toString().toLowerCase();
    const result = materiaProducto?.reduce((acc, lista) => {
      const nombreMatches = lista?.Nombre.toString().toLowerCase().includes(queryLowerCase);
      if (nombreMatches && !acc.has(lista.id)) {  // Usa 'id' como clave única
        acc.set(lista.id, lista);  // Ajusta esto si tienes otro identificador único
      }
      return acc;
    }, new Map());
  
    // Convertir el Map en un array para actualizar el estado
    setFiltroMateriaProducto(Array.from(result.values()));
  };

  const filtrarPlanta = (query) => {
    const queryLowerCase = query.toString().toLowerCase();
    const result = planta?.reduce((acc, lista) => {
      const nombreMatches = lista?.Nombre.toString().toLowerCase().includes(queryLowerCase);
      if (nombreMatches && !acc.has(lista.Nombre)) {  // Usa 'id' como clave única
        acc.set(lista.Nombre, lista);  // Ajusta esto si tienes otro identificador único
      }
      return acc;
    }, new Map());
  
    // Convertir el Map en un array para actualizar el estado
    setfiltroPlanta(Array.from(result.values()));
  };

  const filtrarClienteProveedor = (query) => {
    const queryLowerCase = query.toString().toLowerCase();
    const result = proveedorCliente?.reduce((acc, lista) => {
      const nombreMatches = lista?.Nombre.toString().toLowerCase().includes(queryLowerCase);
      if (nombreMatches && !acc.has(lista.Nombre)) {  // Usa 'id' como clave única
        acc.set(lista.Nombre, lista);  // Ajusta esto si tienes otro identificador único
      }
      return acc;
    }, new Map());
  
    // Convertir el Map en un array para actualizar el estado
    setFiltroProveedorCliente(Array.from(result.values()));
  };
  

  /*AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA*/
  const filtrarVehiculos = (query) => {
    const result = vehiculos?.filter(function (lista) {
      // return lista?.Placa.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
      return (
        lista?.Placa.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      );
    });

    setFiltro2(result);

    console.log(result);
  };

  const filtrarVehiculosTransito = (query) => {
    const result2 = vehiculosTransito?.filter(function (lista) {
      return (
        lista?.Placa.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      );
    });

    setFiltro(result2);
    console.log(result2);
  };

  const filtroConductorF = (query) => {
    const queryLowerCase = query.toString().toLowerCase();
    const result = conductor?.reduce((acc, lista) => {
      const nombreMatches = lista?.Nombre.toString().toLowerCase().includes(queryLowerCase);
      const cedulaMatches = lista?.Cedula.toString().toLowerCase().includes(queryLowerCase);
      if ((nombreMatches || cedulaMatches) && !acc.has(lista.Cedula)) {
        acc.set(lista.Cedula, lista);  // Usar Cedula como clave para asegurar unicidad
      }
      return acc;
    }, new Map());
  
    // Convertir el Map en un array para actualizar el estado
    setFiltroConductor(Array.from(result.values()));
  };

  const filtrarTransportadora = (query) => {
    const queryLowerCase = query.toString().toLowerCase();
    const result = transportadora?.reduce((acc, lista) => {
      const nombreMatches = lista?.Nombre.toString().toLowerCase().includes(queryLowerCase);
      if (nombreMatches && !acc.has(lista.id)) {  // Usa 'id' como clave única
        acc.set(lista.id, lista);  // Ajusta esto si tienes otro identificador único
      }
      return acc;
    }, new Map());
  
    // Convertir el Map en un array para actualizar el estado
    setfiltroTransportadora(Array.from(result.values()));
  };

  

  const filtrarDestinoOrigen = (query) => {
    const queryLowerCase = query.toString().toLowerCase();
    const result = destinoOrigen?.reduce((acc, lista) => {
      const nombreMatches = lista?.Nombre.toString().toLowerCase().includes(queryLowerCase);
      if (nombreMatches && !acc.has(lista.Nombre)) {  // Usa 'id' como clave única
        acc.set(lista.Nombre, lista);  // Ajusta esto si tienes otro identificador único
      }
      return acc;
    }, new Map());
  
    // Convertir el Map en un array para actualizar el estado
    setFiltroDestinoOrigen(Array.from(result.values()));
  };

 

  

  const guardarFiltroMateria = (placa) => {
    formik.setFieldValue("productoMateria", placa.Nombre);
    formik.setFieldValue("tipoProducto", placa.Tipo);
    setDropdownMateriaProducto(null);
  };

  const guardarFiltroPlanta = (placa) => {
    formik.setFieldValue("planta", placa.Nombre);
    setdropdownPlanta(null);
  };

  const guardarFiltroCliente = (placa) => {
    console.log("filtro cliente", placa);
    formik.setFieldValue("clienteProveedor", placa.Nombre);
    formik.setFieldValue("nitCliente", placa.NIT);

    setdropdownProveedorCliente(null);
  };

  const guardarFiltroTransportadora = (placa) => {
    formik.setFieldValue("transportadora", placa.Nombre);
    setDropdownTransportadora(null);
  };

  const guardarFiltroDestino = (placa) => {
    console.log("guardarFiltroDestino", placa);
    if(checkDespacho){
      formik.setFieldValue("destino", placa.Nombre);
     
      setdropwdownDestinoOrigen(null);
    } else if(checkEntrada){
      formik.setFieldValue("destino", placa.Nombre);
    
      setdropwdownDestinoOrigen(null);
    }

   
  };

  const guardarFiltroConduct = (placa) => {
    console.log("guardarFiltroConduct");
    formik.setFieldValue("conductor", placa.Nombre);
    formik.setFieldValue("cedulaCiudadania", placa.Cedula);

    setdropdownConduc(null);
  };

 

 

  const heightForm = "5vh";

  // !checkEntrada == Despacho

  const formik = useFormik({
    initialValues: {
      placa: "",
      conductor: "",
      cedulaCiudadania: "",
      nitCliente: "",
      destino: "",
      clienteProveedor: "",
      peso: pesoNumEnv,
      productoMateria: "",
      planta: "",
      transportadora: "",
      observaciones: "",
      n_shipment: "",
      n_sello: "",
      n_R: "",
      n_contenedor: "",
      tara_contenedor: 0,
      responsable: ""

    },
    validationSchema: Yup.object({
      destino: Yup.string(),
      placa: Yup.string().required(),
      peso: Yup.string().required(),
      conductor: Yup.string().required(),
      cedulaCiudadania: Yup.string().required(),
      clienteProveedor: Yup.string().required(),
      productoMateria: Yup.string(),
      planta: Yup.string().required(),
      transportadora: Yup.string().required(),
      observaciones: Yup.string(),
      n_sello: Yup.string().max(300, 'No puede exceder los 300 caracteres'),
      n_shipment: Yup.string(),
      n_R: Yup.string(),
      n_contenedor: Yup.string(),
      tara_contenedor: Yup.number(),
      responsable: Yup.string(),

    }),
    onSubmit: async (formValue) => {
     
      setPlacaTransito(formValue.placa)

      if (formValue.n_sello.length > 300) {
        swal({
          title: 'El campo "sellos" no puede exceder los 300 caracteres',
          icon: "error",
          button: "Aceptar",
        });
        return;
      }
      if (!checkDespacho && !checkEntrada) {
        const mostrarAlert = () => {
          swal({
            title: 'Debes seleccionar "Producto" o "Materia"',
            icon: "error",
            button: "Aceptar",
          });
        };
        mostrarAlert();
        return null;
      }
      const mostrarAlert2 = () => {
        swal({
          title:
            "Parece que el registro ya se encuentra en la base de datos, verifique la información",
          icon: "error",
          button: "Aceptar",
        });
      };

      if (transito) {
        const response = await createDespachoSalidaApi(
          auth,
          formSearch,
          pesoNumEnv,
          formValue,
          checkCredito,
          checkEfectivo
        );
        console.log(response);
        if (response.error) {
          const mostrarAlert = () => {
            swal({
              title: "Despacho Errado",
              icon: "error",
              button: "Aceptar",
              timer: "3000",
            });
          };

          mostrarAlert();
          return null;
        }

        
      } else {
        try {
          const response = await createEntradaApi(
            formValue,
            auth,
            pesoNumEnv,
            checkDespacho,
            checkEntrada,
            procesoRecoger,
            procesoDescargar
          );
          formik.resetForm();
          mostrarAlertEnvio();
          setPdf(true)
        } catch (error) {
          mostrarAlert2();
        }
      }
    },
  });

  const funcionUltimaSalida = () => {
    setUltimaSalida(true)
  }

  return (
    <>
    {pdf ? (<>


      <Modal  pesoNumEnv={pesoNumEnv} setPdf={setPdf} checkDespacho={checkDespacho} checkEntrada={checkEntrada} placa={placaTransito}/>
    </>) : (<>
       {UltimaSalida ? (<>
       
       <Modal2 estado={setUltimaSalida} Component={ultimaSalida}/>
       </>): (<>
       
        <tbody>
        <tr>
          <td>
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                {/* ##/## */}
                <Col md="4">
                  <Form.Group>
                    <label style={{ fontWeight: "bold", fontSize: 10 }}>
                      Placa
                    </label>
                    <Form.Control
                      style={{ height: heightForm, textTransform:'uppercase' }}
                      name="placa"
                      placeholder="Placa"
                      type="text"
                      onChange={(text) => {
                        // Convierte el valor a mayúsculas y actualiza formik
                        const upperCaseValue = text.target.value.toUpperCase();
                        formik.setFieldValue('placa', upperCaseValue);
                      }}
                      onBlur={formik.handleBlur}
                      disabled={formSearch ? true : false}
                      value={
                        formSearch
                          ? formSearch.Placa
                          : formik.values.placa
                      }
                      isInvalid={formik.errors.placa}
                    ></Form.Control>
                  </Form.Group>
                </Col>


                {dropdownConduc ? (
                  <>
                    <Col md="4">
                      <Form.Group>
                        <label style={{ fontWeight: "bold", fontSize: 10 }}>
                          Cedula
                        </label>
                        <Form.Control
                          style={{ height: heightForm, textTransform:'uppercase' }}
                          name="cedulaCiudadania"
                          placeholder="Cedula"
                          type="text"
                          onFocus={() => getConduct()}
                          onBlur={() => { setTimeout(() => {
                            onBlurConduc()
                          }, 500);}}
                          onChange={(text) =>{
                            const upperCaseValue = text.target.value.toUpperCase();
                            formik.setFieldValue("cedulaCiudadania", upperCaseValue)
                            filtroConductorF(text.target.value)
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>

                    {filtroConductor ? (
                      <>
                        <div
                          style={{
                            height: 300,
                            overflow: "auto",
                            marginBottom: 10,
                          }}
                        >
                          {filtroConductor.map((placa) => (
                            <>
                              <li>
                                <button
                                  key={placa.id}
                                  style={{
                                    backgroundColor: "#fff",
                                    marginLeft: "4vh",
                                    color: "#000",
                                  }}
                                  variant="info"
                                  type="button"
                                  onClick={() => guardarFiltroConduct(placa)}
                                >
                                  {placa?.Nombre} {placa.Cedula}
                                </button>
                              </li>
                            </>
                          ))}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <>
                    <Col md="4">
                      <Form.Group>
                        <label style={{ fontWeight: "bold", fontSize: 10 }}>
                          Cedula
                        </label>
                        <Form.Control
                          style={{ height: heightForm }}
                          name="cedulaCiudadania"
                          placeholder="Cedula"
                          type="text"
                          onFocus={() => getConduct()}
                          onChange={(text) => {
                            // Convierte el valor a mayúsculas y actualiza formik
                            const upperCaseValue = text.target.value.toUpperCase();
                            formik.setFieldValue('cedulaCiudadania', upperCaseValue);
                          }}
                          onBlur={formik.handleBlur}
                          disabled={formSearch ? true : false}
                          value={
                            formSearch
                              ? formSearch.Cedula
                              : formik.values.cedulaCiudadania
                          }
                          isInvalid={formik.errors.cedulaCiudadania}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </>
                )}

                <Col md="4">
                  <Form.Group>
                    <label style={{ fontWeight: "bold", fontSize: 10 }}>
                      Conductor
                    </label>
                    <Form.Control
                      style={{ height: heightForm, textTransform:'uppercase' }}
                      name="conductor"
                      placeholder="Conductor"
                      type="text"
                      onChange={(text) => {
                        // Convierte el valor a mayúsculas y actualiza formik
                        const upperCaseValue = text.target.value.toUpperCase();
                        formik.setFieldValue('conductor', upperCaseValue);
                      }}
                      onBlur={formik.handleBlur}
                      disabled={formSearch ? true : false}
                      value={
                        formSearch
                          ? formSearch.Conductor
                          : formik.values.conductor
                      }
                      isInvalid={formik.errors.conductor}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
              {dropdownPlanta ? (
                  <>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label style={{ fontWeight: "bold", fontSize: 10 }}>
                          Planta
                        </label>
                        <Form.Control
                        style={{ height: heightForm, textTransform:'uppercase' }}
                          name="planta"
                          placeholder="Planta"
                          type="text"
                          onFocus={() => getPlantas()}
                          onBlur={() => { setTimeout(() => {
                            onBlurPlanta()
                          }, 500);}}
                          onChange={(text) =>{
                            formik.setFieldValue('planta', text.target.value.toUpperCase());
                            filtrarPlanta(text.target.value.toUpperCase())
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>

                    {filtroPlanta ? (
                      <>
                        <div
                          style={{
                            height: 300,
                            overflow: "auto",
                            marginBottom: 10,
                          }}
                        >
                          {filtroPlanta.map((placa) => (
                            <>
                              <li>
                                <button
                                  key={placa.id}
                                  style={{
                                    backgroundColor: "#fff",
                                    marginLeft: "4vh",
                                    color: "#000",
                                  }}
                                  variant="info"
                                  type="button"
                                  onClick={() => guardarFiltroPlanta(placa)}
                                >
                                  {placa?.Nombre}
                                </button>
                              </li>
                            </>
                          ))}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <>
                    <Col md="4">
                      <Form.Group>
                        <label style={{ fontWeight: "bold", fontSize: 10 }}>
                          Planta
                        </label>
                        <Form.Control
                        style={{ height: heightForm, textTransform:'uppercase' }}
                          name="planta"
                          placeholder="Planta"
                          type="text"
                          onFocus={() => getPlantas()}
                          onChange={(text) =>{
                             
                            formik.setFieldValue('planta', text.target.value.toUpperCase());
                          }}
                          onBlur={formik.handleBlur}
                          disabled={formSearch ? true : false}
                          value={
                            formSearch
                              ? formSearch.Planta
                              : formik.values.planta
                          }
                          isInvalid={formik.errors.planta}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </>
                )}
                
                

                {dropdownProveedorCliente ? (
                  <>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label style={{ fontWeight: "bold", fontSize: 10 }}>
                          {checkDespacho ? "Cliente" : "Proveedor"}
                        </label>
                        <Form.Control
                         style={{ height: heightForm, textTransform:'uppercase' }}
                          name="clienteProveedor"
                          placeholder={checkDespacho ? "Cliente" : "Proveedor"}
                          type="text"
                          onFocus={() => getClienteProveedor()}
                          onBlur={() => { setTimeout(() => {
                            onBlurClienteProveedor()
                          }, 500);}}
                          onChange={(text) =>{
                            const upperCaseValue = text.target.value.toUpperCase();
                            formik.setFieldValue("clienteProveedor", upperCaseValue)
                            filtrarClienteProveedor(text.target.value)
                          }}
                         
                        ></Form.Control>
                      </Form.Group>
                    </Col>

                    {filtroProveedorCliente ? (
                      <>
                        <div
                          style={{
                            height: 300,
                            overflow: "auto",
                            marginBottom: 10,
                          }}
                        >
                          {filtroProveedorCliente.map((placa) => (
                            <>
                              <li>
                                <button
                                  key={placa.id}
                                  style={{
                                    backgroundColor: "#fff",
                                    marginLeft: "4vh",
                                    color: "#000",
                                  }}
                                  variant="info"
                                  type="button"
                                  onClick={() => guardarFiltroCliente(placa)}
                                >
                                  {placa?.Nombre}
                                </button>
                              </li>
                            </>
                          ))}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <>
                    <Col md="4">
                      <Form.Group>
                        <label style={{ fontWeight: "bold", fontSize: 10 }}>
                          {checkDespacho ? "Cliente" : "Proveedor"}
                        </label>
                        <Form.Control
                         style={{ height: heightForm, textTransform:'uppercase' }}
                          name="clienteProveedor"
                          placeholder={checkDespacho ? "Cliente" : "Proveedor"}
                          type="text"
                          onFocus={() => getClienteProveedor()}
                          onChange={(text) =>{
                            const upperCaseValue = text.target.value.toUpperCase();
                            formik.setFieldValue("clienteProveedor", upperCaseValue)
                          }}
                          onBlur={formik.handleBlur}
                          disabled={formSearch ? true : false}
                          value={
                            formSearch
                              ? formSearch.Cliente_Proveedor
                              : formik.values.clienteProveedor
                          }
                          isInvalid={formik.errors.clienteProveedor}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </>
                )}

                {dropwdownDestinoOrigen ? (
                  <>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label style={{ fontWeight: "bold", fontSize: 10 }}>
                          {checkDespacho ? "Destino" : "Origen"}
                        </label>
                        <Form.Control
                        style={{ height: heightForm, textTransform:'uppercase' }}
                          name="destino"
                          placeholder={checkDespacho ? "Destino" : "Origen"}
                          type="text"
                          onFocus={() => getDestinoOrigen()}
                          onBlur={() => { setTimeout(() => {
                            onBlurDestinoOrigen()
                          }, 500);}}
                          onChange={(text) =>{
                            const upperCaseValue = text.target.value.toUpperCase();
                            formik.setFieldValue("destino", upperCaseValue)
                            filtrarDestinoOrigen(text.target.value)
                          }}
                          
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    {filtroDestinoOrigen ? (
                      <>
                        <div
                          style={{
                            height: 300,
                            overflow: "auto",
                            marginBottom: 10,
                          }}
                        >
                          {filtroDestinoOrigen.map((placa) => (
                            <>
                              <li>
                                <button
                                  key={placa.id}
                                  style={{
                                    backgroundColor: "#fff",
                                    marginLeft: "4vh",
                                    color: "#000",
                                  }}
                                  variant="info"
                                  type="button"
                                  onClick={() => guardarFiltroDestino(placa)}
                                >
                                  {placa?.Nombre}
                                </button>
                              </li>
                            </>
                          ))}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <>
                    <Col md="4">
                      <Form.Group>
                        <label style={{ fontWeight: "bold", fontSize: 10 }}>
                        {checkDespacho ? "Destino" : "Origen"}
                        </label>
                        <Form.Control
                         style={{ height: heightForm, textTransform:'uppercase' }}
                          name="destino"
                          placeholder={checkDespacho ? "Destino" : "Origen"}
                          type="text"
                          onFocus={() => getDestinoOrigen()}
                          onChange={(text) =>{
                            const upperCaseValue = text.target.value.toUpperCase();
                            formik.setFieldValue("destino", upperCaseValue)
                          }}
                          onBlur={formik.handleBlur}
                          disabled={formSearch ? true : false}
                          value={
                            formSearch
                              ? formSearch.Origen_Destino
                              : formik.values.destino
                          }
                          isInvalid={formik.errors.destino}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </>
                )}

              </Row>
              <Row>
                {dropdownMateriaProducto ? (
                  <>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label style={{ fontWeight: "bold", fontSize: 10 }}>
                          {checkDespacho ? "Producto" : "Materia Prima"}
                        </label>
                        <Form.Control
                         style={{ height: heightForm, textTransform:'uppercase' }}
                          name="productoMateria"
                          placeholder={
                            checkDespacho ? "Producto" : "Materia Prima"
                          }
                          type="text"
                          onFocus={() => getMateriaProducto()}
                          onBlur={() => { setTimeout(() => {
                            onBlurMateriaProducto()
                          }, 500);}}
                          onChange={(text) =>{
                            const upperCaseValue = text.target.value.toUpperCase();
                            formik.setFieldValue("productoMateria", upperCaseValue)
                            filtrarMateriaProducto(text.target.value)
                          }}
                          
                        ></Form.Control>
                      </Form.Group>
                    </Col>

                    {filtroMateriaProducto ? (
                      <>
                        <div
                          style={{
                            height: 300,
                            overflow: "auto",
                            marginBottom: 10,
                          }}
                        >
                          {filtroMateriaProducto.map((placa) => (
                            <>
                              <li>
                                <button
                                  key={placa.id}
                                  style={{
                                    backgroundColor: "#fff",
                                    marginLeft: "4vh",
                                    color: "#000",
                                  }}
                                  variant="info"
                                  type="button"
                                  onClick={() => guardarFiltroMateria(placa)}
                                >
                                  {placa?.Nombre}
                                </button>
                              </li>
                            </>
                          ))}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label style={{ fontWeight: "bold", fontSize: 10 }}>
                          {checkDespacho ? "Producto" : "Materia Prima"}
                        </label>
                        <Form.Control
                          style={{ height: heightForm, textTransform:'uppercase' }}
                          name="productoMateria"
                        
                          placeholder={
                            checkDespacho ? "Producto" : "Materia Prima"
                          }
                          type="text"
                          onFocus={() => getMateriaProducto()}
                          onChange={(text) =>{
                            const upperCaseValue = text.target.value.toUpperCase();
                            formik.setFieldValue("productoMateria", upperCaseValue)
                          }}
                          onBlur={formik.handleBlur}
                      
                          value={
                            formSearch
                              ? formSearch.Materia_Prima
                              : formik.values.productoMateria
                          }
                          isInvalid={formik.errors.productoMateria}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </>
                )}

                {dropdownTransportadora ? (
                  <>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label style={{ fontWeight: "bold", fontSize: 10 }}>
                          Transportadora
                        </label>
                        <Form.Control
                          style={{ height: heightForm, textTransform:'uppercase' }}
                          name="transportadora"
                          placeholder="Transportadora"
                          type="text"
                          onFocus={() => getTransportadora()}
                          onBlur={() => { setTimeout(() => {
                            onBlurTransportadora()
                          }, 500);}}
                          onChange={(text) =>{
                            const upperCaseValue = text.target.value.toUpperCase();
                            formik.setFieldValue("transportadora", upperCaseValue)
                            filtrarTransportadora(text.target.value)
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    {filtroTransportadora ? (
                      <>
                        <div
                          style={{
                            height: 300,
                            overflow: "auto",
                            marginBottom: 10,
                          }}
                        >
                          {filtroTransportadora.map((placa) => (
                            <>
                              <li>
                                <button
                                  key={placa.id}
                                  style={{
                                    backgroundColor: "#fff",
                                    marginLeft: "4vh",
                                    color: "#000",
                                  }}
                                  variant="info"
                                  type="button"
                                  onClick={() =>
                                    guardarFiltroTransportadora(placa)
                                  }
                                >
                                  {placa?.Nombre}
                                </button>
                              </li>
                            </>
                          ))}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <>
                    <Col md="4">
                      <Form.Group>
                        <label style={{ fontWeight: "bold", fontSize: 10 }}>
                          Transportadora
                        </label>
                        <Form.Control
                         style={{ height: heightForm, textTransform:'uppercase' }}
                          name="transportadora"
                          placeholder="Transportadora"
                          type="text"
                          onFocus={() => getTransportadora()}
                          onChange={(text) =>{
                            const upperCaseValue = text.target.value.toUpperCase();
                            formik.setFieldValue("transportadora", upperCaseValue)
                          }}
                          onBlur={formik.handleBlur}
                          disabled={formSearch ? true : false}
                          value={
                            formSearch
                              ? formSearch.Transportadora
                              : formik.values.transportadora
                          }
                          isInvalid={formik.errors.transportadora}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </>
                )}

                <Col md="4">
                  <Form.Group>
                    <label style={{ fontWeight: "bold", fontSize: 10 }}>
                      {checkDespacho == true
                        ? "Fecha y hora paso vacio"
                        : checkDespacho == false
                        ? "Fecha y hora paso Lleno"
                        : "fecha"}
                    </label>
                    <Form.Control
                      style={{ height: heightForm }}
                      name="fechaPesoVacio"
                      placeholder="Fecha Paso Vacio"
                      type="text"
                      disabled
                      value={fecha2 + " " + hora2}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
              <Col md="4">
                      <Form.Group>
                        <label style={{ fontWeight: "bold", fontSize: 10 }}>
                          Tara Contenedor
                        </label>
                        <Form.Control
                          style={{ height: heightForm, textTransform:'uppercase' }}
                          name="tara_contenedor"
                          placeholder="Tara contenedor"
                          type="number"
                          onChange={(text) =>{
                            const upperCaseValue = text.target.value.toUpperCase();
                            formik.setFieldValue("tara_contenedor", upperCaseValue)
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>

                    <Col md="4">
                      <Form.Group>
                        <label style={{ fontWeight: "bold", fontSize: 10 }}>
                          Responsable
                        </label>
                        <Form.Control
                          style={{ height: heightForm, textTransform:'uppercase' }}
                          name="responsable"
                          placeholder="Responsable"
                          type="text"
                          onChange={(text) =>{
                            const upperCaseValue = text.target.value.toUpperCase();
                            formik.setFieldValue("responsable", upperCaseValue)
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
              </Row>

             
              <h4 style={{ textAlign: "center", fontSize: 20 }}>Datos de carga</h4>
              <Row>
                
                 
                    {/* campos de Entrada de Materia */}

                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label style={{ fontWeight: "bold", fontSize: 10 }}>
                          Identificador
                        </label>
                        <Form.Control
                          style={{ height: heightForm }}
                          name="n_shipment"
                          placeholder="Identificador"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.n_shipment}
                          isInvalid={formik.errors.n_shipment}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                
             
             
                   

                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label style={{ fontWeight: "bold", fontSize: 10 }}>
                          # Sello
                        </label>
                        <Form.Control
                          style={{ height: heightForm }}
                          name="n_sello"
                          placeholder="N Sello"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.n_sello}
                          isInvalid={formik.errors.n_sello}
                        ></Form.Control>
                      </Form.Group>
                    </Col>

                   
                
             
              </Row>
              <Row>
              <Col className="pr-1" md="6">
                      <Form.Group>
                        <label style={{ fontWeight: "bold", fontSize: 10 }}>
                          # Trailer
                        </label>
                        <Form.Control
                          style={{ height: heightForm }}
                          name="n_R"
                          placeholder="Trailer"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.n_R}
                          isInvalid={formik.errors.n_R}
                        ></Form.Control>
                      </Form.Group>
                    </Col>

                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label style={{ fontWeight: "bold", fontSize: 10 }}>
                          # Contenedor
                        </label>
                        <Form.Control
                          style={{ height: heightForm }}
                          name="n_contenedor"
                          placeholder="N_Contenedor"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.n_contenedor}
                          isInvalid={formik.errors.n_contenedor}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
              </Row>

              {/* */}

              <Row>
                <Col md="12">
                  <Form.Group>
                    <label style={{ fontWeight: "bold", fontSize: 10 }}>
                      Observaciones
                    </label>
                    <Form.Control
                      style={{ height: heightForm }}
                      name="observaciones"
                      cols="80"
                      placeholder="Observaciones"
                      rows="4"
                      as="textarea"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={formSearch ? true : false}
                      value={
                        formSearch
                          ? formSearch.Observaciones
                          : formik.values.observaciones || ""
                      }
                      // isInvalid={formik.errors.observaciones}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <>
                <Button
                  type="submit"
                  style={{
                    marginTop: "1vh",
                    backgroundColor: "#cc444c",
                    marginLeft: "4vh",
                    border: "none",
                    color: "white",
                  }}
                  variant="info"
                >
                  Poner en Transito
                </Button>
              </>

              <>
                <Button
                  onClick={() => funcionUltimaSalida()}
                  style={{
                    marginTop: "1vh",
                    backgroundColor: "#cc444c",
                    marginLeft: "4vh",
                    border: "none",
                    color: "white",
                  }}
                  variant="info"
                >
                  Ultima salida
                </Button>
              </>
            </Form>
          </td>
        </tr>
      </tbody>
      <div style={{ position: "relative" }}></div>
       
       </>)}
      </>)}
    </>
    
  );
}
