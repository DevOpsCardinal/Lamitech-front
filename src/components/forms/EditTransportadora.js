import React, {useState} from "react";
import { useFormik } from 'formik';
import * as Yup from "yup"
import swal from 'sweetalert';
import useAuth from 'hooks/useAuth';
import { traerTransportadora } from "API/transportadora";
import { updateTransportadora } from "API/transportadora";


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


  export default function EditarTransportadora() {

    const [busqueda, setBusqueda] = useState(null);
    const [proceso, setProceso] = useState(null);
    const [valor, setValor] = useState(null);
    
  const { auth } = useAuth();


  const formik = useFormik({
    initialValues: {

      nit: "",
      nombre: "",
      direccion: "",
      telefono: "",
      observaciones: "",


    },
    validationSchema: Yup.object({

      nombre: Yup.string().required(true),
      nit: Yup.string(),
      direccion: Yup.string(),
      telefono: Yup.string(),
      observaciones: Yup.string()

    }),
    onSubmit: async (formValue) => {



      const response = await updateTransportadora(formValue, auth, busqueda)
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

  const CambiarEstado = async()=>{
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

    const response = await traerTransportadora(proceso,valor, auth);
    console.log('[EditTransportadora.js 118]'+JSON.stringify(response));

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
    if(response?.[0]){
    //     nombre: Yup.string().required(true),
    //   nit: Yup.string(),
    //   direccion: Yup.string(),
    //   telefono: Yup.string(),
    //   observaciones: Yup.string()
        formik.setFieldValue('nit', response?.[0].NIT);
        formik.setFieldValue('nombre',response?.[0].Nombre)
        formik.setFieldValue('direccion', response?.[0].Direccion)
        formik.setFieldValue('telefono',response?.[0].Telefono)
        formik.setFieldValue('observaciones', response?.[0].Observaciones)


        setBusqueda(response)
        console.log(busqueda);
    }else {
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
            
            {/* onSubmit={formik.handleSubmit} */}
            <button style={{ marginBottom: 20, backgroundColor: '#FFF',  border: 'none', color: 'BLACK', borderRadius: 10, fontSize: 40 }} type='button' onClick={() => setBusqueda(null)}>{`<-`}</button>

          <Form onSubmit={formik.handleSubmit}>
            <h4 style={{ color: '#fff' }}>Registrar Transportadora</h4>
            <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

              <Col className="pr-1" md="5">
                <Form.Group>
                  <label style={{ color: '#fff' }}>NIT</label>
                  <Form.Control
                    name="nit"
                    placeholder="nit"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nit}
                    isInvalid={formik.errors.nit}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col className="pl-1" md="5">
                <Form.Group>
                  <label style={{ color: '#fff' }}>Nombre</label>
                  <Form.Control
                    name="nombre"
                    placeholder="Nombre"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nombre}
                    isInvalid={formik.errors.nombre}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
              <Col className="pl-1" md="5">
                <Form.Group>
                  <label style={{ color: '#fff' }} htmlFor="exampleInputEmail1">
                    Dirección
                  </label>
                  <Form.Control
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
              <Col className="pl-1" md="5">
                <Form.Group>
                  <label style={{ color: '#fff' }} htmlFor="exampleInputEmail1">
                    telefono
                  </label>
                  <Form.Control
                    name="telefono"
                    placeholder="Telefono"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.telefono}
                    isInvalid={formik.errors.telefono}
                  ></Form.Control>
                </Form.Group>
              </Col>

            </Row>
            <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
              <Col className="pl-1" md="5">
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







          </Form></>):(<>
            <Row>

<label htmlFor="exampleInputEmail1" style={{ color: '#fff' }}>
    Buscar Transportadora
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
                        <Dropdown.Item onClick={() => setProceso('NIT')}>Nit</Dropdown.Item>
                        <Dropdown.Item onClick={() => setProceso('Nombre')}>Nombre</Dropdown.Item>
                        <Dropdown.Item onClick={() => setProceso('Direccion')}>Dirección</Dropdown.Item>
                        <Dropdown.Item onClick={() => setProceso('Telefono')}>Teléfono</Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>
            </Col>
        </Row>

    </>) : proceso === 'NIT' ? (<>
        <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>
            <Col className="pl-1" md="3s">
                <Button style={{ border: 'none', backgroundColor: '#fff', color: "#cc444c", marginTop: 25 }} variant='info' onClick={() => setProceso('')}>
                    NIT
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
    </>) : proceso === 'Direccion' ? (<>
        <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>
            <Col className="pl-1" md="3s">
                <Button style={{ border: 'none', backgroundColor: '#fff', color: "#cc444c", marginTop: 25 }} variant='info' onClick={() => setProceso('')}>
                    Dirección
                </Button>
            </Col>
        </Row>
    </>) : proceso === 'Telefono' ? (<>
        <Row style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10, }}>
            <Col className="pl-1" md="3s">
                <Button style={{ border: 'none', backgroundColor: '#fff', color: "#cc444c", marginTop: 25 }} variant='info' onClick={() => setProceso('')}>
                    Teléfono
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