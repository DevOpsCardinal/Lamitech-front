import React, { useState, useEffect } from 'react';
import useAuth from 'hooks/useAuth';
import { getEntradasApi } from 'API/entrada';
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
} from 'react-bootstrap';

export default function Entrada({ setEntrada, setFormSearch }) {
  const mostrarAlertEnvio = () => {
    swal({
      title: 'Datos de Despacho ingresados correctamente',
      text: 'Los datos son correctos',
      icon: 'success',
      button: 'Aceptar',
      timer: '3000',
    });
  };

  const [listaPlaca, setListaPlaca] = useState(null);
  const [dropdow, setDropdow] = useState(false);
  const [filtro, setFiltro] = useState(null);

  const { auth } = useAuth();

  useEffect(() => {
    const traerLista = async () => {
      const response = await getEntradasApi(auth);
      setListaPlaca(response);
      console.log('Entradassssssssssssssssssss', response);
    };
    traerLista();
  }, []);

  const filtrarPlacas = (query) => {
    console.log(query);
    const result = listaPlaca?.filter(function (lista) {
      // esto es el mapeo

      return (
        lista?.Placa.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      );
    });
    setFiltro(result);
  };

  const filtrarTrailer = (query) => {
    console.log(query);
    const result = listaPlaca?.filter(function (lista) {
      // esto es el mapeo

      return (
        lista?.No_R.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      );
    });
    setFiltro(result);
  };

  const filtrarFormulario = (placa) => {
    console.log('plaplacaplacaplacacaplacaplacaplacaplaca', placa);
    setFormSearch(placa);
    setEntrada(null);
  };

  function fechaSql(fecha){
    if(fecha){
      console.log("fecha", fecha);
      const partes = fecha?.split('T')
      return partes[0]
    }else {
      return ''
    }
  
  }

  return (
    <>
      <tbody>
        <tr>
          <td>
            
            <Form>
            <Row className="d-flex align-items-center justify-content-start">
              <Col className="pl-1" md="auto">
                <Form.Group style={{ width: '150px' }}>
                  <label htmlFor="exampleInputEmail1">Número de Placa</label>
                  <Form.Control
                    name="tiqueteNum"
                    placeholder="Número de Placa"
                    type="text"
                    onFocus={() => setDropdow(true)}
                    onChange={(text) => filtrarPlacas(text.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col className="pl-1 ml-2" md="auto">
                <Form.Group style={{ width: '150px' }}>
                  <label htmlFor="exampleInputEmail1">Trailer</label>
                  <Form.Control
                    name="tiqueteNum"
                    placeholder="Trailer"
                    type="text"
                    onFocus={() => setDropdow(true)}
                    onChange={(text) => filtrarTrailer(text.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

              {dropdow ? (
                <>
                  {filtro ? (
                    <>
                      <div
                        style={{
                          height: 300,
                          overflow: 'auto',
                          marginBottom: 10,
                        }}
                      >
                        {filtro.map(
                          (placa) => (
                            console.log('placaplacaplacaplacaplaca', placa),
                            (
                              <>
                                <h4>{placa.Caso}</h4>
                                <table
                                  width={650}
                                  style={{ borderSpacing: '10px'}} // Cambié el valor de `borderSpacing` a un ejemplo razonable
>
                                  <thead style={{ margin: 20, }}>
                                    <tr style={{ margin: 20 }}>
                                      <th
                                        style={{ padding: 20 }}
                                        className="border-0"
                                      >
                                        Fecha de Registro
                                      </th>
                                      <th className="border-0">Placa</th>
                                      <th className="border-0">Trailer</th>
                                      <th className="border-0">Identificador</th>
                                      <th className="border-0">Caso</th>
                                      <th className="border-0">peso</th>
                                    </tr>
                                  </thead>
                                  <tbody key={placa.id}>
                                    <tr>
                                      <td style={{ }}>
                                        {placa.Caso == 'Despacho' 
                                          ? fechaSql(placa.Fecha_peso_vacio) + ' ' + placa.Hora_peso_vacio
                                          : fechaSql(placa.Fecha_peso_lleno)+ ' ' + placa.Hora_peso_vacio}
                                      </td>
                                      <td style={{ }}>
                                        <button
                                          style={{
                                            border: 'none',
                                            backgroundColor: '#cc444c',
                                            color: 'white',
                                            borderRadius: 5,
                                          }}
                                          type="button"
                                          onClick={() =>
                                            filtrarFormulario(placa)
                                          }
                                        >
                                          {placa.Placa}
                                        </button>
                                      </td>

                                      <td style={{ }}>
                                      <button
                                          style={{
                                            border: 'none',
                                            backgroundColor: '#cc444c',
                                            color: 'white',
                                            borderRadius: 5,
                                          }}
                                          type="button"
                                          onClick={() =>
                                            filtrarFormulario(placa)
                                          }
                                        >
                                          {placa.No_R}
                                        </button>
                                      </td>
                                      <td style={{  }}>
                                      {placa.No_Shipment}
                                  </td>
                                      <td style={{ }}>
                                        {placa.Caso}
                                      </td>
                                      <td style={{  }}>
                                        {placa.Caso == 'Despacho'
                                          ? placa.Tara
                                          : placa.Bruto}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </>
                            )
                          )
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        style={{
                          height: 300,
                          overflow: 'auto',
                          marginBottom: 10,
                        }}
                      >
                        {listaPlaca?.map((placa) => (
                          <>
                            <h4>{placa.Caso}</h4>
                            <table
                              width={650}
                                style={{ borderSpacing: '10px' }} // Cambié el valor de `borderSpacing` a un ejemplo razonable
                              >
                              <thead style={{ margin: 20 }}>
                                <tr style={{ margin: 20 }}>
                                  <th
                                    style={{ padding: 20 }}
                                    className="border-0"
                                  >
                                    Fecha de Registro
                                  </th>
                                  <th className="border-0">Placa</th>
                                  <th className="border-0">Trailer</th>
                                  <th className="border-0">Identificador</th>
                                  <th className="border-0">Caso</th>
                                  <th className="border-0">Peso</th>

                                  
                                </tr>
                              </thead>
                              <tbody key={placa.id}>
                                <tr>
                                <td style={{  }}>
                                        {placa.Caso == 'Despacho' 
                                          ? fechaSql(placa.Fecha_peso_vacio) + ' ' + placa.Hora_peso_vacio
                                          : fechaSql(placa.Fecha_peso_lleno)+ ' ' + placa.Hora_peso_vacio}
                                      </td>
                                  <td style={{  }}>
                                    <button
                                      style={{
                                        border: 'none',
                                        backgroundColor: '#cc444c',
                                        color: 'white',
                                        borderRadius: 5,
                                      }}
                                      type="button"
                                      onClick={() => filtrarFormulario(placa)}
                                    >
                                      {placa.Placa}
                                    </button>
                                  </td>

                                  <td style={{ }}>
                                  <button
                                          style={{
                                            border: 'none',
                                            backgroundColor: '#cc444c',
                                            color: 'white',
                                            borderRadius: 5,
                                          }}
                                          type="button"
                                          onClick={() =>
                                            filtrarFormulario(placa)
                                          }
                                        >
                                          {placa.No_R}
                                        </button>
                                  </td>

                                  
                                  <td style={{  }}>
                                      {placa.No_Shipment}
                                  </td>
                                  <td style={{  }}>
                                      {placa.Caso}
                                  </td>
                                  <td style={{  }}>
                                    {placa.Caso == 'Despacho'
                                      ? placa.Tara
                                      : placa.Bruto}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </>
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <> </>
              )}
            </Form>
          </td>
        </tr>
      </tbody>
    </>
  );
}
