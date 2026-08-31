import React, { useState, useEffect } from "react";
import useAuth from "hooks/useAuth";
import { getDespachosSalidaApi, getDespachosfechaApi } from "API/despachoSalida";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import * as Yup from "yup";
import { useFormik } from "formik";
import ReimprimirDespacho from "components/modals/ReimprimirDespacho"
import { getAllUsers } from "API/users";
import moment from "moment/moment";
import 'moment/locale/es';
import 'moment-timezone'
moment.locale('es');
import Select from 'react-select';
import Modal from "../modals/ReimprimirDespacho"
moment.utc()

// react-bootstrap components
import {
  Button,
  Table,
  Row,
  Col,
  Form,
  Dropdown
} from "react-bootstrap";
import { getAllVehiculos } from "API/vehiculos";
import { getConductoresApi } from "API/conductores";
import { getProductoApi } from "API/producto";
import { getClienteApi } from "API/cliente";
import { getDestinoApi } from "API/destino";
import { getPlantaApi } from "API/planta";
import { getTransportadoraApi } from "API/transportadora";


export default function DespachoFinal() {

  const [registrosEntrada, setRegistrosEntrada] = useState(null)
  const [filtroPlaca, setFiltroPlaca] = useState(null)
  const [registrosFiltrados, setRegistrosFiltrados] = useState(null)
  const [filtroDespuesDeFecha, setFiltroDespuesDeFecha] = useState(null)
  const [reimprimir, setReimprimir] = useState(null)
  const [recibo2, setRecibo2] = useState(null)
  const [busqueda, setBusqueda] = useState(null)
  const [options, setOptions] = useState([]); // Estado para las opciones
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [tara, setTara] = useState();
  const [bruto, setBruto] = useState();
  const [neto, setNeto] = useState();
  const [modal, setModal] = useState(null)
  const [usuarios, setUsuarios] = useState(null)
  const [inputValue, setInputValue] = useState('');
  const [proceso, setProceso] = useState('Todos')
  const { auth } = useAuth()
  useEffect(() => {
    (async () => {
      const response = await getDespachosSalidaApi(auth)
      console.log("despachofinaldespachofinaldespachofinaldespachofinaldespachofinaldespachofinal", response)
      setRegistrosEntrada(response)
      const totalTara = response?.slice(0, 10).reduce((acc, entrada) => acc + entrada.Tara, 0);
      const totalBruto = response?.slice(0, 10).reduce((acc, entrada) => acc + entrada.Bruto, 0);
      const totalNeto = response?.slice(0, 10).reduce((acc, entrada) => acc + entrada.Neto, 0);
      setTara(totalTara)
      setBruto(totalBruto)
      setNeto(totalNeto)
      const users = await getAllUsers(auth)
      setUsuarios(users)
    })()
  }, [])


  const formik = useFormik({
    initialValues: {

      fechaInicial: "",
      fechaFinal: "",

    },
    validationSchema: Yup.object({

      fechaInicial: Yup.string().required(true),
      fechaFinal: Yup.string().required(true),
     
    }),
    onSubmit: async (formValue) => {

        const fechaInicial = formValue.fechaInicial
        const fechaFinal = formValue.fechaFinal
        const response = await getDespachosfechaApi(auth, fechaInicial, fechaFinal, proceso, busqueda, selectedOptions?.value || '')
        console.log("getDespachosfechaApi",response)
        setRegistrosFiltrados(response)
        const totalTara = response?.reduce((acc, entrada) => acc + entrada.Tara, 0);
        const totalBruto = response?.reduce((acc, entrada) => acc + entrada.Bruto, 0);
        const totalNeto = response?.reduce((acc, entrada) => acc + entrada.Neto, 0);
        setTara(totalTara)
        setBruto(totalBruto)
        setNeto(totalNeto)

    }
  })

  const blur = () => {
    console.log(inputValue);
    setSelectedOptions({value: inputValue, label: inputValue})
  }


  const fechaISO = '2023-04-11T00:00:00.000Z';

  // Crear un objeto Moment.js a partir de la fecha ISO 8601 en la zona horaria UTC
  const fechaUtcMoment = moment.utc(fechaISO);

  // Convertir la fecha y hora a la zona horaria de Colombia
  const fechaColombiaMoment = fechaUtcMoment.utcOffset('-05:00');

  // Obtener la fecha en formato colombiano
  const fechaColombiana = fechaColombiaMoment.format('YYYY-MM-DD HH:mm:ss');

  console.log("fechaColombianafechaColombianafechaColombianafechaColombiana", fechaColombiana); // resultado: "2023-04-10 19:00:00"

  const filtrar = query => {


    if (registrosFiltrados) {
      const result = registrosFiltrados?.filter(function (lista) {
        return lista?.No_Tiquete.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
      })
      setFiltroDespuesDeFecha(result)
    } else {

      const result = registrosEntrada?.filter(function (lista) {
        return lista?.No_Tiquete.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
      })

      setFiltroPlaca(result)
    }


  }

  const guardarRecibo = (placa) => {
    setModal(placa)
  }



  const buscar = async (texto) => {
    setProceso(texto)
    setBusqueda(texto)
    if(texto == 'Placa'){
      const response = await getAllVehiculos(auth)
      console.log("Vehiculos", response);
      const formattedOptions = response.map(item => ({
        value: item.Placa, // Asumiendo que tu objeto tiene un campo 'id'
        label: item.Placa // Asumiendo que tu objeto tiene un campo 'name'
      }));
      setOptions(formattedOptions);
    }

    if(texto == 'Conductor'){
      const response = await getConductoresApi(auth)
      console.log("Conductor", response);
      const formattedOptions = response.map(item => ({
        value: item.Nombre, // Asumiendo que tu objeto tiene un campo 'id'
        label: item.Nombre // Asumiendo que tu objeto tiene un campo 'name'
      }));
      setOptions(formattedOptions);
    }

    if(texto == 'Producto'){
      const response = await getProductoApi(auth)
      console.log("Producto", response);
      const formattedOptions = response.map(item => ({
        value: item.Nombre, // Asumiendo que tu objeto tiene un campo 'id'
        label: item.Nombre // Asumiendo que tu objeto tiene un campo 'name'
      }));
      setOptions(formattedOptions);
    }

    if(texto == 'Cliente'){
      const response = await getClienteApi(auth)
      console.log("Cliente", response);
      const formattedOptions = response.map(item => ({
        value: item.Nombre, // Asumiendo que tu objeto tiene un campo 'id'
        label: item.Nombre // Asumiendo que tu objeto tiene un campo 'name'
      }));
      setOptions(formattedOptions);
    }

    if(texto == 'Destino'){
      const response = await getDestinoApi(auth)
      console.log("Destino", response);
      const formattedOptions = response.map(item => ({
        value: item.Nombre, // Asumiendo que tu objeto tiene un campo 'id'
        label: item.Nombre // Asumiendo que tu objeto tiene un campo 'name'
      }));
      setOptions(formattedOptions);
    }

    if(texto == 'Planta'){
      const response = await getPlantaApi(auth)
      console.log("Planta", response);
      const formattedOptions = response.map(item => ({
        value: item.Nombre, // Asumiendo que tu objeto tiene un campo 'id'
        label: item.Nombre // Asumiendo que tu objeto tiene un campo 'name'
      }));
      setOptions(formattedOptions);
    }

    if(texto == 'Transportadora'){
      const response = await getTransportadoraApi(auth)
      console.log("Transportadora", response);
      const formattedOptions = response.map(item => ({
        value: item.Nombre, // Asumiendo que tu objeto tiene un campo 'id'
        label: item.Nombre // Asumiendo que tu objeto tiene un campo 'name'
      }));
      setOptions(formattedOptions);
    }

    if(texto == 'Nick_Operario'){
      const response = await getAllUsers(auth)
      console.log("Operario", response);
      const formattedOptions = response.map(item => ({
        value: item.Nick, // Asumiendo que tu objeto tiene un campo 'id'
        label: item.Nick // Asumiendo que tu objeto tiene un campo 'name'
      }));
      setOptions(formattedOptions);
    }

  }

  const handleChange = (selected) => {
    console.log("Seleccionado",selected );
    setSelectedOptions(selected);
  };

  const handleInputChange = (value) => {
    setInputValue(value);
};
  return (


    <>

      {modal ? (<>
        
        <Modal datos={modal} setDatos={setModal}/>

      </>) : (<>


      

      <Row>

        <label htmlFor="exampleInputEmail1" style={{textAlign: 'center'}}>
          Selecciona un parámetro de búsqueda
        </label>
        {busqueda == null || busqueda == '' ? (<>




          <Row style={{  marginBottom: 10, marginTop: 10 }}>
            <Col className="pl-1" md="3" >
              <Dropdown>
                <Dropdown.Toggle style={{ border: 'none', backgroundColor: '#cc444c', color: "#fff" }} variant="info" id="dropdown-basic">
                  Proceso
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => buscar('Placa')}>Placa</Dropdown.Item>
                  <Dropdown.Item onClick={() => buscar('Conductor')}>Conductor</Dropdown.Item>
                  <Dropdown.Item onClick={() => buscar('Producto')}>Producto</Dropdown.Item>
                  <Dropdown.Item onClick={() => buscar('Cliente')}>Cliente</Dropdown.Item>
                  <Dropdown.Item onClick={() => buscar('Destino')}>Destino</Dropdown.Item>
                  <Dropdown.Item onClick={() => buscar('Planta')}>Planta</Dropdown.Item>
                  <Dropdown.Item onClick={() => buscar('Transportadora')}>Transportadora</Dropdown.Item>
                  <Dropdown.Item onClick={() => buscar('Nick_Operario')}>Operario</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            
          </Row>



        </>) : (<>

          <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>
            <Col className="pl-1" md="3">
              <Button style={{ border: 'none', backgroundColor: '#cc444c', color: "#fff" }} variant='info' onClick={() => {setBusqueda('')
                 setSelectedOptions('')}}>
                {busqueda}
              </Button>
            </Col>
            <Col style={{ marginLeft: -80}}>
            <Select
                options={options}
                value={selectedOptions}
                onChange={handleChange}
                onBlur={blur}
                onInputChange={handleInputChange}
                className="basic-select"
                classNamePrefix="select"
                isClearable={true} // Permite limpiar la selección actual
                isSearchable={true} // Permite buscar dentro de las opciones
            />

            </Col>
          </Row>
        </>)}

      </Row>
     

          
      
      <Form style={{ display: 'flex', flex: 1, flexDirection: 'row' }} onSubmit={formik.handleSubmit}>
      <Button type="submit" style={{ marginTop: '3vh', backgroundColor: '#cc444c',  border: 'none', color: 'white', borderRadius: 10, marginRight: 10 }} variant="info">
          Generar Reporte
        </Button>
        <Row style={{ width: '80%', justifyContent: 'center'}}>
          <Col className="pl-1" md="6">
            <Form.Group>
              <label htmlFor="exampleInputEmail1">
                Fecha Inicial
              </label>
              <Form.Control
                name="fechaInicial"
                placeholder="Tiquete Numero"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.errors.fechaInicial}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col className="pl-1" md="6">
            <Form.Group>
              <label htmlFor="exampleInputEmail1">
                Fecha final
              </label>
              <Form.Control
                name="fechaFinal"
                placeholder="Tiquete Numero"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.errors.fechaFinal}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Col className="pl-1" md="12" style={{ marginBottom: 10, marginTop: 10, textAlign: 'center' }}>
        <Form.Group>
          <label htmlFor="exampleInputEmail1">
            Filtro por Tiquete
          </label>
          <Form.Control
            name="fechaFinal"
            placeholder="Filtro por Tiquete"
            type="text"
            onChange={(e) => filtrar(e.target.value)}

          ></Form.Control>
        </Form.Group>
      </Col>


      {filtroDespuesDeFecha ? (<>



<div style={{ height: 300, overflow: 'auto', marginBottom: 10 }}>

  <Table className="table-hover table-striped" id="despachos">
    <thead>
      <tr >
        <th className="border-0">Imprimir Recibo</th>
        <th className="border-0">Número de Tiquete</th>
        <th className="border-0">Placa</th>
        <th className="border-0">Conductor</th>
        <th className="border-0">Cedula de Ciudadania</th>
        <th className="border-0">Producto</th>
        <th className="border-0">Planta</th>
        <th className="border-0">Cliente</th>
        <th className="border-0">Transportadora</th>
        <th className="border-0">Destino</th>
        <th className="border-0">Fecha Peso Vacio</th>
        <th className="border-0">Fecha Peso Lleno</th>
        <th className="border-0">PesoT</th>
        <th className="border-0">PesoG</th>
        <th className="border-0">PesoN</th>
        <th className="border-0"># Shipment</th>
        <th className="border-0"># Sello</th>
        <th className="border-0"># R</th>
        <th className="border-0"># Contenedor</th>
        <th className="border-0">Operario</th>
        <th className="border-0">Observaciones</th>
      </tr>
    </thead>
    {filtroDespuesDeFecha?.map((entrada) =>
      <tbody key={entrada.id} >
        <tr >
          <td><button style={{ border: 'none', backgroundColor: '#cc444c', color: 'white', borderRadius: 5 }} type="button" onClick={() => guardarRecibo(entrada)}>Imprimir</button></td>
          <td>{entrada.No_Tiquete}</td>
          <td>{entrada.Placa}</td>
          <td>{entrada.Conductor}</td>
          <td>{entrada.Cedula}</td>
          <td>{entrada.Producto}</td>
          <td>{entrada.Planta}</td>
          <td>{entrada.Cliente}</td>
          <td>{entrada.Transportadora}</td>
          <td>{entrada.Destino}</td>
          <td>{entrada.Fecha_Peso_Vacio == null ?  moment.utc(entrada.Fecha_Peso_Vacio).local('es').utcOffset('-05:00').format('YYYY-MM-DD')    + "  " + entrada.Hora_Peso_Vacio : moment.utc(entrada.Fecha_Peso_Vacio).local('es').utcOffset('-05:00').format('YYYY-MM-DD')  + " " + entrada.Hora_Peso_Vacio}</td>
          <td>{entrada.Fecha_Peso_lleno == null ?  moment.utc(entrada.Fecha_Peso_lleno).local('es').utcOffset('-05:00').format('YYYY-MM-DD')  + "  " + entrada.Hora_Peso_lleno : moment.utc(entrada.Fecha_Peso_lleno).local('es').utcOffset('-05:00').format('YYYY-MM-DD') + " " + entrada.Hora_Peso_lleno}</td>
          <td>{entrada.Tara}</td>
          <td>{entrada.Bruto}</td>
          <td>{entrada.Neto}</td>
          <td>{entrada.No_Shipment}</td>
          <td>{entrada.No_Sello}</td>
          <td>{entrada.No_R}</td>
          <td>{entrada.No_Contenedor}</td>
          <td>{entrada.Operario}</td>  
          <td>{entrada.Observaciones}</td>          
        </tr>
      </tbody>
    )}

    <tbody>
      <tr>
        <td colSpan="18" style={{ textAlign: 'right', fontWeight: 'bold' }}>Totales:</td>
        <td>{tara}</td>
        <td>{bruto}</td>
        <td>{neto}</td>
      </tr>
    </tbody>

  </Table>

</div>

<ReactHTMLTableToExcel
  id="test-table-xls-button"
  className="download-table-xls-button"
  table="despachos"
  filename="Reportes Despachos"
  sheet="tablexls"
  buttonText="Descargar en Excel"
  style={{ backgroundColor: '#cc444c', color: 'white', border: 'none', borderRadius: 5 }}
/>





</>) : (<>



{registrosFiltrados ? (<>

  <div style={{ height: 300, overflow: 'auto', marginBottom: 10 }}>

    <Table className="table-hover table-striped" id="despachos">
      <thead>
      <tr >
        <th className="border-0">Imprimir Recibo</th>
        <th className="border-0">Número de Tiquete</th>
        <th className="border-0">Placa</th>
        <th className="border-0">Conductor</th>
        <th className="border-0">Cedula de Ciudadania</th>
        <th className="border-0">Producto</th>
        <th className="border-0">Planta</th>
        <th className="border-0">Cliente</th>
        <th className="border-0">Transportadora</th>
        <th className="border-0">Destino</th>
        <th className="border-0">Fecha Peso Vacio</th>
        <th className="border-0">Fecha Peso Lleno</th>
        <th className="border-0">PesoT</th>
        <th className="border-0">PesoG</th>
        <th className="border-0">PesoN</th>
        <th className="border-0"># Shipment</th>
        <th className="border-0"># Sello</th>
        <th className="border-0"># R</th>
        <th className="border-0"># Contenedor</th>
        <th className="border-0">Operario</th>
        <th className="border-0">Observaciones</th>
      </tr>
      </thead>
      {registrosFiltrados?.map((entrada) =>



        <tbody key={entrada.id} >
         <tr >
          <td><button style={{ border: 'none', backgroundColor: '#cc444c', color: 'white', borderRadius: 5 }} type="button" onClick={() => guardarRecibo(entrada)}>Imprimir</button></td>
          <td>{entrada.No_Tiquete}</td>
          <td>{entrada.Placa}</td>
          <td>{entrada.Conductor}</td>
          <td>{entrada.Cedula}</td>
          <td>{entrada.Producto}</td>
          <td>{entrada.Planta}</td>
          <td>{entrada.Cliente}</td>
          <td>{entrada.Transportadora}</td>
          <td>{entrada.Destino}</td>
          <td>{entrada.Fecha_Peso_Vacio == null ?  moment.utc(entrada.Fecha_Peso_Vacio).local('es').utcOffset('-05:00').format('YYYY-MM-DD')    + "  " + entrada.Hora_Peso_Vacio : moment.utc(entrada.Fecha_Peso_Vacio).local('es').utcOffset('-05:00').format('YYYY-MM-DD')  + " " + entrada.Hora_Peso_Vacio}</td>
          <td>{entrada.Fecha_Peso_lleno == null ?  moment.utc(entrada.Fecha_Peso_lleno).local('es').utcOffset('-05:00').format('YYYY-MM-DD')  + "  " + entrada.Hora_Peso_lleno : moment.utc(entrada.Fecha_Peso_lleno).local('es').utcOffset('-05:00').format('YYYY-MM-DD') + " " + entrada.Hora_Peso_lleno}</td>
          <td>{entrada.Tara}</td>
          <td>{entrada.Bruto}</td>
          <td>{entrada.Neto}</td>
          <td>{entrada.No_Shipment}</td>
          <td>{entrada.No_Sello}</td>
          <td>{entrada.No_R}</td>
          <td>{entrada.No_Contenedor}</td>
          <td>{entrada.Operario}</td>  
          <td>{entrada.Observaciones}</td>   
        </tr>

        </tbody>



      )}

    <tbody>
      <tr>
        <td colSpan="18" style={{ textAlign: 'right', fontWeight: 'bold' }}>Totales:</td>
        <td>{tara}</td>
        <td>{bruto}</td>
        <td>{neto}</td>
      </tr>
    </tbody>

    </Table>

  </div>

  <ReactHTMLTableToExcel
    id="test-table-xls-button"
    className="download-table-xls-button"
    table="despachos"
    filename="Reportes Despachos"
    sheet="tablexls"
    buttonText="Descargar en Excel"
    style={{ backgroundColor: '#cc444c', color: 'white', border: 'none', borderRadius: 5 }}
  />



</>) : (<>



  {filtroPlaca ? (<>




    <div style={{ height: 300, overflow: 'auto', marginBottom: 10 }}>

      <Table className="table-hover table-striped" id="despachos">
        <thead>
        <tr >
        <th className="border-0">Imprimir Recibo</th>
        <th className="border-0">Número de Tiquete</th>
        <th className="border-0">Placa</th>
        <th className="border-0">Conductor</th>
        <th className="border-0">Cedula de Ciudadania</th>
        <th className="border-0">Producto</th>
        <th className="border-0">Planta</th>
        <th className="border-0">Cliente</th>
        <th className="border-0">Transportadora</th>
        <th className="border-0">Destino</th>
        <th className="border-0">Fecha Peso Vacio</th>
        <th className="border-0">Fecha Peso Lleno</th>
        <th className="border-0">PesoT</th>
        <th className="border-0">PesoG</th>
        <th className="border-0">PesoN</th>
        <th className="border-0"># Shipment</th>
        <th className="border-0"># Sello</th>
        <th className="border-0"># R</th>
        <th className="border-0"># Contenedor</th>
        <th className="border-0">Operario</th>
        <th className="border-0">Observaciones</th>
      </tr>
        </thead>
        {filtroPlaca?.slice(0, 10).map((entrada) =>



          <tbody key={entrada.No_Tiquete} >
            <tr >
          <td><button style={{ border: 'none', backgroundColor: '#cc444c', color: 'white', borderRadius: 5 }} type="button" onClick={() => guardarRecibo(entrada)}>Imprimir</button></td>
          <td>{entrada.No_Tiquete}</td>
          <td>{entrada.Placa}</td>
          <td>{entrada.Conductor}</td>
          <td>{entrada.Cedula}</td>
          <td>{entrada.Producto}</td>
          <td>{entrada.Planta}</td>
          <td>{entrada.Cliente}</td>
          <td>{entrada.Transportadora}</td>
          <td>{entrada.Destino}</td>
          <td>{entrada.Fecha_Peso_Vacio == null ?  moment.utc(entrada.Fecha_Peso_Vacio).local('es').utcOffset('-05:00').format('YYYY-MM-DD')    + "  " + entrada.Hora_Peso_Vacio : moment.utc(entrada.Fecha_Peso_Vacio).local('es').utcOffset('-05:00').format('YYYY-MM-DD')  + " " + entrada.Hora_Peso_Vacio}</td>
          <td>{entrada.Fecha_Peso_lleno == null ?  moment.utc(entrada.Fecha_Peso_lleno).local('es').utcOffset('-05:00').format('YYYY-MM-DD')  + "  " + entrada.Hora_Peso_lleno : moment.utc(entrada.Fecha_Peso_lleno).local('es').utcOffset('-05:00').format('YYYY-MM-DD') + " " + entrada.Hora_Peso_lleno}</td>
          <td>{entrada.Tara}</td>
          <td>{entrada.Bruto}</td>
          <td>{entrada.Neto}</td>
          <td>{entrada.No_Shipment}</td>
          <td>{entrada.No_Sello}</td>
          <td>{entrada.No_R}</td>
          <td>{entrada.No_Contenedor}</td>
          <td>{entrada.Operario}</td>  
          <td>{entrada.Observaciones}</td>   
        </tr>
          </tbody>



        )}

<tbody>
      <tr>
        <td colSpan="18" style={{ textAlign: 'right', fontWeight: 'bold' }}>Totales:</td>
        <td>{tara}</td>
        <td>{bruto}</td>
        <td>{neto}</td>
      </tr>
    </tbody>

      </Table>


    </div>





    <ReactHTMLTableToExcel
      id="test-table-xls-button"
      className="download-table-xls-button"
      table="despachos"
      filename="Reportes Despachos"
      sheet="tablexls"
      buttonText="Descargar en Excel"
      style={{ backgroundColor: '#cc444c', color: 'white', border: 'none', borderRadius: 5 }}
    />




  </>) : (<>


    <div style={{ height: 300, overflow: 'auto', marginBottom: 10 }}>

      <Table className="table-hover table-striped" id="despachos">
        <thead >
        <tr >
        <th className="border-0">Imprimir Recibo</th>
        <th className="border-0">Número de Tiquete</th>
        <th className="border-0">Placa</th>
        <th className="border-0">Conductor</th>
        <th className="border-0">Cedula de Ciudadania</th>
        <th className="border-0">Producto</th>
        <th className="border-0">Planta</th>
        <th className="border-0">Cliente</th>
        <th className="border-0">Transportadora</th>
        <th className="border-0">Destino</th>
        <th className="border-0">Fecha Peso Vacio</th>
        <th className="border-0">Fecha Peso Lleno</th>
        <th className="border-0">PesoT</th>
        <th className="border-0">PesoG</th>
        <th className="border-0">PesoN</th>
        <th className="border-0"># Shipment</th>
        <th className="border-0"># Sello</th>
        <th className="border-0"># R</th>
        <th className="border-0"># Contenedor</th>
        <th className="border-0">Operario</th>
        <th className="border-0">Observaciones</th>
      </tr>
        </thead>
        {registrosEntrada?.slice(0, 10).map((entrada) =>



          <tbody key={entrada.No_Tiquete} >
             <tr >
          <td><button style={{ border: 'none', backgroundColor: '#cc444c', color: 'white', borderRadius: 5 }} type="button" onClick={() => guardarRecibo(entrada)}>Imprimir</button></td>
          <td>{entrada.No_Tiquete}</td>
          <td>{entrada.Placa}</td>
          <td>{entrada.Conductor}</td>
          <td>{entrada.Cedula}</td>
          <td>{entrada.Producto}</td>
          <td>{entrada.Planta}</td>
          <td>{entrada.Cliente}</td>
          <td>{entrada.Transportadora}</td>
          <td>{entrada.Destino}</td>
          <td>{entrada.Fecha_Peso_Vacio == null ?  moment.utc(entrada.Fecha_Peso_Vacio).local('es').utcOffset('-05:00').format('YYYY-MM-DD')    + "  " + entrada.Hora_Peso_Vacio : moment.utc(entrada.Fecha_Peso_Vacio).local('es').utcOffset('-05:00').format('YYYY-MM-DD')  + " " + entrada.Hora_Peso_Vacio}</td>
          <td>{entrada.Fecha_Peso_lleno == null ?  moment.utc(entrada.Fecha_Peso_lleno).local('es').utcOffset('-05:00').format('YYYY-MM-DD')  + "  " + entrada.Hora_Peso_lleno : moment.utc(entrada.Fecha_Peso_lleno).local('es').utcOffset('-05:00').format('YYYY-MM-DD') + " " + entrada.Hora_Peso_lleno}</td>
          <td>{entrada.Tara}</td>
          <td>{entrada.Bruto}</td>
          <td>{entrada.Neto}</td>
          <td>{entrada.No_Shipment}</td>
          <td>{entrada.No_Sello}</td>
          <td>{entrada.No_R}</td>
          <td>{entrada.No_Contenedor}</td>
          <td>{entrada.Operario}</td>  
          <td>{entrada.Observaciones}</td> 
        </tr>

          </tbody>

        )}

<tbody>
      <tr>
        <td colSpan="18" style={{ textAlign: 'right', fontWeight: 'bold' }}>Totales:</td>
        <td>{tara}</td>
        <td>{bruto}</td>
        <td>{neto}</td>
      </tr>
    </tbody>

      </Table>
    </div>

    <ReactHTMLTableToExcel
      id="test-table-xls-button"
      className="download-table-xls-button"
      table="despachos"
      filename="Reportes Despachos"
      sheet="tablexls"
      buttonText="Descargar en Excel"
      style={{ backgroundColor: '#cc444c', color: 'white', border: 'none', borderRadius: 5 }}
    />



  </>)}





</>)}



</>)}

{reimprimir ? (<>

<ReimprimirDespacho Estado={setReimprimir} Recibo2={recibo2} />


</>) : (<></>)}
</>)}
    </>
  )
}
