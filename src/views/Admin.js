import React from "react";
import RegistrarConductor from "components/forms/RegistrarConductor";
import RegistrarTransportadora from "components/forms/RegistrarTransportadora";
import RegistrarCliente from "components/forms/RegistrarCliente";
import RegistrarProducto from "components/forms/RegistrarProducto";
import RegistrarMateriaPrima from "components/forms/RegistrarMateriaPrima";
import RegistrarPlanta from "components/forms/RegistrarPlanta";
import RegistrarOrigen from "components/forms/RegistrarOrigen";
import RegistrarDestino from "components/forms/RegistrarDestino";


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
    Form,
    OverlayTrigger,
    Tooltip,
    Breadcrumb,
    Dropdown,
} from "react-bootstrap";
import RegistrarProveedor from "components/forms/RegistrarProveedor";

function Admin() {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col lg="5" sm="6">
                        <Card className="card-stats">
                            <Card.Body>
                                <Card.Title as="h4">
                                    Registrar Conductor
                                </Card.Title>
                                <Row style={{ marginBottom: '4vh', marginTop: '3vh' }}>
                                    <RegistrarConductor />
                                </Row>
                            </Card.Body>

                        </Card>
                    </Col>
                    <Col lg="5" sm="6">
                        <Card className="card-stats">
                            <Card.Body>
                            <Card.Title as="h4">
                                    Registrar Transportadora
                                </Card.Title>
                                <Row style={{ marginBottom: '4vh', marginTop: '3vh' }}>
                                    <RegistrarTransportadora />
                                </Row>
                            </Card.Body>

                        </Card>
                    </Col>
                    <Col lg="5" sm="6">
                        <Card className="card-stats">
                            <Card.Body>
                            <Card.Title as="h4">
                                    Registrar Cliente
                                </Card.Title>
                                <Row style={{ marginBottom: '4vh', marginTop: '3vh' }}>
                                    <RegistrarCliente/>
                                </Row>
                            </Card.Body>

                        </Card>
                    </Col>
                    <Col lg="5" sm="6">
                        <Card className="card-stats">
                            <Card.Body>
                            <Card.Title as="h4">
                                    Registrar Proveedor
                                </Card.Title>
                                <Row style={{ marginBottom: '4vh', marginTop: '3vh' }}>
                                   <RegistrarProveedor />
                                </Row>
                            </Card.Body>

                        </Card>
                    </Col>

                    <Col lg="5" sm="6">
                        <Card className="card-stats">
                            <Card.Body>
                            <Card.Title as="h4">
                                    Registrar Producto
                                </Card.Title>
                                <Row style={{ marginBottom: '4vh', marginTop: '3vh' }}>
                                    <RegistrarProducto />
                                </Row>
                            </Card.Body>

                        </Card>
                    </Col>
                    <Col lg="5" sm="6">
                        <Card className="card-stats">
                            <Card.Body>
                            <Card.Title as="h4">
                                    Registrar Materia Prima
                                </Card.Title>
                                <Row style={{ marginBottom: '4vh', marginTop: '3vh' }}>
                                    <RegistrarMateriaPrima />
                                </Row>
                            </Card.Body>

                        </Card>
                    </Col>
                    <Col lg="5" sm="6">
                        <Card className="card-stats">
                            <Card.Body>
                            <Card.Title as="h4">
                                    Registrar Planta
                                </Card.Title>
                                <Row style={{ marginBottom: '4vh', marginTop: '3vh' }}>
                                   <RegistrarPlanta />
                                </Row>
                            </Card.Body>

                        </Card>
                    </Col>
                    <Col lg="5" sm="6">
                        <Card className="card-stats">
                            <Card.Body>
                            <Card.Title as="h4">
                                    Registrar Origen
                                </Card.Title>
                                <Row style={{ marginBottom: '4vh', marginTop: '3vh' }}>
                                    <RegistrarOrigen />
                                </Row>
                            </Card.Body>

                        </Card>
                    </Col>
                    <Col lg="5" sm="6">
                        <Card className="card-stats">
                            <Card.Body>
                            <Card.Title as="h4">
                                    Registrar Destino
                                </Card.Title>
                                <Row style={{ marginBottom: '4vh', marginTop: '3vh' }}>
                                   <RegistrarDestino />
                                </Row>
                            </Card.Body>

                        </Card>
                    </Col>

                    <Col lg="5" sm="6">
                        <Card className="card-stats">
                            <Card.Body>
                            <Card.Title as="h4">
                                    Registrar Vehiculo
                                </Card.Title>
                                <Row style={{ marginBottom: '4vh', marginTop: '3vh' }}>
                                   <RegistrarVehiculos />
                                </Row>
                            </Card.Body>

                        </Card>
                    </Col>


                    

                    

                </Row>
            </Container>
        </>
    );
}

export default Admin;
