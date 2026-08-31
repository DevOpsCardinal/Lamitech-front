import React, { useState, useEffect } from "react";
import { getEntradasProductoApi } from "API/entrada";
import useAuth from "hooks/useAuth";
import { getEntradasPorFechaApi } from "API/entrada";
import * as Yup from "yup";
import { useFormik } from "formik";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { getEntradasApi } from "API/entrada";
import { deleteTransito } from "API/entrada";
import { useNavigate } from "react-router-dom";
import { cierreManual } from "API/despachoSalida";
import moment from "moment/moment";
moment.locale('es');



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
  Form
} from "react-bootstrap";
import swal from "sweetalert";
import { isAwaitExpression } from "typescript";


export default function DespachoProducto() {
  const navigate = useNavigate();
  const { auth } = useAuth()
  const [registrosEntrada, setRegistrosEntrada] = useState(null)
  const [registrosFiltrados, setRegistrosFiltrados] = useState(null)
  const [ultimoFiltro, setUltimoFiltro] = useState(null)

  useEffect(() => {
    (async () => {
      const response = await getEntradasApi(auth)
      console.log("responseresponseresponseresponseresponseresponseresponse", response)
      setRegistrosEntrada(response)

    })()
  }, [])

  const eliminar = async (dato) => {
    swal({
      title: "Esta seguro de eliminar este registro?",
      text: "No prodras recuperarlo nunca",
      type: "warning",
      ShowCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: "Si",
      cancelButtonText: "No",

    }).then(async function () {
      swal(
        'Borrado',
      )
      const response = await deleteTransito(auth, dato)
      console.log(response)
      const response2 = await getEntradasApi(auth)
      setRegistrosEntrada(response2)
    })
  }


  const cerrar = async (dato) => {
    swal({
      title: "Esta seguro de eliminar este registro?",
      text: "No prodras recuperarlo nunca",
      type: "warning",
      ShowCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: "Si",
      cancelButtonText: "No",

    }).then(async function () {
      swal(
        'Borrado',
        'deleted',
        'success'
      )


      const response2 = await cierreManual(auth, dato)

      const response = await deleteTransito(auth, dato)
      console.log(response)
      const response3 = await getEntradasApi(auth)
      setRegistrosEntrada(response3)
    })
  }



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
      console.log(formValue)
      const response = await getEntradasPorFechaApi(auth, fechaInicial, fechaFinal)
      setRegistrosFiltrados(response)
      formik.resetForm()
    }
  })

  const filtrar = query => {


    if (registrosFiltrados) {
      const result = registrosFiltrados?.data.filter(function (lista) {
        return lista?.attributtes.noTiquete.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
      })
      setUltimoFiltro(result)
    } else {

      const result = registrosEntrada?.data.filter(function (lista) {
        return lista?.attributtes.noTiquete.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
      })
      setUltimoFiltro(result)
    }


  }

  const guardarRecibo = (placa) => {
    navigate('/admin/reimprimirTransito', { state: { placa, Recibo2: placa } });
  }

  return (

    <>

      <Col className="pl-1" md="4" style={{ marginBottom: 10 }}>
        <Form.Group>
          <label htmlFor="exampleInputEmail1">
            Filtro por placa
          </label>
          <Form.Control
            name="fechaFinal"
            placeholder="Filtro por placa"
            type="text"
            onChange={(e) => filtrar(e.target.value)}

          ></Form.Control>
        </Form.Group>
      </Col>

      {ultimoFiltro ? (<>





        <div style={{ height: 300, overflow: 'auto', marginBottom: 10 }}>
          <Table className="table-hover table-striped" id="table-to-xls">

            <thead>

              <tr>
                <th className="border-0"></th>

                <th className="border-0">Placa</th>
                <th className="border-0">Conductor</th>
                <th className="border-0">Cedula de Ciudadania</th>
                <th className="border-0">Producto</th>
                <th className="border-0">Planta</th>
                <th className="border-0">Cliente</th>
                <th className="border-0">Transportadora</th>
                <th className="border-0">Destino</th>
                <th className="border-0">Paso Vacio</th>
                <th className="border-0">Hora paso vacio</th>
                <th className="border-0">Paso Lleno</th>
                <th className="border-0">Hora paso lleno</th>
                <th className="border-0">PesoT</th>
                <th className="border-0">PesoG</th>
                <th className="border-0"># Shipment</th>
                <th className="border-0"># Sello</th>
                <th className="border-0"># R</th>
                <th className="border-0"># Contenedor</th>
                <th className="border-0">Operario</th>
                <th className="border-0">Observaciones</th>
                {auth.rango == 100 && <th className="border-0">Eliminar</th>}
               




              </tr>
            </thead>
            {ultimoFiltro?.map((entrada) =>



              <tbody key={entrada.id}>
                <tr>
                  <td style={{color: 'green'}}>{entrada.Caso}</td>
                  <td>{entrada.Placa}</td>
                  <td>{entrada.Conductor}</td>
                  <td>{entrada.Cedula}</td>
                  <td>{entrada.MateriaPrima_Producto}</td>
                  <td>{entrada.Planta}</td>
                  <td>{entrada.Cliente_Proveedor}</td>
                  <td>{entrada.Transportadora}</td>
                  <td>{entrada.Origen_Destino}</td>
                  <td>{entrada.Fecha_peso_vacio}</td>
                  <td>{entrada.Hora_peso_vacio}</td>
                  <td>{entrada.Fecha_peso_lleno}</td>
                  <td>{entrada.Hora_peso_lleno}</td>
                  <td>{entrada.Tara}</td>
                  <td>{entrada.Bruto}</td>
                  <td>{entrada.No_Shipment}</td>
                  <td>{entrada.No_Sello}</td>
                  <td>{entrada.No_R}</td>
                  <td>{entrada.No_Contenedor}</td>
                  <td>{entrada.Operario}</td>  
                  <td>{entrada.Observaciones}</td>      

                  {auth.rango == 100 && <th className="border-0"><button type="button" onClick={() => eliminar(entrada.Placa)}>Eliminar</button></th>}
                </tr>
              </tbody>
            )}
          </Table>
        </div>

        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="table-to-xls"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Descargar en Excel" />







      </>) : (<>
        {registrosFiltrados ? (<>
          <div style={{ height: 300, overflow: 'auto', marginBottom: 10 }}>
            <Table className="table-hover table-striped" id="table-to-xls">

              <thead>

                <tr>

                <th className="border-0"></th>
                <th className="border-0">Placa</th>
                <th className="border-0">Conductor</th>
                <th className="border-0">Cedula de Ciudadania</th>
                <th className="border-0">Producto</th>
                <th className="border-0">Planta</th>
                <th className="border-0">Cliente</th>
                <th className="border-0">Transportadora</th>
                <th className="border-0">Destino</th>
                <th className="border-0">Paso Vacio</th>
                <th className="border-0">Hora paso vacio</th>
                <th className="border-0">Paso Lleno</th>
                <th className="border-0">Hora paso lleno</th>
                <th className="border-0">PesoT</th>
                <th className="border-0">PesoG</th>
                <th className="border-0"># Shipment</th>
                <th className="border-0"># Sello</th>
                <th className="border-0"># R</th>
                <th className="border-0"># Contenedor</th>
                <th className="border-0">Operario</th>
                <th className="border-0">Observaciones</th>
                {auth.rango == 100 && <th className="border-0">Eliminar</th>}




                </tr>
              </thead>
              {registrosFiltrados?.map((entrada) =>



                <tbody key={entrada.id}>
                  <tr>
                  <td style={{color: 'green'}}>{entrada.Caso}</td>
                  <td>{entrada.Placa}</td>
                  <td>{entrada.Conductor}</td>
                  <td>{entrada.Cedula}</td>
                  <td>{entrada.MateriaPrima_Producto}</td>
                  <td>{entrada.Planta}</td>
                  <td>{entrada.Cliente_Proveedor}</td>
                  <td>{entrada.Transportadora}</td>
                  <td>{entrada.Origen_Destino}</td>
                  <td>{entrada.Fecha_peso_vacio}</td>
                  <td>{entrada.Hora_peso_vacio}</td>
                  <td>{entrada.Fecha_peso_lleno}</td>
                  <td>{entrada.Hora_peso_lleno}</td>
                  <td>{entrada.Tara}</td>
                  <td>{entrada.Bruto}</td>
                  <td>{entrada.No_Shipment}</td>
                  <td>{entrada.No_Sello}</td>
                  <td>{entrada.No_R}</td>
                  <td>{entrada.No_Contenedor}</td>
                  <td>{entrada.Operario}</td>  
                  <td>{entrada.Observaciones}</td>      

                  {auth.rango == 100 && <th className="border-0"><button type="button" onClick={() => eliminar(entrada.Placa)}>Eliminar</button></th>}

                  </tr>

                </tbody>

              )}

            </Table>

          </div>

          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button"
            table="table-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Descargar en Excel" />

        </>) : (<>


          <div style={{ height: 300, overflow: 'auto', marginBottom: 10 }}>

            <Table className="table-hover table-striped" id="table-to-xls">

              <thead>

                <tr>
                <th className="border-0"></th>
                <th className="border-0">Placa</th>
                <th className="border-0">Conductor</th>
                <th className="border-0">Cedula de Ciudadania</th>
                <th className="border-0">Producto</th>
                <th className="border-0">Planta</th>
                <th className="border-0">Cliente</th>
                <th className="border-0">Transportadora</th>
                <th className="border-0">Destino</th>
                <th className="border-0">Paso Vacio</th>
                <th className="border-0">Hora paso vacio</th>
                <th className="border-0">Paso Lleno</th>
                <th className="border-0">Hora paso lleno</th>
                <th className="border-0">PesoT</th>
                <th className="border-0">PesoG</th>
                <th className="border-0"># Shipment</th>
                <th className="border-0"># Sello</th>
                <th className="border-0"># R</th>
                <th className="border-0"># Contenedor</th>
                <th className="border-0">Operario</th>
                <th className="border-0">Observaciones</th>
                {auth.rango == 100 && <th className="border-0">Eliminar</th>}


                </tr>
              </thead>
              {registrosEntrada?.map((entrada) =>



                <tbody key={entrada.id}>
              <tr>
                  <td style={{color: 'green'}}>{entrada.Caso}</td>
                  <td>{entrada.Placa}</td>
                  <td>{entrada.Conductor}</td>
                  <td>{entrada.Cedula}</td>
                  <td>{entrada.MateriaPrima_Producto}</td>
                  <td>{entrada.Planta}</td>
                  <td>{entrada.Cliente_Proveedor}</td>
                  <td>{entrada.Transportadora}</td>
                  <td>{entrada.Origen_Destino}</td>
                  <td>{entrada.Fecha_peso_vacio}</td>
                  <td>{entrada.Hora_peso_vacio}</td>
                  <td>{entrada.Fecha_peso_lleno}</td>
                  <td>{entrada.Hora_peso_lleno}</td>
                  <td>{entrada.Tara}</td>
                  <td>{entrada.Bruto}</td>
                  <td>{entrada.No_Shipment}</td>
                  <td>{entrada.No_Sello}</td>
                  <td>{entrada.No_R}</td>
                  <td>{entrada.No_Contenedor}</td>
                  <td>{entrada.Operario}</td>  
                  <td>{entrada.Observaciones}</td>      

                  {auth.rango == 100 && <th className="border-0"><button type="button" onClick={() => eliminar(entrada.Placa)}>Eliminar</button></th>}

                  </tr>

                </tbody>

              )}

            </Table>

          </div>

          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button"
            table="table-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Descargar en Excel" />

        </>)}






      </>)}



    </>
  )
}
