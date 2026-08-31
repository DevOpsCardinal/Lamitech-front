import React from "react";
import DespachoProducto from "components/Reports/DespachoProducto";
import EntradaMateriaPrima from "components/Reports/EntradaMateriaPrima";
import DespachoFinal from "components/Reports/DespachoFinal";
import Clientes from "components/Reports/Clientes";
import Conductores from "components/Reports/Conductores";
import Transportadoras from "components/Reports/Transportadoras";
import Proveedores from "components/Reports/Proveedores";
import Productos from "components/Reports/Productos";
import MateriasPrimas from "components/Reports/MateriasPrimas";
import Plantas from "components/Reports/Plantas";
import Origenes from "components/Reports/Origenes";
import Destinos from "components/Reports/Destinos";
import Vehiculos from "components/Reports/Vehiculos";

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
} from "react-bootstrap";

function TableList() {
  return (
    <>
      <Container fluid>
        <Row>
        <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4" style={{fontWeight: 'bold'}}>Despacho</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0" >
                <DespachoFinal />
              </Card.Body>
            </Card>
          </Col>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4" style={{fontWeight: 'bold'}}>En Transito</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <DespachoProducto />
              </Card.Body>
            </Card>
          </Col>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Entrada Materia Prima</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <EntradaMateriaPrima />
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Clientes</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Clientes />
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Conductores</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Conductores />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
        <Col md="6">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Transportadoras</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Transportadoras />
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Proveedor</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Proveedores />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
        <Col md="6">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Productos</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Productos />
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Materia Prima</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <MateriasPrimas />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
        <Col md="6">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Plantas</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Plantas />
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Origenes</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Origenes />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
        <Col md="6">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Destinos</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Destinos />
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Vehiculos</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Vehiculos />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        
      </Container>
    </>
  );
}

export default TableList;
