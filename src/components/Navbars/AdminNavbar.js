/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";
import RegistrarConductor from "components/forms/RegistrarConductor";
import RegistrarTransportadora from "components/forms/RegistrarTransportadora";
import RegistrarCliente from "components/forms/RegistrarCliente";
import RegistrarProveedor from "components/forms/RegistrarProveedor";
import RegistrarProducto from "components/forms/RegistrarProducto";
import RegistrarMateriaPrima from "components/forms/RegistrarMateriaPrima";
import RegistrarPlanta from "components/forms/RegistrarPlanta";
import RegistrarOrigen from "components/forms/RegistrarOrigen";
import RegistrarDestino from "components/forms/RegistrarDestino";
import RegistroUsuario from "components/forms/RegistroUsuario"
import RegistrarCiv from "components/forms/RegistrarCiv"

import Configuraciones from "components/forms/Configuraciones";
import DespachoProducto from "components/Reports/DespachoProducto";
import DespachoFinal from 'components/Reports/DespachoFinal'



import EntradaMateriaPrima from "components/Reports/EntradaMateriaPrima";
import EditarConductor from "components/forms/EditConductor";
import EditarCliente from "components/forms/EditCliente";
import Recibo from "components/forms/Recibo";
import EditUser from "components/forms/EditUser";
import Modal from "components/modals/Modal";
import ModalReports from "components/modals/ModalReportes";
//Añadir modales de editar

import EditarTransportadora from "components/forms/EditTransportadora";
import EditarProveedor from "components/forms/EditProveedor";
import EditarProducto from "components/forms/EditProducto";
import EditarMateriaPrima from "components/forms/EditMateriaPrima";
import EditarPlanta from "components/forms/EditPlanta";
import EditarOrigen from "components/forms/EditOrigen";
import EditarDestino from "components/forms/EditDestino";

import EditarTiquete from "components/forms/EditarTiquete";



import useAuth from "hooks/useAuth";

import { useMediaQuery } from 'react-responsive';



import routes from "routes.js";
import ReporteTrailer from "components/Reports/reportesTrailer";

function Header() {

  const { logout } = useAuth()

  const { auth } = useAuth()


  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isTabletOrMobile2 = useMediaQuery({ query: '(max-width: 990px)' })
  const isTabletOrMobile3 = useMediaQuery({ query: '(max-width: 1342px)' })
  const isTabletOrMobile4 = useMediaQuery({ query: '(max-width: 990px)' })



  const [modalConductor, setModalConductor] = useState(null)
  const [modalConfiguraciones, setModalConfiguraciones] = useState(null)
  const [modalTransportadora, setModalTransportadora] = useState(null)
  const [modalCliente, setModalCliente] = useState(null)
  const [modalProveedor, setModalProveedor] = useState(null)
  const [modalProducto, setModalProducto] = useState(null)
  const [modalMateriaPrima, setModalMateriaPrima] = useState(null)
  const [modalPlanta, setModalPlanta] = useState(null)
  const [modalOrigen, setModalOrigen] = useState(null)
  const [modalDestino, setmodalDestino] = useState(null)
  const [modalCrearUsuarios, setModalCrearUsuarios] = useState(null)
  const [modalCrearCIv, setmodalCrearCIv] = useState(null)
  const [modalEditarUsuario, setModalEditarUsuario] = useState(null)
  const [modalDespachos, setModalDespachos] = useState(null)
  const [modalEntradaMateria, setModalEntradaMateria] = useState(null)
  const [modalRecibo, setModalRecibo] = useState(null)
  
  const [modalEditarConductor, setModalEditarConductor] = useState(null)
  const [modalEditarCliente, setModalEditarCliente] = useState(null)
  const [modalEditarTransportadora, setModalEditarTransportadora] = useState(null)
  const [modalEditarProveedor, setModalEditarProveedor] = useState(null)
  const [modalEditarProducto, setModalEditarProducto] = useState(null)
  const [modalEditarMateriaPrima, setModalEditarMateriaPrima] = useState(null);
  const [modalEditarPlanta, setModalEditarPlanta] = useState(null)
  const [modalEditarOrigen, setModalEditarOrigen] = useState(null)
  const [modalEditarDestino, setModalEditarDestino] = useState(null)

  const [modalTrailer, setModalTrailer] = useState(null)


  

 
  const [modalEditarTiquete, setModalEditarTiquete] = useState(null)


  const [transito, setTransito] = useState(null)


  const [editarConductor, setEditarConductor] = useState(null)






  const location = useLocation();
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  return (

    <>

      {modalConductor && <Modal estado={setModalConductor} Component={RegistrarConductor} />}

      {modalTrailer && <ModalReports estado={setModalTrailer} Component={ReporteTrailer} />}

     
      {modalEditarTiquete && <Modal estado={setModalEditarTiquete} Component={EditarTiquete} />}

      {modalConfiguraciones && <Modal estado={setModalConfiguraciones} Component={Configuraciones} />}
      {modalRecibo && <Modal estado={setModalRecibo} Component={Recibo} />}
      {modalTransportadora && <Modal estado={setModalTransportadora} Component={RegistrarTransportadora} />}
      {modalCliente && <Modal estado={setModalCliente} Component={RegistrarCliente} />}
      {modalCrearCIv && <Modal estado={setmodalCrearCIv} Component={RegistrarCiv} />}
      {modalProveedor && <Modal estado={setModalProveedor} Component={RegistrarProveedor} />}
      {modalProducto && <Modal estado={setModalProducto} Component={RegistrarProducto} />}
      {modalMateriaPrima && <Modal estado={setModalMateriaPrima} Component={RegistrarMateriaPrima} />}
      {modalPlanta && <Modal estado={setModalPlanta} Component={RegistrarPlanta} />}
      {modalOrigen && <Modal estado={setModalOrigen} Component={RegistrarOrigen} />}
      {modalDestino && <Modal estado={setmodalDestino} Component={RegistrarDestino} />}
      {modalCrearUsuarios && <Modal estado={setModalCrearUsuarios} Component={RegistroUsuario} />}
      {modalEditarUsuario && <Modal estado={setModalEditarUsuario} Component={EditUser} />}
      {modalCrearCIv && <Modal estado={setmodalCrearCIv} Component={RegistrarCiv} />}
   
      {modalEditarConductor && <Modal estado={setModalEditarConductor} Component={EditarConductor} />}
      {modalEditarCliente && <Modal estado={setModalEditarCliente} Component={EditarCliente} />}
    
      {modalEditarTransportadora && <Modal estado={setModalEditarTransportadora} Component={EditarTransportadora} />}
      {modalEditarProveedor && <Modal estado={setModalEditarProveedor} Component={EditarProveedor} />}
      {modalEditarProducto && <Modal estado={setModalEditarProducto} Component={EditarProducto} />}
      {modalEditarMateriaPrima && <Modal estado={setModalEditarMateriaPrima} Component={EditarMateriaPrima} />}
      {modalEditarPlanta && <Modal estado={setModalEditarPlanta} Component={EditarPlanta} />}
      {modalEditarOrigen && <Modal estado={setModalEditarOrigen} Component={EditarOrigen} />}
      {modalEditarDestino && <Modal estado={setModalEditarDestino} Component={EditarDestino} />}


      {modalDespachos && <ModalReports estado={setModalDespachos} Component={DespachoFinal} />}
      {transito && <ModalReports estado={setTransito} Component={DespachoProducto} />}
      {modalEntradaMateria && <ModalReports estado={setModalEntradaMateria} Component={EntradaMateriaPrima} />}










      <Navbar bg="light" expand="lg" style={{ height: 5 }}>
        <div style={{ width: 300, heigth: 120, marginLeft: isTabletOrMobile4 ? '70%' : isTabletOrMobile3 ? '100%' : '80%', position: 'absolute' }} >
          {auth?.nombre}
        </div>
        <Container fluid>

          <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
            <span className="navbar-toggler-bar burger-lines"></span>
            <span className="navbar-toggler-bar burger-lines"></span>
            <span className="navbar-toggler-bar burger-lines"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" style={{ backgroundColor: isTabletOrMobile2 ? '#cc444c' : '', zIndex: isTabletOrMobile ? 10 : 10 }}>

            <Nav className="ml-auto" navbar>

              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle
                  aria-expanded={false}
                  aria-haspopup={true}
                  as={Nav.Link}
                  data-toggle="dropdown"
                  id="navbarDropdownMenuLink"
                  variant="default"
                  className="m-0"
                >
                  <span className="no-icon" style={{ color: isTabletOrMobile2 ? '#fff' : '#000' }}>Registrar</span>
                </Dropdown.Toggle>
                <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink" style={{ backgroundColor: '#fff' }}>
                  


                  <Dropdown.Item
                    onClick={(e) => setModalConductor(true)}
                  >
                    Conductor
                  </Dropdown.Item>
                  <div className="divider"></div>


                  <Dropdown.Item

                    onClick={(e) => setModalTransportadora(true)}
                  >
                    Transportadora
                  </Dropdown.Item>

                  <div className="divider"></div>


                  <Dropdown.Item

                    onClick={(e) => setModalCliente(true)}
                  >
                    Cliente
                  </Dropdown.Item>
                  <div className="divider"></div>

                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => setModalProveedor(true)}
                  >
                    Proveedor
                  </Dropdown.Item>
                  <div className="divider"></div>

                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => setModalProducto(true)}
                  >
                    Producto
                  </Dropdown.Item>
                  <div className="divider"></div>

                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => setModalMateriaPrima(true)}
                  >
                    Materia Prima
                  </Dropdown.Item>
                  <div className="divider"></div>

                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => setModalPlanta(true)}
                  >
                    Planta
                  </Dropdown.Item>
                  <div className="divider"></div>

                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => setModalOrigen(true)}
                  >
                    Origen
                  </Dropdown.Item>
                  <div className="divider"></div>

                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => setmodalDestino(true)}
                  >
                    Destino
                  </Dropdown.Item>
                  <div className="divider"></div>

                









                </Dropdown.Menu>
              </Dropdown>


              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle
                  aria-expanded={false}
                  aria-haspopup={true}
                  as={Nav.Link}
                  data-toggle="dropdown"
                  id="navbarDropdownMenuLink"
                  variant="default"
                  className="m-0"
                >
                  <span className="no-icon" style={{ color: isTabletOrMobile2 ? '#fff' : '#000' }}>Editar</span>
                </Dropdown.Toggle>
                <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink" style={{ backgroundColor: '#fff' }}>
                  {auth.rango == 100 ? (<>
                    <Dropdown.Item
                      onClick={(e) => setModalEditarTiquete(true)}
                    >
                      Editar tiquete
                    </Dropdown.Item>
                    <div className="divider"></div>
                  </>) : (<></>)}

                  <Dropdown.Item
                    onClick={(e) => setModalEditarConductor(true)}
                  >
                    Conductor
                  </Dropdown.Item>
                  <div className="divider"></div>

                  <Dropdown.Item
                    onClick={(e) => setModalEditarTransportadora(true)}
                  >
                    Transportadora
                  </Dropdown.Item>
                  <div className="divider"></div>


                  <Dropdown.Item

                    onClick={(e) => setModalEditarCliente(true)}
                  >
                    Cliente
                  </Dropdown.Item>
                  <div className="divider"></div>
                  <Dropdown.Item

                    onClick={(e) => setModalEditarProveedor(true)}
                  >
                    Proveedor
                  </Dropdown.Item>
                  <div className="divider"></div>
                  <Dropdown.Item

                    onClick={(e) => setModalEditarProducto(true)}
                  >
                    Producto
                  </Dropdown.Item>
                  <div className="divider"></div>
                  <Dropdown.Item

                    onClick={(e) => setModalEditarMateriaPrima(true)}
                  >
                    Materia Prima
                  </Dropdown.Item>
                  <div className="divider"></div>
                  <Dropdown.Item

                    onClick={(e) => setModalEditarPlanta(true)}
                  >
                    Planta
                  </Dropdown.Item>
                  <div className="divider"></div>
                  <Dropdown.Item

                    onClick={(e) => setModalEditarOrigen(true)}
                  >
                    Origen
                  </Dropdown.Item>
                  <div className="divider"></div>
                  <Dropdown.Item

                    onClick={(e) => setModalEditarDestino(true)}
                  >
                    Destino
                  </Dropdown.Item>







                  
                </Dropdown.Menu>
              </Dropdown>


              {auth.rango == 100 ? (<>



                <Dropdown as={Nav.Item}>
                  <Dropdown.Toggle
                    aria-expanded={false}
                    aria-haspopup={true}
                    as={Nav.Link}
                    data-toggle="dropdown"
                    id="navbarDropdownMenuLink"
                    variant="default"
                    className="m-0"
                  >
                    <span className="no-icon" style={{ color: isTabletOrMobile2 ? '#fff' : '#000' }}>Administrador de Usuarios</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink" style={{ backgroundColor: '#fff' }}>
                    <Dropdown.Item
                      onClick={(e) => setModalCrearUsuarios(true)}
                    >
                      Crear usuario
                    </Dropdown.Item>
                    <div className="divider"></div>
                    <Dropdown.Item

                      onClick={(e) => setModalEditarUsuario(true)}
                    >
                      DesactivarUsuario
                    </Dropdown.Item>
                    <div className="divider"></div>

                  </Dropdown.Menu>
                </Dropdown>









              </>) : (<></>)}

              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle
                  aria-expanded={false}
                  aria-haspopup={true}
                  as={Nav.Link}
                  data-toggle="dropdown"
                  id="navbarDropdownMenuLink"
                  variant="default"
                  className="m-0"
                >
                  <span className="no-icon" style={{ color: isTabletOrMobile2 ? '#fff' : '#000' }}>Reportes</span>
                </Dropdown.Toggle>
                <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink" style={{ backgroundColor: '#fff' }}>
                  <Dropdown.Item
                    onClick={(e) => setModalDespachos(true)}
                  >
                    Despachos
                  </Dropdown.Item>
                  <div className="divider"></div>
                  <Dropdown.Item
                    onClick={(e) => setModalEntradaMateria(true)}
                  >
                    ingresos
                  </Dropdown.Item>
                  <div className="divider"></div>
                  <Dropdown.Item

                    onClick={(e) => setTransito(true)}
                  >
                    En Transito
                  </Dropdown.Item>

                  <div className="divider"></div>
                  <Dropdown.Item

                    onClick={(e) => setModalTrailer(true)}
                  >
                    Trailers
                  </Dropdown.Item>


                </Dropdown.Menu>
              </Dropdown>




              <Nav.Item>
                <Nav.Link
                  className="m-0"
             
                  onClick={(e) => logout()}
                >
                  <span className="no-icon" style={{ color: isTabletOrMobile2 ? '#fff' : '#000' }}>Cerrar</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className="m-0"
                  onClick={(e) => setModalConfiguraciones(true)}
                >
                  <span style={{ color: isTabletOrMobile2 ? '#fff' : '#000' }}>Configuraciones</span>
                </Nav.Link>
              </Nav.Item>

              
              <Nav.Item>
                <Nav.Link
                  className="m-0"
                  onClick={(e) => setModalRecibo(true)}
                >
                  <span style={{ color: isTabletOrMobile2 ? '#fff' : '#000' }}>Recibo</span>
                </Nav.Link>
              </Nav.Item> 
            
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
