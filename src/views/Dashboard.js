import React, { useState, useEffect, useRef } from "react";
import useAuth from "hooks/useAuth";
import swal from "sweetalert";
import Despacho from "components/forms/Despacho";
import Entrada from "components/forms/Entrada";
import { createDespachoSalidaApi } from "API/despachoSalida";
import socketIOCliente from "socket.io-client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createMateriPrimaSalidaApi } from "API/ingresos";
import Modal from "components/modals/ModalPdf";
import { getConductoresApi } from "API/conductores";
import { getMateriaPrimaApi } from "API/materiaPrima";
import { getPlantaApi } from "API/planta";
import { getClienteApi } from "API/cliente";
import { getTransportadoraApi } from "API/transportadora";
import { getCivs } from "API/civ";
import { useNavigate } from "react-router-dom";
import { getTrama } from "API/configuraciones";
import { useMediaQuery } from "react-responsive";
import { getDestinoApi } from "API/destino";


let pesoT;
let pesoG;
let pesoN;

// react-bootstrap components
import {
  Card,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { getProductoApi } from "API/producto";
import { getProveedorApi } from "API/proveedor";
import { getOrigenApi } from "API/origen";
import { getBasculas } from "API/configuraciones";

function Dashboard() {
  const { auth } = useAuth();
  const isTabletOrMobile2 = useMediaQuery({ query: "(min-width: 1400px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1292px)" });
  const navigate = useNavigate();

  let result;
  const [trama, setTrama] = useState("null");
  const [peso, setPeso] = useState(null);
  const [peso2, setPeso2] = useState(null);
  const [despacho, setDespacho] = useState(false);
  const [entrada, setEntrada] = useState(false);
  const [formSearch, setFormSearch] = useState([]);
  const [checkEntrada, setCheckEntrada] = useState(null);
  const [checkDespacho, setCheckDespacho] = useState(null);
  const [checkMccain, setCheckMccain] = useState(false);
  const [checkCredito, setCheckCredito] = useState(false);
  const [checkEfectivo, setCheckEfectivo] = useState(true);
  const [stateBascula1, setStateBascula1] = useState(null);
  const [stateBascula2, setStateBascula2] = useState(null);

  const [materiaPrima, setMateriaPrima] = useState(null);
  const [checkDespachoFin, setCheckDespachoFin] = useState(null);
  const [modalConstructor, setModalConstructor] = useState(null);
  const [fecha, setFecha] = useState(null);
  const [hora, setHora] = useState(null);
  const [volumenEstado, setVolumenEstado] = useState(null);
  const [unidadEstado, setUnidadEstado] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [recibo, setRecibo] = useState(null);
  const [recibo2, setRecibo2] = useState(true);
  const [transito, setTransito] = useState(null);

  ///////////
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [vehiculos, setVehiculos] = useState(null);
  const [materiaProducto, setMateriaProducto] = useState(null);
  const [planta, setPlanta] = useState(null);
  const [filtro, setFiltro] = useState(null);
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
  const [pesoActivo, setPesoActivo] = useState(null);
  const [dosBasculas, setDosBasculas] = useState(null);
  const [taraContendor, setTaraContendor] = useState(0);
  const [procesoRecoger, setProcesoRecoger] = useState(false);
  const [procesoDescargar, setProcesoDescargar] = useState(false);



  
  



  const [caso, setCaso] = useState(null);

  // if(stateBascula2 == true){
  //   setStateBascula1(null)
  // }

  const socket = useRef();

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
    setVehiculos(response);
    setDropdown(true);
  };

  const getMateriaProducto = async () => {
    setFiltroMateriaProducto(null);
    if (checkDespacho) {
      const response = await getProductoApi(auth);
      console.log("Producto", response);
      setMateriaProducto(response);
      setDropdownMateriaProducto(true);
    } else {
      const response = await getMateriaPrimaApi(auth);
      console.log("Materia", response);

      setMateriaProducto(response);
      setDropdownMateriaProducto(true);
    }
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

  const getProveedor = async () => {
    const response = await getClienteApi(auth);
    setProveedor(response);
    setdropdownProveedor(true);
  };

  const getTransportadora = async () => {
    const response = await getTransportadoraApi(auth);
    setTransportadora(response);
    setDropdownTransportadora(true);
  };

  const onBlurTransportadora = async () => {
    setDropdownTransportadora(null);
  };

  const bascula1 = () => {
    if (stateBascula1 == true) {
      setStateBascula1(null);
    } else {
      setStateBascula2(null);
      setStateBascula1(true);
    }
  };

  const bascula2 = () => {
    if (stateBascula2 == true) {
      setStateBascula2(null);
    } else {
      setStateBascula1(null);
      setStateBascula2(true);
    }
  };

  const getDestinoOrigen = async () => {
    setFiltroDestinoOrigen(null);
    if (formSearch.Caso == "Despacho") {
      const response = await getDestinoApi(auth);
      console.log("Destino", response);
      setDestinoOrigen(response);
      setdropwdownDestinoOrigen(true);
    } else if (formSearch.Caso == "Ingreso") {
      const response = await getOrigenApi(auth);
      console.log("Origen", response);
      setDestinoOrigen(response);
      setdropwdownDestinoOrigen(true);
    }
  };

  const onBlurDestinoOrigen = () => {
    setdropwdownDestinoOrigen(null);
  };

  const getConduct = async () => {
    const response = await getConductoresApi(auth);
    setconductor(response);
    setdropdownConduc(true);
  };

  const filtrarMateriaProducto = (query) => {
    const queryLowerCase = query.toString().toLowerCase();
    const result = materiaProducto?.reduce((acc, lista) => {
      const nombreMatches = lista?.Nombre.toString()
        .toLowerCase()
        .includes(queryLowerCase);
      if (nombreMatches && !acc.has(lista.id)) {
        // Usa 'id' como clave única
        acc.set(lista.id, lista); // Ajusta esto si tienes otro identificador único
      }
      return acc;
    }, new Map());

    // Convertir el Map en un array para actualizar el estado
    setFiltroMateriaProducto(Array.from(result.values()));
  };

  const onBlurMateriaProducto = async () => {
    setDropdownMateriaProducto(false);
  };

  const filtrarPlanta = (query) => {
    const queryLowerCase = query.toString().toLowerCase();
    const result = planta?.reduce((acc, lista) => {
      const nombreMatches = lista?.Nombre.toString()
        .toLowerCase()
        .includes(queryLowerCase);
      if (nombreMatches && !acc.has(lista.Nombre)) {
        // Usa 'id' como clave única
        acc.set(lista.Nombre, lista); // Ajusta esto si tienes otro identificador único
      }
      return acc;
    }, new Map());

    // Convertir el Map en un array para actualizar el estado
    setfiltroPlanta(Array.from(result.values()));
  };

  const filtrarClienteProveedor = (query) => {
    const queryLowerCase = query.toString().toLowerCase();
    const result = proveedorCliente?.reduce((acc, lista) => {
      const nombreMatches = lista?.Nombre.toString()
        .toLowerCase()
        .includes(queryLowerCase);
      if (nombreMatches && !acc.has(lista.Nombre)) {
        // Usa 'id' como clave única
        acc.set(lista.Nombre, lista); // Ajusta esto si tienes otro identificador único
      }
      return acc;
    }, new Map());

    // Convertir el Map en un array para actualizar el estado
    setFiltroProveedorCliente(Array.from(result.values()));
  };

  const getClienteProveedor = async () => {
    console.log("funcion cliente");
    setFiltroProveedorCliente(null);
    if (formSearch?.Caso == "Despacho") {
      const response = await getClienteApi(auth);
      console.log("cliente", response);
      setProveedorCliente(response);
      setdropdownProveedorCliente(true);
    } else if (formSearch?.Caso == "Ingreso") {
      const response = await getProveedorApi(auth);
      console.log("Proveedor", response);
      setProveedorCliente(response);
      setdropdownProveedorCliente(true);
    }
  };

  const onBlurClienteProveedor = async () => {
    setdropdownProveedorCliente(false);
  };

  const filtrarVehiculos = (query) => {
    const result = vehiculos?.data.filter(function (lista) {
      return (
        lista?.attributes.placa
          .toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      );
    });
    setFiltro(result);
  };

  const filtroConductorF = (query) => {
    const queryLowerCase = query.toString().toLowerCase();
    const result = conductor?.reduce((acc, lista) => {
      const nombreMatches = lista?.Nombre.toString()
        .toLowerCase()
        .includes(queryLowerCase);
      const cedulaMatches = lista?.Cedula.toString()
        .toLowerCase()
        .includes(queryLowerCase);
      if ((nombreMatches || cedulaMatches) && !acc.has(lista.Cedula)) {
        acc.set(lista.Cedula, lista); // Usar Cedula como clave para asegurar unicidad
      }
      return acc;
    }, new Map());

    // Convertir el Map en un array para actualizar el estado
    setFiltroConductor(Array.from(result.values()));
  };

  const filtrarTransportadora = (query) => {
    const result = transportadora?.filter(function (lista) {
      return (
        lista?.Nombre.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      );
    });
    setfiltroTransportadora(result);
  };

  const filtrarDestinoOrigen = (query) => {
    const queryLowerCase = query.toString().toLowerCase();
    const result = destinoOrigen?.reduce((acc, lista) => {
      const nombreMatches = lista?.Nombre.toString()
        .toLowerCase()
        .includes(queryLowerCase);
      if (nombreMatches && !acc.has(lista.Nombre)) {
        // Usa 'id' como clave única
        acc.set(lista.Nombre, lista); // Ajusta esto si tienes otro identificador único
      }
      return acc;
    }, new Map());

    // Convertir el Map en un array para actualizar el estado
    setFiltroDestinoOrigen(Array.from(result.values()));
  };

  const filtrarCivs = (query) => {
    const result = civs?.data.filter(function (lista) {
      return (
        lista?.attributes.civ
          .toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      );
    });
    setFiltroCivs(result);
  };

  const guardarFiltro = (placa) => {
    formik.setFieldValue("placa", placa.attributes.placa);
    formik.setFieldValue("codigo", placa.attributes.codigo);
    formik.setFieldValue("numInterno", placa.attributes.noInterno);
    formik.setFieldValue("tipoVehiculo", placa.attributes.volumenVehiculo);

    setDropdown(null);
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


    setdropdownProveedorCliente(null);
  };

  const guardarFiltroTransportadora = (placa) => {
    formik.setFieldValue("transportadora", placa.Nombre);
    setDropdownTransportadora(null);
  };
  const onBlurConduc = async () => {
    setdropdownConduc(false);
  };

  const guardarFiltroDestino = (placa) => {
    console.log("guardarFiltroDestino", placa);
    if (formSearch?.Caso == "Despacho") {
      formik.setFieldValue("destino", placa.Nombre);
      formik.setFieldValue("productoMateria", "");
      setdropwdownDestinoOrigen(null);
    } else if (formSearch?.Caso == "Ingreso") {
      formik.setFieldValue("destino", placa.Nombre);
      formik.setFieldValue("productoMateria", placa.Materia_Prima_Certificada);
      setdropwdownDestinoOrigen(null);
    }
  };

  const guardarFiltroConduct = (placa) => {
    formik.setFieldValue("conductor", placa.Nombre);
    formik.setFieldValue("cedulaCiudadania", placa.Cedula);

    setdropdownConduc(null);
  };

 

  


  const formik = useFormik({
    initialValues: {
      placa: "",
      conductor: "",
      cedulaCiudadania: "",
      destino: "",
      clienteProveedor: "",
      productoMateria: "",
      planta: "",
      transportadora: "",
      observaciones: "",
      n_shipment: "",
      n_sello: "",
      n_R: "",
      n_contenedor: "",
      tara_contenedor: 0,
      responsable: "",
      proceso: procesoRecoger ? 'Recoger_Trailer': procesoDescargar ? 'Descargar_Trailer': '',
      fecha_entrada: ""
    },
    validationSchema: Yup.object({
      destino: Yup.string(),
      placa: Yup.string().required(),
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
      tara_contenedor:  Yup.number(),
      responsable:  Yup.string(),
      proceso: Yup.string(),
      fecha_entrada: Yup.string(),
    }),
    onSubmit: async (formValue) => {
      console.log("formValue", formValue);
      if (formSearch?.Caso == "Despacho") {
        console.log("formSearch", formSearch);
        console.log("formValue", formValue);
        const response = await createDespachoSalidaApi(
          auth,
          formSearch,
          pesoNumEnv,
          formValue,
          procesoRecoger,
          procesoDescargar
        );

        pesoT = formSearch?.Tara;
        pesoG = pesoNumEnv;
        pesoN = pesoNumEnv - parseInt(formSearch?.Tara);

        setRecibo2(formValue);
        setRecibo(formSearch);

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

       
       
        if (parseInt(pesoN) < 0) {
          
          const mostrarAlert = () => {
            swal({
              title:
                "Realizaste un mal proceso, el sistema recalculo los pesos",
              icon: "success",
              button: "Aceptar",
              timer: "3000",
            });
          };
          mostrarAlert();
          formik.resetForm();
          setPdf(true);
        } else {
          formik.resetForm();
          setPdf(true);
          const mostrarAlert = () => {
            swal({
              title: "Despacho Exitoso",
              icon: "success",
              button: "Aceptar",
              timer: "3000",
            });
          };
          mostrarAlert();
        }
      } else {
        //  ####/###

        const response = await createMateriPrimaSalidaApi(
          auth,
          formSearch,
          pesoNumEnv,
          formValue,
          procesoRecoger,
          procesoDescargar
        );

      
        
       

        pesoT = pesoNumEnv;
        pesoG = formSearch.Bruto;
        pesoN = parseInt(formSearch?.Bruto) - pesoNumEnv;
       
        // alert('respuesta del back')

        setRecibo2(formValue);
        setRecibo(formSearch);

        setFormSearch(null);

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
        
        if (parseInt(pesoN) < 0) {
          formik.resetForm();
          setPdf(true);
          const mostrarAlert = () => {
            swal({
              title:
                "Realizaste un mal proceso, el sistema recalculo los pesos",
              icon: "success",
              button: "Aceptar",
              timer: "3000",
            });
          };
          mostrarAlert();
        } else {
          formik.resetForm();
          setPdf(true);
          const mostrarAlert = () => {
            swal({
              title: "Despacho Exitoso",
              icon: "success",
              button: "Aceptar",
              timer: "3000",
            });
          };
          mostrarAlert();
        }
      }
    },
  });

  useEffect(() => {
    (async () => {
      const response = await getTrama(auth);
      console.log("getTrama", response);
      response[0].Valor ? setTrama(response[0].Valor) : setTrama("null");
      const responseBasculas = await getBasculas(auth)
      if(responseBasculas[0]?.Valor == "1"){
        setDosBasculas(true)
      }else {
        setStateBascula1(true)
      }
      setPeso(null);

      
    })();

    const traerPeso = () => {
      socket.current = socketIOCliente("http://localhost:3001");
      socket.current.on("datos_socket", (data) => {

      });
      socket.current.on("peso", (data) => {
   
        setPeso(data);
      });

      socket.current.on("peso2", (data) => {

        setPeso2(data);
      });
      return () => {
        socket.disconnect();
        socket.disconnect();
      };
    };

    traerPeso();

    if (formSearch) {
      if(formSearch.Caso == "Ingreso"){
        setCheckDespachoFin(false);
        setCheckEntrada(true);
        setCheckDespacho(false);

       
       
      
      }else {
        setCheckDespachoFin(false);
        setCheckEntrada(false);
        setCheckDespacho(true);
      
      }
      const formulario = () => {
        formik.setFieldValue("tiqueteNum", formSearch.No_Tiquete);
        formik.setFieldValue("placa", formSearch.Placa);
        formik.setFieldValue("conductor", formSearch.Conductor);
        formik.setFieldValue("cedulaCiudadania", formSearch.Cedula);
        formik.setFieldValue(
          "productoMateria",
          formSearch.MateriaPrima_Producto
        );
        formik.setFieldValue("planta", formSearch.Planta);
        formik.setFieldValue("clienteProveedor", formSearch.Cliente_Proveedor);
        formik.setFieldValue("transportadora", formSearch.Transportadora);
        formik.setFieldValue("observaciones", formSearch.Observaciones);
        formik.setFieldValue("transportadora", formSearch.Transportadora);
        formik.setFieldValue("destino", formSearch.Origen_Destino);
        formik.setFieldValue("n_sello", formSearch.No_Sello);
        formik.setFieldValue("n_R", formSearch.No_R);
        formik.setFieldValue("n_contenedor", formSearch.No_Contenedor);
        formik.setFieldValue("n_shipment", formSearch.No_Shipment);
        formik.setFieldValue("tara_contenedor", formSearch.Tara_Contenedor);
        formik.setFieldValue("responsable", formSearch.Responsable);
        formik.setFieldValue("fecha_entrada", formSearch.Fecha_Entrada);


        setTaraContendor(formSearch.Tara_Contenedor)


        setCaso(formSearch.Caso);
      };

      formulario();
    }
  }, [formSearch]);

  const hoy = new Date();
  const hora2 =
    hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();

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

  let newStr;
  let newStr2;
  let pesostr;
  let pesoSalida;

  if (trama == "Cardinal SMA") {
    console.log("Peso", peso);
    newStr =
      stateBascula1 == true
        ? peso?.toString().slice(1, -3)
        : peso2?.toString().slice(1, -3);
    newStr2 = newStr?.substring(5);
    pesostr = newStr2?.split(/\s+/).join("");

    pesoSalida =
      stateBascula1 == true
        ? peso?.toString().substring(3).split(/\s+/).join("")
        : peso2?.toString().substring(3).split(/\s+/).join("");
  } else if (trama == "Rice Lake IQ355") {
    newStr =
      stateBascula1 == true
        ? peso?.toString().slice(1, -3)
        : peso2?.toString().slice(1, -3);
    newStr2 = newStr?.substring(1);
    pesostr = newStr2?.split(/\s+/).join("");

    pesoSalida =
      stateBascula1 == true
        ? peso?.toString().substring(3).split(/\s+/).join("")
        : peso2?.toString().substring(3).split(/\s+/).join("");
  } else if (trama == "Cardinal SB-200") {
    newStr =
      stateBascula1 == true
        ? peso?.toString().slice(1, -10)
        : peso2?.toString().slice(1, -10);
    newStr2 = newStr?.substring(1);
    pesostr = newStr2?.split(/\s+/).join("");

    pesoSalida =
      stateBascula1 == true
        ? peso?.toString().substring(3).split(/\s+/).join("")
        : peso2?.toString().substring(3).split(/\s+/).join("");
  } else if (trama == "AND") {
    newStr =
      stateBascula1 == true
        ? peso?.toString().slice(1, -2)
        : peso2?.toString().slice(1, -2);
    newStr2 = newStr?.substring(3);
    pesostr = newStr2?.split(/\s+/).join("");

    pesoSalida =
      stateBascula1 == true
        ? peso?.toString().substring(3).split(/\s+/).join("")
        : peso2?.toString().substring(3).split(/\s+/).join("");
  } else if (trama == "Cardinal SB-400") {
    newStr =
      stateBascula1 == true
        ? peso?.toString().slice(1, -8)
        : peso2?.toString().slice(1, -8);
    newStr2 = newStr?.substring(1);
    pesostr = newStr2?.split(/\s+/).join("");

    pesoSalida =
      stateBascula1 == true
        ? peso?.toString().substring(3).split(/\s+/).join("")
        : peso2?.toString().substring(3).split(/\s+/).join("");
  } else if (trama == "WI110") {
    newStr =
      stateBascula1 == true
        ? peso?.toString().slice(1, -2)
        : peso2?.toString().slice(1, -2);
    newStr2 = newStr?.substring(3);
    pesostr = newStr2?.split(/\s+/).join("");

    pesoSalida =
      stateBascula1 == true
        ? peso?.toString().substring(3).split(/\s+/).join("")
        : peso2?.toString().substring(3).split(/\s+/).join("");
  } else if (trama == "WI110") {
    newStr =
      stateBascula1 == true
        ? peso?.toString().slice(1, -2)
        : peso2?.toString().slice(1, -2);
    newStr2 = newStr?.substring(3);
    pesostr = newStr2?.split(/\s+/).join("");

    pesoSalida =
      stateBascula1 == true
        ? peso?.toString().substring(3).split(/\s+/).join("")
        : peso2?.toString().substring(3).split(/\s+/).join("");
  } else if (trama == "Numero") {
    newStr =
      stateBascula1 == true
        ? peso?.toString().slice(0)
        : peso2?.toString().slice(0);
    newStr2 = newStr?.substring(0);
    pesostr = newStr2?.split(/\s+/).join("");

    pesoSalida =
      stateBascula1 == true
        ? peso?.toString().substring(0).split(/\s+/).join("")
        : peso2?.toString().substring(0).split(/\s+/).join("");
  } else if (trama == "Toledo Long/Short") {
    newStr =
      stateBascula1 == true
        ? peso?.toString().slice(1, -6)
        : peso2?.toString().slice(1, -6);
    newStr2 = newStr?.substring(4);
    pesostr = newStr2?.split(/\s+/).join("");

    pesoSalida =
      stateBascula1 == true
        ? peso?.toString().substring(0).split(/\s+/).join("")
        : peso2?.toString().substring(0).split(/\s+/).join("");
  } else if (trama == "SB500 con Semáforo") {
    newStr =
      stateBascula1 == true
        ? peso?.toString().slice(1, -4)
        : peso2?.toString().slice(1, -4);
    newStr2 = newStr?.substring(1);
    pesostr = newStr2?.split(/\s+/).join("");

    pesoSalida =
      stateBascula1 == true
        ? peso?.toString().substring(0).split(/\s+/).join("")
        : peso2?.toString().substring(0).split(/\s+/).join("");
  }
  // pesostr
  const pesoNumEnv = Number(pesostr) ;

  const despachofunction = () => {
    setFormSearch(null);
    setCheckDespachoFin(true);
    setCheckCredito(false);
    setCheckEfectivo(false);
    setEntrada(true);
   
  };

  const estadoEntradaMateriaPrima = () => {
    setCheckDespachoFin(false);
    setCheckDespacho(false);
    setEntrada(false);
    //### state para bloquer los inputs
    setCheckEntrada(true);
    setFormSearch(null);
  };

  const estadoDespachoProducto = () => {
    setCheckDespachoFin(false);
    setCheckEntrada(false);
    setCheckDespacho(true);
    setEntrada(false);
    setFormSearch(null);
  };

  const heightForm = "3vh";



  const changeProcesoRecoger = () => {
    setProcesoRecoger(!procesoRecoger)
    setProcesoDescargar(false)
  }

  const changeProcesoDescargar = () => {
    setProcesoDescargar(!procesoDescargar)
    setProcesoRecoger(false)
  }




  
 
  return (
    <>

{pdf ? (
          <>
            <Modal
              Estado={setPdf}
              Recibo={recibo}
              Recibo2={recibo2}
              Peso={pesoNumEnv}
              Estado2={setPesoActivo}
              volumenEstado={volumenEstado}
              unidadEstado={unidadEstado}
              PesoT={pesoT}
              PesoG={pesoG}
              PesoN={pesoN}
              setPdf={setPdf}
              setFormSearch={setFormSearch}
            />
          </>
        ) : 
      <Container style={{ marginTop: "-5.0vh" }}>
        
        <Row style={{ marginTop: 40,  }}>
          <Col lg="3" sm="6">
            <Card className="card-stats" style={{ height: 50 }}>
              <Card.Body>
                <Row style={{ marginBottom: "4vh" }}>
                  <tbody>
                    <tr>
                      <td style={{}}>
                        <Form.Check
                          className="mb-1 pl-0"
                          style={{ marginTop: "-3.5vh" }}
                        >
                          <Form.Check.Label>
                            <Form.Check.Input
                              checked={checkDespacho}
                              type="checkbox"
                              onChange={() => estadoDespachoProducto()}
                            ></Form.Check.Input>
                            <span className="form-check-sign"></span>
                          </Form.Check.Label>
                        </Form.Check>
                      </td>
                      <td>Despacho</td>
                    </tr>
                  </tbody>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats" style={{ height: 50 }}>
              <Card.Body>
                <Row style={{ marginBottom: "4vh" }}>
                  <tbody>
                    <tr>
                      <td style={{}}>
                        <Form.Check
                          className="mb-1 pl-0"
                          style={{ marginTop: "-3.5vh" }}
                        >
                          <Form.Check.Label>
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
                      <td>Ingreso</td>
                    </tr>
                  </tbody>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats" style={{ height: 50 }}>
              <Card.Body>
                <Row style={{ marginBottom: "0vh" }}>
                  <tbody>
                    <tr>
                      <td style={{}}>
                        <Form.Check
                          className="mb-1 pl-0"
                          style={{ marginTop: "-3.5vh" }}
                        >
                          <Form.Check.Label>
                            <Form.Check.Input
                              checked={checkDespachoFin}
                              type="checkbox"
                              onChange={() => despachofunction()}
                            ></Form.Check.Input>
                            <span className="form-check-sign"></span>
                          </Form.Check.Label>
                        </Form.Check>
                      </td>
                      <td>Transito</td>
                    </tr>
                  </tbody>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {dosBasculas ? (<>
          <Row style={{ marginTop: "-1.5vh", marginBottom: 20 }}>
          <Col lg="4" sm="6">
            <Card className="card-stats" style={{ height: 50 }}>
              <Card.Body>
                <Row style={{ marginBottom: "4vh" }}>
                  <tbody>
                    <tr>
                      <td style={{}}>
                        <Form.Check
                          className="mb-1 pl-0"
                          style={{ marginTop: "-3.5vh" }}
                        >
                          <Form.Check.Label>
                            <Form.Check.Input
                              checked={stateBascula1}
                              type="checkbox"
                              onChange={() => bascula1()}
                            ></Form.Check.Input>
                            <span className="form-check-sign"></span>
                          </Form.Check.Label>
                        </Form.Check>
                      </td>
                      <td>Bascula 1</td>
                    </tr>
                  </tbody>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="4" sm="6">
            <Card className="card-stats" style={{ height: 50 }}>
              <Card.Body>
                <Row style={{ marginBottom: "4vh" }}>
                  <tbody>
                    <tr>
                      <td style={{}}>
                        <Form.Check
                          className="mb-1 pl-0"
                          style={{ marginTop: "-3.5vh" }}
                        >
                          <Form.Check.Label>
                            <Form.Check.Input
                              checked={stateBascula2}
                              type="checkbox"
                              onChange={() => bascula2()}
                              value={checkDespacho}
                            ></Form.Check.Input>
                            <span className="form-check-sign"></span>
                          </Form.Check.Label>
                        </Form.Check>
                      </td>
                      <td>Bascula 2</td>
                    </tr>
                  </tbody>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        </>): (<></>)}


        <Row style={{marginBottom: isTabletOrMobile ? 0 : 20 }}>
          
          <Col lg="3" sm="6">
            <Card className="card-stats" style={{ height: 50 }}>
              <Card.Body>
                <Row style={{ marginBottom: "4vh" }}>
                  <tbody>
                    <tr>
                      <td style={{}}>
                        <Form.Check
                          className="mb-1 pl-0"
                          style={{ marginTop: "-3.5vh" }}
                        >
                          <Form.Check.Label>
                            <Form.Check.Input
                              checked={procesoDescargar}
                              type="checkbox"
                              onChange={() => changeProcesoDescargar()}
                              value={procesoDescargar}
                            ></Form.Check.Input>
                            <span className="form-check-sign"></span>
                          </Form.Check.Label>
                        </Form.Check>
                      </td>
                      <td>Descargar Trailer</td>
                    </tr>
                  </tbody>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats" style={{ height: 50 }}>
              <Card.Body>
                <Row style={{ marginBottom: "4vh" }}>
                  <tbody>
                    <tr>
                      <td style={{}}>
                        <Form.Check
                          className="mb-1 pl-0"
                          style={{ marginTop: "-3.5vh" }}
                        >
                          <Form.Check.Label>
                            <Form.Check.Input
                              value={procesoRecoger}
                              checked={procesoRecoger}
                              type="checkbox"
                              onChange={() => changeProcesoRecoger()}
                            ></Form.Check.Input>
                            <span className="form-check-sign"></span>
                          </Form.Check.Label>
                        </Form.Check>
                      </td>
                      <td>Recoger trailer</td>
                    </tr>
                  </tbody>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          
        </Row>
        

        {isTabletOrMobile ? (
          <>
            <Row
              style={{
                marginTop: -20,
                marginBottom: 50,
                justifyContent: "center",
              }}
            >
              <Col className="pl-1" md="3">
                <Form.Group>
                  <label style={{ fontWeight: "bold", fontSize: 10 }}>
                    báscula
                  </label>
                  <Form.Control
                    style={{
                      height: 25,
                      height: "5vh",
                      backgroundColor: "#cc444c",
                      color: "#fff",
                    }}
                    name="unidad"
                    placeholder="0"
                    type="text"
                    value={pesostr ? pesostr + " kg" : "0"}
                    disabled={true}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col className="pl-1" md="3">
                <Form.Group>
                  <label style={{ fontWeight: "bold", fontSize: 10 }}>
                    Tara
                  </label>
                  <Form.Control
                    style={{
                      height: 25,
                      height: "5vh",
                      backgroundColor: "#cc444c",
                      color: "#fff",
                    }}
                    name="unidad"
                    placeholder="0"
                    type="text"
                    value={formSearch ? formSearch?.Tara : "0"}
                    disabled={true}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col className="pl-1" md="3">
                <Form.Group>
                  <label style={{ fontWeight: "bold", fontSize: 10 }}>
                    Bruto
                  </label>
                  <Form.Control
                    style={{
                      height: 25,
                      height: "5vh",
                      backgroundColor: "#cc444c",
                      color: "#fff",
                    }}
                    name="unidad"
                    placeholder="0"
                    type="text"
                    value={
                      formSearch ? pesoNumEnv + " " + "KG" : "0" + " " + "KG"
                    }
                    disabled={true}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col className="pl-1" md="3">
                <Form.Group>
                  <label style={{ fontWeight: "bold", fontSize: 10 }}>
                    Neto
                  </label>
                  <Form.Control
                    style={{
                      height: 25,
                      height: "5vh",
                      backgroundColor: "#cc444c",
                      color: "#fff",
                    }}
                    name="unidad"
                    placeholder="0"
                    type="text"
                    value={
                      formSearch ? pesoNumEnv - parseInt(formSearch?.Tara) : "0"
                    }
                    disabled={true}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </>
        ) : (
          <></>
        )}
        <Row style={{ justifyContent: isTabletOrMobile ? "center" : "" }}>
          <Col md="8">
            <Card style={{ marginTop: "-5.0vh" }}>
              <Card.Body style={{ marginTop: "0", marginBottom: "10%" }}>
                {formSearch?.Caso ? (
                  <>
                    <tbody >
                      <tr>
                        <td>
                          <Form onSubmit={formik.handleSubmit}>
                            <Row>
                              <Col md="4">
                                <Form.Group>
                                  <label
                                    style={{ fontWeight: "bold", fontSize: 10 }}
                                  >
                                    Placa
                                  </label>
                                  <Form.Control
                                    style={{ height: heightForm }}
                                    name="placa"
                                    placeholder="Placa"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    disabled={formSearch ? true : false}
                                    value={formik.values.placa}
                                    isInvalid={formik.errors.placa}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>

                             
                              {dropdownConduc ? (
                                <>
                                  <Col md="4">
                                    <Form.Group>
                                      <label
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: 10,
                                        }}
                                      >
                                        Cedula
                                      </label>
                                      <Form.Control
                                        style={{ height: heightForm }}
                                        name="cedulaCiudadania"
                                        placeholder="Cedula"
                                        type="text"
                                        onFocus={() => getConduct()}
                                        onBlur={() => {
                                          setTimeout(() => {
                                            onBlurConduc();
                                          }, 500);
                                        }}
                                        onChange={(text) => {
                                          formik.setFieldValue(
                                            "cedulaCiudadania",
                                            text.target.value
                                          );
                                          filtroConductorF(text.target.value);
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
                                                onClick={() =>
                                                  guardarFiltroConduct(placa)
                                                }
                                              >
                                                {placa?.Nombre} --{" "}
                                                {placa?.Cedula}
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
                                      <label
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: 10,
                                        }}
                                      >
                                        Cedula
                                      </label>
                                      <Form.Control
                                        style={{ height: heightForm }}
                                        name="cedulaCiudadania"
                                        placeholder="Cedula"
                                        type="text"
                                        onFocus={() => getConduct()}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.cedulaCiudadania}
                                        isInvalid={
                                          formik.errors.cedulaCiudadania
                                        }
                                      ></Form.Control>
                                    </Form.Group>
                                  </Col>
                                </>
                              )}

                              <Col md="4">
                                <Form.Group>
                                  <label
                                    style={{ fontWeight: "bold", fontSize: 10 }}
                                  >
                                    Conductor
                                  </label>
                                  <Form.Control
                                    style={{ height: heightForm }}
                                    name="conductor"
                                    placeholder="Conductor"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.conductor}
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
                                      <label
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: 10,
                                        }}
                                      >
                                        Planta
                                      </label>
                                      <Form.Control
                                        style={{ height: heightForm }}
                                        name="planta"
                                        placeholder="Planta"
                                        type="text"
                                        onFocus={() => getPlantas()}
                                        onBlur={() => {
                                          setTimeout(() => {
                                            onBlurPlanta();
                                          }, 500);
                                        }}
                                        onChange={(text) => {
                                          formik.setFieldValue(
                                            "planta",
                                            text.target.value
                                          );
                                          filtrarPlanta(text.target.value);
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
                                                onClick={() =>
                                                  guardarFiltroPlanta(placa)
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
                                      <label
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: 10,
                                        }}
                                      >
                                        Planta
                                      </label>
                                      <Form.Control
                                        style={{ height: heightForm }}
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
                                </>
                              )}

                              {dropdownProveedorCliente ? (
                                <>
                                  <Col className="pr-1" md="4">
                                    <Form.Group>
                                      <label
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: 10,
                                        }}
                                      >
                                        {formSearch?.Caso == "Ingreso"
                                          ? "Proveedor"
                                          : "Cliente"}
                                      </label>
                                      <Form.Control
                                        style={{ height: heightForm }}
                                        name="clienteProveedor"
                                        placeholder={
                                          formSearch?.Caso == "Ingreso"
                                            ? "Proveedor"
                                            : "Cliente"
                                        }
                                        type="text"
                                        onFocus={() => getClienteProveedor()}
                                        onBlur={() => {
                                          setTimeout(() => {
                                            onBlurClienteProveedor();
                                          }, 500);
                                        }}
                                        onChange={(text) => {
                                          formik.setFieldValue(
                                            "clienteProveedor",
                                            text.target.value
                                          );
                                          filtrarClienteProveedor(
                                            text.target.value
                                          );
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
                                                onClick={() =>
                                                  guardarFiltroCliente(placa)
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
                                      <label
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: 10,
                                        }}
                                      >
                                        {formSearch?.Caso == "Ingreso"
                                          ? "Proveedor"
                                          : "Cliente"}
                                      </label>
                                      <Form.Control
                                        style={{ height: heightForm }}
                                        name="clienteProveedor"
                                        placeholder={
                                          formSearch?.Caso == "Ingreso"
                                            ? "Proveedor"
                                            : "Cliente"
                                        }
                                        type="text"
                                        onFocus={() => getClienteProveedor()}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.clienteProveedor}
                                        isInvalid={
                                          formik.errors.clienteProveedor
                                        }
                                      ></Form.Control>
                                    </Form.Group>
                                  </Col>
                                </>
                              )}

                              {dropwdownDestinoOrigen ? (
                                <>
                                  <Col className="pr-1" md="4">
                                    <Form.Group>
                                      <label
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: 10,
                                        }}
                                      >
                                        {formSearch.Caso == "Ingreso"
                                          ? "Origen"
                                          : "Destino"}
                                      </label>
                                      <Form.Control
                                        style={{ height: heightForm }}
                                        name="destino"
                                        placeholder="Destino"
                                        type="text"
                                        onFocus={() => getDestinoOrigen()}
                                        onBlur={() => {
                                          setTimeout(() => {
                                            onBlurDestinoOrigen();
                                          }, 500);
                                        }}
                                        onChange={(text) => {
                                          formik.setFieldValue(
                                            "destino",
                                            text.target.value
                                          );
                                          filtrarDestinoOrigen(
                                            text.target.value
                                          );
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
                                                onClick={() =>
                                                  guardarFiltroDestino(placa)
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
                                      <label
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: 10,
                                        }}
                                      >
                                        {formSearch.Caso == "Ingreso"
                                          ? "Origen"
                                          : "Destino"}
                                      </label>
                                      <Form.Control
                                        style={{ height: heightForm }}
                                        name="destino"
                                        placeholder={
                                          formSearch.Caso == "Ingreso"
                                            ? "Origen"
                                            : "Destino"
                                        }
                                        type="text"
                                        onFocus={() => getDestinoOrigen()}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.destino}
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
                                      <label
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: 10,
                                        }}
                                      >
                                        {formSearch?.Caso == "Despacho"
                                          ? "Producto"
                                          : "Materia Prima"}
                                      </label>
                                      <Form.Control
                                        style={{ height: heightForm }}
                                        name="productoMateria"
                                        placeholder={
                                          formSearch?.Caso == "Despacho"
                                            ? "Producto"
                                            : "Materia Prima"
                                        }
                                        type="text"
                                        onFocus={() => getMateriaProducto()}
                                        onBlur={() => {
                                          setTimeout(() => {
                                            onBlurMateriaProducto();
                                          }, 500);
                                        }}
                                        onChange={(text) => {
                                          formik.setFieldValue(
                                            "productoMateria",
                                            text.target.value
                                          );
                                          filtrarMateriaProducto(
                                            text.target.value
                                          );
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
                                                onClick={() =>
                                                  guardarFiltroMateria(placa)
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
                                  <Col className="pr-1" md="4">
                                    <Form.Group>
                                      <label
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: 10,
                                        }}
                                      >
                                        {formSearch?.Caso == "Despacho"
                                          ? "Producto"
                                          : "Materia Prima"}
                                      </label>
                                      <Form.Control
                                        style={{ height: heightForm }}
                                        name="productoMateria"
                                        placeholder={
                                          formSearch?.Caso == "Despacho"
                                            ? "Producto"
                                            : "Materia Prima"
                                        }
                                        type="text"
                                        onFocus={() => getMateriaProducto()}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        
                                        value={formik.values.productoMateria}
                                        isInvalid={
                                          formik.errors.productoMateria
                                        }
                                      ></Form.Control>
                                    </Form.Group>
                                  </Col>
                                </>
                              )}

                              {dropdownTransportadora ? (
                                <>
                                  <Col className="pr-1" md="4">
                                    <Form.Group>
                                      <label
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: 10,
                                        }}
                                      >
                                        Transportadora
                                      </label>
                                      <Form.Control
                                        style={{ height: heightForm }}
                                        name="transportadora"
                                        placeholder="Transportadora"
                                        type="text"
                                        onFocus={() => getTransportadora()}
                                        onBlur={() => {
                                          setTimeout(() => {
                                            onBlurTransportadora();
                                          }, 500);
                                        }}
                                        onChange={(text) => {
                                          formik.setFieldValue(
                                            "transportadora",
                                            text.target.value
                                          );
                                          filtrarTransportadora(
                                            text.target.value
                                          );
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
                                                  guardarFiltroTransportadora(
                                                    placa
                                                  )
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
                                      <label
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: 10,
                                        }}
                                      >
                                        Transportadora
                                      </label>
                                      <Form.Control
                                        style={{ height: heightForm }}
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
                                </>
                              )}

                              <Col md="4">
                                <Form.Group>
                                  <label
                                    style={{ fontWeight: "bold", fontSize: 10 }}
                                  >
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
                                    value={fechaActual2 + " " + hora2}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                            </Row>

                            <Row>
                            <Col className="pr-1" md="6">
                                    <Form.Group>
                                      <label
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: 10,
                                        }}
                                      >
                                          Tara contenedor
                                      </label>
                                      <Form.Control
                                        style={{ height: heightForm }}
                                        name="tara_contenedor"
                                        placeholder="Tara contenedor"
                                        type="number"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.tara_contenedor}
                                        isInvalid={formik.errors.tara_contenedor}
                                      ></Form.Control>
                                    </Form.Group>
                                  </Col>

                                  <Col className="pr-1" md="6">
                                    <Form.Group>
                                      <label
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: 10,
                                        }}
                                      >
                                          Responsable
                                      </label>
                                      <Form.Control
                                        style={{ height: heightForm }}
                                        name="responsable"
                                        placeholder="Responsable"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.responsable}
                                        isInvalid={formik.errors.responsable}
                                      ></Form.Control>
                                    </Form.Group>
                                  </Col>
                            </Row>

                            {/* #### */}

                            
                                <h4 style={{ textAlign: "center", fontSize: 20 }}>
                                  Datos de carga
                                </h4>
                                <Row>
                                  <Col className="pr-1" md="6">
                                    <Form.Group>
                                      <label
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: 10,
                                        }}
                                      >
                                          # Shipment
                                      </label>
                                      <Form.Control
                                        style={{ height: heightForm }}
                                        name="n_shipment"
                                        placeholder=" # Shipment"
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
                                      <label
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: 10,
                                        }}
                                      >
                                          # Sello
                                      </label>
                                      <Form.Control
                                        style={{ height: heightForm }}
                                        name="n_sello"
                                        placeholder="# Sello"
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
                                      <label
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: 10,
                                        }}
                                      >
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
                                      <label
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: 10,
                                        }}
                                      >
                                          # Contenedor
                                      </label>
                                      <Form.Control
                                        style={{ height: heightForm }}
                                        name="n_contenedor"
                                        placeholder=" # Contenedor "
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.n_contenedor}
                                        isInvalid={formik.errors.n_contenedor}
                                      ></Form.Control>
                                    </Form.Group>
                                  </Col>
                                </Row>
                            <Row>
                              <Col md="12">
                                <Form.Group>
                                  <label
                                    style={{ fontWeight: "bold", fontSize: 10 }}
                                  >
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
                                    value={formik.values.observaciones}
                                  ></Form.Control>
                                </Form.Group>
                              </Col>
                            </Row>

                            <Row>
                              <div style={{ display: "flex", flex: 1 }}>
                                <button
                                  type="submit"
                                  style={{
                                    backgroundColor: "#cc444c",
                                    marginLeft: "4vh",
                                    color: "white",
                                    border: "none",
                                    width: 120,
                                    height: 50,
                                    borderRadius: 10,
                                    marginTop: 10,
                                  }}
                                  variant="info"
                                >
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
                  </>
                ) : (
                  <>
                    {entrada ? (
                      <>
                        <Entrada
                          setEntrada={setEntrada}
                          setFormSearch={setFormSearch}
                        />
                      </>
                    ) : (
                      <>
                        <Despacho
                          setTransito={setTransito}
                          transito={transito}
                          setEntrada={setEntrada}
                          formSearch={formSearch}
                          despacho={despacho}
                          entrada={entrada}
                          checkEntrada={checkEntrada}
                          checkDespacho={checkDespacho}
                          pesoNumEnv={pesoNumEnv}
                          checkMccain={checkMccain}
                          procesoRecoger={procesoRecoger}
                          procesoDescargar={procesoDescargar}

                        />
                      </>
                    )}
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
          {isTabletOrMobile ? (
            <></>
          ) : (
            <>
              <Col style={{ marginTop: -130 }} md="2">
                <Card.Body style={{ height: "20vh", width: "50vh" }}>
                  <div
                    style={{ marginLeft: "4vw" }}
                    className="ct-chart ct-perfect-fourth"
                    id="chartPreferences"
                  >
                    <Card.Title as="h4">báscula</Card.Title>
                    <Card.Title
                      as="h2"
                      style={{
                        height: "8vh",
                        width: "30vh",
                        backgroundColor: "#cc444c",
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "5vh",
                      }}
                    >
                      <div
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#fff",
                        }}
                      >
                        {parseInt(pesostr)} kg
                      </div>
                    </Card.Title>
                  </div>

                  <div style={{ marginLeft: "4vw", marginTop: "-8vw" }}>
                    <div>TARA</div>
                    <Card.Title
                      as="h2"
                      style={{
                        height: "8vh",
                        width: "30vh",
                        backgroundColor: "#cc444c",
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "5vh",
                      }}
                    >
                      <div
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#fff",
                        }}
                      >
                        {formSearch?.Caso
                          ? formSearch?.Caso == "Ingreso"
                            ? pesoNumEnv + " " + "kg"
                            : formSearch?.Caso == "Despacho"
                            ? formSearch?.Tara + " " + "kg"
                            : checkEntrada
                            ? ""
                            : pesoNumEnv + " " + "kg"
                          : checkEntrada
                          ? "0" + " " + "kg"
                          : pesoNumEnv + " " + "kg"}
                      </div>
                    </Card.Title>
                    <div>BRUTO</div>
                    <Card.Title
                      as="h2"
                      style={{
                        height: "8vh",
                        width: "30vh",
                        backgroundColor: "#cc444c",
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "5vh",
                      }}
                    >
                      <div
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#fff",
                        }}
                      >
                        {formSearch?.Caso
                          ? formSearch?.Caso == "Ingreso"
                            ? formSearch?.Bruto + " " + "kg"
                            : formSearch?.Caso == "Despacho"
                            ? pesoNumEnv + " " + "kg"
                            : checkEntrada
                            ? pesoNumEnv
                            : "0" + " " + "kg"
                          : checkEntrada
                          ? pesoNumEnv
                          : "0" + " " + "kg"}
                      </div>
                    </Card.Title>
                    <div>NETO</div>
                    <Card.Title
                      as="h2"
                      style={{
                        height: "8vh",
                        width: "30vh",
                        backgroundColor: "#cc444c",
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "5vh",
                      }}
                    >
                      <div
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#fff",
                        }}
                      >
                        {formSearch?.Caso == "Ingreso"
                          ? parseInt(formSearch?.Bruto) -
                            pesoNumEnv +
                            " " +
                            "kg"
                          : formSearch?.Caso == "Despacho"
                          ? pesoNumEnv - parseInt(formSearch?.Tara) + " " + "kg"
                          : "0" + " " + "kg"}
                      </div>
                    </Card.Title>

                    <div>VGM</div>
                    <Card.Title
                      as="h2"
                      style={{
                        height: "8vh",
                        width: "30vh",
                        backgroundColor: "#cc444c",
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "5vh",
                      }}
                    >
                      <div
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#fff",
                        }}
                      >
                         {formSearch?.Caso == "Ingreso"
                          ? `${(parseInt(formSearch?.Bruto) -
                            parseInt(pesoNumEnv)) + taraContendor} kg`
                          : formSearch?.Caso == "Despacho"
                          ? `${(parseInt(pesoNumEnv) - parseInt(formSearch?.Tara)) + taraContendor}`
                          : "0" + " " + "kg"}
                      </div>
                    </Card.Title>
                  </div>
                </Card.Body>
              </Col>
            </>
          )}
        </Row>
        <Row>
          <Col md="6"></Col>
        </Row>

       
      </Container>
      }
    </>
  );
}

export default Dashboard;
