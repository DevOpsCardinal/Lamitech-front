import React,{useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup"
import swal from 'sweetalert';
import useAuth from 'hooks/useAuth';
import { traerOrigen, updateOrigen } from "API/origen";

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



  export default function EditarOrigen(){
    const [busqueda, setBusqueda] = useState(null);
    const [proceso, setProceso] = useState(null);
    const [valor, setValor] = useState(null);

    const { auth } = useAuth();

    const formik = useFormik({
        initialValues: {
          codigo: "",
          nombre: "",
          detalles: "",
         
        },
        validationSchema: Yup.object({
          codigo: Yup.string().required(true),
          nombre: Yup.string().required(true),
          detalles: Yup.string(),
          
        }),
        onSubmit: async (formValue) => {
          const response = await updateOrigen(formValue, auth, busqueda)
          console.log(response)
          if (response.error) {
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
          if (response.result.rowsAffected) {
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
      const CambiarEstado = async() =>{
        if(valor == "" || valor == null){
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
      const response = await traerOrigen(proceso,valor, auth)
      console.log('[EditPlanta]'+ response);
      if(response?.length == 0){
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
      if(response?.[0]){
        formik.setFieldValue('codigo', response?.[0].Codigo)
        formik.setFieldValue('nombre',response?.[0].Nombre)
        formik.setFieldValue('detalles',response?.[0].Detalles)
      
        setBusqueda(response)
      }else{
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
                {busqueda? (<>
              
                    <button style={{ marginBottom: 20, backgroundColor: '#FFF',  border: 'none', color: 'BLACK', borderRadius: 10, fontSize: 40 }} type='button' onClick={() => setBusqueda(null)}>{`<-`}</button>
          <Form onSubmit={formik.handleSubmit}>
            <h4 style={{ color: '#fff' }}>Registrar Origen</h4>
            <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

              <Col className="pr-1" md="5">
                <Form.Group>
                  <label style={{ color: '#fff' }}>Codigo</label>
                  <Form.Control
                    name="codigo"
                    placeholder="codigo"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.codigo}
                    isInvalid={formik.errors.codigo}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col className="px-1" md="5">
                <Form.Group>
                  <label style={{ color: '#fff' }}>Nombre</label>
                  <Form.Control
                    name="nombre"
                    placeholder="nombre"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nombre}
                    isInvalid={formik.errors.nombre}
                  ></Form.Control>
                </Form.Group>
              </Col>


              <Col style={{ marginTop: 10 }} className="pl-1" md="5">
                <Form.Group>
                  <label style={{ color: '#fff' }}>Detalles</label>
                  <Form.Control
                    name="detalles"
                    placeholder="Detalles"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.detalles}
                    isInvalid={formik.errors.detalles}
                  ></Form.Control>
                </Form.Group>
              </Col>
              
            </Row>
            <Button type="submit" style={{ marginTop: '5vh', backgroundColor: '#fff', marginLeft: '4vh', color: '#000', border: 'none', borderRadius: 10 }} variant="info">
                            Guardar
                        </Button>



          </Form></>):(<>
          
          <Row>

<label htmlFor="exampleInputEmail1" style={{ color: '#fff' }}>
  Buscar Origen
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
                      <Dropdown.Item onClick={() => setProceso('Codigo')}>Codigo</Dropdown.Item>
                      <Dropdown.Item onClick={() => setProceso('Nombre')}>Nombre</Dropdown.Item>
                      <Dropdown.Item onClick={() => setProceso('Detalles')}>Detalles</Dropdown.Item>
                      

                  </Dropdown.Menu>
              </Dropdown>
          </Col>
      </Row>

  </>) : proceso === 'Codigo' ? (<>
      <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>
          <Col className="pl-1" md="3s">
              <Button style={{ border: 'none', backgroundColor: '#fff', color: "#cc444c", marginTop: 25 }} variant='info' onClick={() => setProceso('')}>
                  Codigo
              </Button>
          </Col>
      </Row>
  </>) : proceso === 'Nombre' ? (<>
      <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>
          <Col className="pl-1" md="3s">
              <Button style={{ border: 'none', backgroundColor: '#fff', color: "#cc444c", marginTop: 25 }} variant='info' onClick={() => setProceso('')}>
                  Nombre
              </Button>
          </Col>
      </Row>
  </>) : proceso === 'Detalles' ? (<>
      <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>
          <Col className="pl-1" md="3s">
              <Button style={{ border: 'none', backgroundColor: '#fff', color: "#cc444c", marginTop: 25 }} variant='info' onClick={() => setProceso('')}>
                  Detalles
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