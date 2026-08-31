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
import { get100Trailers } from "API/trailer";
import { getTrailersfechaApi } from "API/trailer";


export default function ReporteTrailer() {
  const navigate = useNavigate();
  const { auth } = useAuth()
  const [registrosEntrada, setRegistrosEntrada] = useState(null)
  const [registrosFiltrados, setRegistrosFiltrados] = useState(null)
  const [ultimoFiltro, setUltimoFiltro] = useState(null)

  useEffect(() => {
    (async () => {
      const response = await get100Trailers(auth)
      console.log("responseresponseresponseresponseresponseresponseresponse", response)
      setRegistrosEntrada(response)

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
      console.log(formValue)
      const response = await getTrailersfechaApi(auth, fechaInicial, fechaFinal)
      setRegistrosFiltrados(response)
      formik.resetForm()
    }
  })

  const filtrar = query => {


    if (registrosFiltrados) {
      const result = registrosFiltrados?.filter(function (lista) {
        return lista?.Trailer.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
      })
      setUltimoFiltro(result)
    } else {

      const result = registrosEntrada?.filter(function (lista) {
        return lista?.Trailer.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
      })
      setUltimoFiltro(result)
    }


  }

  const guardarRecibo = (placa) => {
    navigate('/admin/reimprimirTransito', { state: { placa, Recibo2: placa } });
  }

  function fechaSql(fecha){
    if(fecha){
      console.log("fecha", fecha);
      const partes = fecha?.split('T')
      console.log("Partes: ", partes[0]);

      if(partes[0] == '1900-01-01'){
        return ''
      }
      
      return partes[0]
    }else {
      return ''
    }
  
  }
  return (

    <>

      
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

      {ultimoFiltro ? (<>





        <div style={{ height: 300, overflow: 'auto', marginBottom: 10 }}>
          <Table className="table-hover table-striped" id="table-to-xls">

            <thead>

            <tr>
                
                <th className="border-0">Trailer</th>
                <th className="border-0">Fecha entrada</th>
                <th className="border-0">Fecha salida</th>
                <th className="border-0">Hora entrada</th>
                <th className="border-0">Hora salida</th>
                <th className="border-0">Gross entrada</th>
                <th className="border-0">Peso entrada</th>
                <th className="border-0">Peso salida</th>
                <th className="border-0">Peso trailer</th>
                <th className="border-0">Placa entrada</th>
                <th className="border-0">Placa salida</th>
                </tr>
            </thead>
            {ultimoFiltro?.map((entrada) =>



              <tbody key={entrada.id}>
                  <tr>
                  
                  <td>{entrada.Trailer}</td>
                  <td>{fechaSql(entrada.Fecha_Entrada)}</td>
                  <td>{fechaSql(entrada.Fecha_Salida)}</td>
                  <td>{entrada.Hora_Entrada}</td>
                  <td>{entrada.Hora_Salida}</td>
                  <td>{entrada.Gross_Entrada}</td>
                  <td>{entrada.Peso_Entrada}</td>
                  <td>{entrada.Peso_Salida}</td>
                  <td>{entrada.Peso_Trailer}</td>
                  <td>{entrada.Placa_Entrada}</td>
                  <td>{entrada.Placa_Salida}</td>
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
                
                <th className="border-0">Trailer</th>
                <th className="border-0">Fecha entrada</th>
                <th className="border-0">Fecha salida</th>
                <th className="border-0">Hora entrada</th>
                <th className="border-0">Hora salida</th>
                <th className="border-0">Gross entrada</th>
                <th className="border-0">Peso entrada</th>
                <th className="border-0">Peso salida</th>
                <th className="border-0">Peso trailer</th>
                <th className="border-0">Placa entrada</th>
                <th className="border-0">Placa salida</th>
                </tr>
              </thead>
              {registrosFiltrados?.map((entrada) =>



                <tbody key={entrada.id}>
                    <tr>
                  
                  <td>{entrada.Trailer}</td>
                  <td>{fechaSql(entrada.Fecha_Entrada)}</td>
                  <td>{fechaSql(entrada.Fecha_Salida)}</td>
                  <td>{entrada.Hora_Entrada}</td>
                  <td>{entrada.Hora_Salida}</td>
                  <td>{entrada.Gross_Entrada}</td>
                  <td>{entrada.Peso_Entrada}</td>
                  <td>{entrada.Peso_Salida}</td>
                  <td>{entrada.Peso_Trailer}</td>
                  <td>{entrada.Placa_Entrada}</td>
                  <td>{entrada.Placa_Salida}</td>
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
                
                <th className="border-0">Trailer</th>
                <th className="border-0">Fecha entrada</th>
                <th className="border-0">Fecha salida</th>
                <th className="border-0">Hora entrada</th>
                <th className="border-0">Hora salida</th>
                <th className="border-0">Gross entrada</th>
                <th className="border-0">Peso entrada</th>
                <th className="border-0">Peso salida</th>
                <th className="border-0">Peso trailer</th>
                <th className="border-0">Placa entrada</th>
                <th className="border-0">Placa salida</th>
                </tr>
              </thead>
              {registrosEntrada?.map((entrada) =>



                <tbody key={entrada.id}>
              <tr>
                  
                  <td>{entrada.Trailer}</td>
                  <td>{fechaSql(entrada.Fecha_Entrada)}</td>
                  <td>{fechaSql(entrada.Fecha_Salida)}</td>
                  <td>{entrada.Hora_Entrada}</td>
                  <td>{entrada.Hora_Salida}</td>
                  <td>{entrada.Gross_Entrada}</td>
                  <td>{entrada.Peso_Entrada}</td>
                  <td>{entrada.Peso_Salida}</td>
                  <td>{entrada.Peso_Trailer}</td>
                  <td>{entrada.Placa_Entrada}</td>
                  <td>{entrada.Placa_Salida}</td>
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
