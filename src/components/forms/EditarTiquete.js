import React, { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from "yup"
import swal from 'sweetalert';
import useAuth from 'hooks/useAuth';
import { buscarTiquete, updateTiquete } from "API/tiquete";

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


export default function EditarTiquete() {

  const [busqueda, setBusqueda] = useState(null);
  const [proceso, setProceso] = useState(null);
  const [valor, setValor] = useState(null);

  const { auth } = useAuth();


  const formik = useFormik({
    initialValues: {
      placa: "",
      conductor: "",
      planta: "",
      transportadora: "",
      fechaIngreso: "",
      horaIngreso: "",
      fechaSalida: "",
      horaSalida: "",
      origenDestino: "",
      cedula: "",
      producto: "",
      cliente: "",
      bruto: "",
      tara: "",
      neto: "",
      operario: "",
      observaciones: "",
      NoTiquete: "",
    },
    validationSchema: Yup.object({
      placa: Yup.string(),
      conductor: Yup.string(),
      planta: Yup.string(),
      transportadora: Yup.string(),
      fechaIngreso: Yup.string(),
      horaIngreso: Yup.string(),
      fechaSalida: Yup.string(),
      horaSalida: Yup.string(),
      origenDestino: Yup.string(),
      cedula: Yup.string(),
      producto: Yup.string(),
      cliente: Yup.string(),
      bruto: Yup.string(),
      tara: Yup.string(),
      neto: Yup.string(),
      operario: Yup.string(),
      observaciones: Yup.string(),
      NoTiquete: Yup.string()
    }),
    onSubmit: async (formValue) => {



      const response = await updateTiquete(formValue, auth, proceso)
      console.log(response)

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

      if (response?.rowsAffected) {
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

    const response = await buscarTiquete(proceso, valor, auth);
    console.log('[EditTransportadora.js 118]' + JSON.stringify(response));

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

      const formatoHora = (horaSql) => {
        // Suponiendo que response[0].hora_peso_vacio es "6:55:13"

        const [hora, minuto, segundo] = horaSql.split(':');
        const horaFormatoCorrecto = `${hora.padStart(2, '0')}:${minuto}`; // Esto da "06:55"
        return horaFormatoCorrecto

      }
      formik.setFieldValue('placa', response?.[0].Placa);
      formik.setFieldValue('conductor', response?.[0].Conductor)
      formik.setFieldValue('planta', response?.[0].Planta)
      formik.setFieldValue('transportadora', response?.[0].Transportadora)
      formik.setFieldValue('fechaIngreso', response?.[0].Producto ? response?.[0].Fecha_Peso_Vacio.split('T')[0] : response?.[0].Fecha_Peso_lleno.split('T')[0]);
      formik.setFieldValue('horaIngreso', response?.[0].Producto ? formatoHora(response?.[0].Hora_Peso_Vacio) : formatoHora(response?.[0].Hora_Peso_lleno));
      formik.setFieldValue('fechaSalida', response?.[0].Producto ? response?.[0].Fecha_Peso_lleno.split('T')[0] : response?.[0].Fecha_Peso_Vacio.split('T')[0]);
      formik.setFieldValue('horaSalida', response?.[0].Producto ? formatoHora(response?.[0].Hora_Peso_lleno) : formatoHora(response?.[0].Hora_Peso_Vacio));
      formik.setFieldValue('origenDestino', response?.[0].Origen ? response?.[0].Origen : response?.[0].Destino)
      formik.setFieldValue('cedula', response?.[0].Cedula)
      formik.setFieldValue('producto', response?.[0].Producto ? response?.[0].Producto : response?.[0].Materia_prima)
      formik.setFieldValue('cliente', response?.[0].Proveedor ? response?.[0].Proveedor : response?.[0].Cliente)
      formik.setFieldValue('bruto', response?.[0].Bruto)
      formik.setFieldValue('tara', response?.[0].Tara)
      formik.setFieldValue('neto', response?.[0].Neto)
      formik.setFieldValue('operario', response?.[0].Operario)
      formik.setFieldValue('observaciones', response?.[0].Observaciones)
      formik.setFieldValue('NoTiquete', response?.[0].No_Tiquete)
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



  return (
    <tbody  >
      <tr >
        <td>

          {busqueda ? (<>

            {/* onSubmit={formik.handleSubmit} */}
            <button style={{ marginBottom: -50, backgroundColor: '#FFF', border: 'none', color: 'BLACK', borderRadius: 10, fontSize: 10, marginTop: -30 }} type='button' onClick={() => setBusqueda(null)}>{`<-`}</button>

            <Form onSubmit={formik.handleSubmit} >

              <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

                <Col className="pr-1" md="4">
                  <Form.Group>
                    <label style={{ color: '#fff' }}>Placa</label>
                    <Form.Control
                      name="placa"
                      placeholder="placa"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.placa}
                      isInvalid={formik.errors.placa}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="pl-1" md="4">
                  <Form.Group>
                    <label style={{ color: '#fff' }}>Conductor</label>
                    <Form.Control
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
                <Col className="pr-1" md="4">
                  <Form.Group>
                    <label style={{ color: '#fff' }}>Planta</label>
                    <Form.Control
                      name="planta"
                      placeholder="Planta"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.planta}
                      isInvalid={formik.errors.planta}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

                <Col className="pl-1" md="4">
                  <Form.Group>
                    <label style={{ color: '#fff' }}>Transportadora</label>
                    <Form.Control
                      name="transportadora"
                      placeholder="Transportadora"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.transportadora}
                      isInvalid={formik.errors.transportadora}
                    ></Form.Control>
                  </Form.Group>
                </Col>


                <Col className="pr-1" md="4">
                  <Form.Group>
                    <label style={{ color: '#fff' }}>Fecha de ingreso</label>
                    <Form.Control
                      name="fechaIngreso"
                      placeholder="Fecha de ingreso"
                      type="date"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.fechaIngreso}
                      isInvalid={formik.errors.fechaIngreso}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="pr-1" md="4">
                  <Form.Group>
                    <label style={{ color: '#fff' }}>Hora de ingreso</label>
                    <Form.Control
                      name="horaIngreso"
                      placeholder="Hora de ingreso"
                      type="time"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.horaIngreso}
                      isInvalid={formik.errors.horaIngreso}
                    ></Form.Control>
                  </Form.Group>
                </Col>


              </Row>


              <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>



                <Col className="pr-1" md="4">
                  <Form.Group>
                    <label style={{ color: '#fff' }}>Fecha de salida</label>
                    <Form.Control
                      name="fechaSalida"
                      placeholder="Fecha de salida"
                      type="date"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.fechaSalida}
                      isInvalid={formik.errors.fechaSalida}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="pr-1" md="4">
                  <Form.Group>
                    <label style={{ color: '#fff' }}>Hora de salida</label>
                    <Form.Control
                      name="horaSalida"
                      placeholder="Hora de salida"
                      type="time"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.horaSalida}
                      isInvalid={formik.errors.horaSalida}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="pl-1" md="4">
                  <Form.Group>
                    <label style={{ color: '#fff' }}>Origen/Destino</label>
                    <Form.Control
                      name="origenDestino"
                      placeholder="Origen/Destino"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.origenDestino}
                      isInvalid={formik.errors.origenDestino}
                    ></Form.Control>
                  </Form.Group>
                </Col>



              </Row>



              <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                <Col className="pl-1" md="4">
                  <Form.Group>
                    <label style={{ color: '#fff' }}>Cedula</label>
                    <Form.Control
                      name="cedula"
                      placeholder="Cedula"
                      type="number"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cedula}
                      isInvalid={formik.errors.cedula}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col className="pl-1" md="4">
                  <Form.Group>
                    <label style={{ color: '#fff' }} htmlFor="exampleInputEmail1">
                      Producto / Materia Prima
                    </label>
                    <Form.Control
                      name="producto"
                      placeholder="Producto"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.producto}
                      isInvalid={formik.errors.producto}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col className="pl-1" md="4">
                  <Form.Group>
                    <label style={{ color: '#fff' }} htmlFor="exampleInputEmail1">
                      Cliente / Proveedor
                    </label>
                    <Form.Control
                      name="cliente"
                      placeholder="Cliente"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cliente}
                      isInvalid={formik.errors.cliente}
                    ></Form.Control>
                  </Form.Group>
                </Col>


              </Row>

              <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                <Col className="pl-1" md="4">
                  <Form.Group>
                    <label style={{ color: '#fff' }} htmlFor="exampleInputEmail1">
                      Bruto
                    </label>
                    <Form.Control
                      name="bruto"
                      placeholder="Bruto"
                      type="number"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.bruto}
                      isInvalid={formik.errors.bruto}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="pl-1" md="4">
                  <Form.Group>
                    <label style={{ color: '#fff' }} htmlFor="exampleInputEmail1">
                      Tara
                    </label>
                    <Form.Control
                      name="tara"
                      placeholder="Tara"
                      type="number"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.tara}
                      isInvalid={formik.errors.tara}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="pl-1" md="4">
                  <Form.Group>
                    <label style={{ color: '#fff' }} htmlFor="exampleInputEmail1">
                      Neto
                    </label>
                    <Form.Control
                      name="neto"
                      placeholder="Neto"
                      type="number"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.neto}
                      isInvalid={formik.errors.neto}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                <Col className="pl-1" md="4">
                  <Form.Group>
                    <label style={{ color: '#fff' }} htmlFor="exampleInputEmail1">
                      Operario
                    </label>
                    <Form.Control
                      name="operario"
                      placeholder="Operario"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.operario}
                      isInvalid={formik.errors.operario}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col className="pl-1" md="4">
                  <Form.Group>
                    <label style={{ color: '#fff' }} htmlFor="exampleInputEmail1">
                      Observaciones
                    </label>
                    <Form.Control
                      name="observaciones"
                      placeholder="Observaciones"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.observaciones}
                      isInvalid={formik.errors.observaciones}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                
              </Row>

            

              <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                

                <Col className="pl-1" md="4">
                  <Form.Group>
                    <label style={{ color: '#fff' }} htmlFor="exampleInputEmail1">
                      Tiquete
                    </label>
                    <Form.Control
                      name="NoTiquete"
                      placeholder="Tiquete"
                      type="text"
                      disabled
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.NoTiquete}
                      isInvalid={formik.errors.NoTiquete}
                    ></Form.Control>
                  </Form.Group>
                </Col>

              </Row>
              <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>




                <Button type="submit" style={{ marginTop: '2vh', backgroundColor: '#fff', marginLeft: '4vh', color: '#000', border: 'none', borderRadius: 10 }} variant="info">
                  Guardar
                </Button>
              </Row>











            </Form></>) : (<>
              <Row>

                <label htmlFor="exampleInputEmail1" style={{ color: '#fff' }}>
                  Buscar Tiquete
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
                            <Dropdown.Item onClick={() => setProceso('Despachos')}>Despachos</Dropdown.Item>
                            <Dropdown.Item onClick={() => setProceso('Ingresos')}>Ingresos</Dropdown.Item>




                          </Dropdown.Menu>
                        </Dropdown>
                      </Col>
                    </Row>

                  </>) : proceso === 'Despachos' ? (<>
                    <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>
                      <Col className="pl-1" md="3s">
                        <Button style={{ border: 'none', backgroundColor: '#fff', color: "#cc444c", marginTop: 25 }} variant='info' onClick={() => setProceso('')}>
                          Despachos
                        </Button>
                      </Col>
                    </Row>
                  </>) : proceso === 'Ingresos' ? (<>
                    <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>
                      <Col className="pl-1" md="3s">
                        <Button style={{ border: 'none', backgroundColor: '#fff', color: "#cc444c", marginTop: 25 }} variant='info' onClick={() => setProceso('')}>
                          Ingresos
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
              </Button></>)}

        </td>
      </tr>
    </tbody>
  )

}