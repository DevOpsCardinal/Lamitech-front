import React, { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from "yup"
import swal from 'sweetalert';
import useAuth from 'hooks/useAuth';
import { buscarTiquete, updateTiquete } from "API/tiquete";
import Modal from "components/modals/modalPdfUltimaSalida";
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
import { ultimaSalidaApi } from "API/despachoSalida";


export default function ultimaSalida() {

  const [busqueda, setBusqueda] = useState(null);
  const [proceso, setProceso] = useState(null);
  const [valor, setValor] = useState(null);
  const [pdf, setPdf] = useState(null);


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

    console.log(valor, proceso);

    const api = await ultimaSalidaApi(auth, proceso, valor)
    console.log("api: ", api);

    if(api.rowsAffected){
      setPdf(true)
    }
    
    
  }



  return (
    <div>
      {pdf ? (<>
      
        <Modal  pesoNumEnv={null} setPdf={setPdf} checkDespacho={proceso == "Ingresos" ? false : true} checkEntrada={null} placa={valor}/>
      </>): (<>
      
        <tbody  >
        <tr >
          <td>

            
                <Row>

                  <label htmlFor="exampleInputEmail1" style={{ color: '#fff' }}>
                    Ultima salida
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
                        Escribe la placa
                      </label>
                      <Form.Control

                          value={valor}  // Vinculando el valor del input al estado
                          onChange={(event) => setValor(event.target.value.toUpperCase())}

                      ></Form.Control>
                    </Form.Group>
                  </Col>


                  

                </Row>


                <Button onClick={() => CambiarEstado()} style={{ marginTop: '3vh', backgroundColor: '#fff', border: 'none', color: '#cc444c', borderRadius: 10 }} variant="info">
                  Buscar
                </Button>

          </td>
        </tr>
      </tbody>
      </>)}
      
    </div>
  )

}