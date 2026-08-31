import React, { useState, useEffect, useMemo } from 'react';
import useAuth from 'hooks/useAuth';
import { getEntradasApi } from 'API/entrada';
import { Badge, Nav, Row, Col, Form } from 'react-bootstrap';

// El recordset de SQL Server conserva el casing fisico de la columna, que no
// siempre coincide con el usado en los INSERT. Se busca la clave sin distinguir
// mayusculas para que el buzon no dependa de como este declarada la tabla.
function campo(registro, nombre) {
  if (!registro) return null;
  if (registro[nombre] !== undefined) return registro[nombre];
  const clave = Object.keys(registro).find(
    (k) => k.toLowerCase() === nombre.toLowerCase()
  );
  return clave ? registro[clave] : null;
}

// Las columnas de fecha llegan como texto ('yyyy-MM-dd' o ISO) cuando son
// VARCHAR y como Date en UTC cuando son DATE, por eso se leen los getters UTC:
// con getters locales (UTC-5) una fecha DATE se mostraria un dia antes.
function fechaSql(fecha) {
  if (!fecha) return '';
  if (fecha instanceof Date) {
    const mes = String(fecha.getUTCMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getUTCDate()).padStart(2, '0');
    return `${fecha.getUTCFullYear()}-${mes}-${dia}`;
  }
  return fecha.toString().split('T')[0];
}

function horaSql(hora) {
  if (!hora) return '';
  if (hora instanceof Date) {
    const hh = String(hora.getUTCHours()).padStart(2, '0');
    const mm = String(hora.getUTCMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  }
  return hora.toString();
}

function esDespacho(registro) {
  return campo(registro, 'Caso')?.toString().trim().toLowerCase() === 'despacho';
}

// En un Despacho el primer pesaje es el vacio y en un Ingreso el lleno
// (ver el CASE WHEN @Caso del INSERT en transito.controller.js), asi que la
// fecha de registro sale de la pareja de columnas que corresponda al caso.
function fechaRegistro(registro) {
  const despacho = esDespacho(registro);
  const fecha = campo(
    registro,
    despacho ? 'Fecha_Peso_Vacio' : 'Fecha_Peso_Lleno'
  );
  const hora = campo(registro, despacho ? 'Hora_Peso_Vacio' : 'Hora_Peso_Lleno');
  return [fechaSql(fecha), horaSql(hora)].filter(Boolean).join(' ');
}

function coincide(valor, query) {
  if (!query) return true;
  return valor?.toString().toLowerCase().includes(query.toLowerCase()) ?? false;
}

export default function Entrada({ setEntrada, setFormSearch }) {
  const [listaPlaca, setListaPlaca] = useState(null);
  const [buzon, setBuzon] = useState('Ingreso');
  const [queryPlaca, setQueryPlaca] = useState('');
  const [queryTrailer, setQueryTrailer] = useState('');

  const { auth } = useAuth();

  useEffect(() => {
    const traerLista = async () => {
      const response = await getEntradasApi(auth);
      setListaPlaca(Array.isArray(response) ? response : []);
    };
    traerLista();
  }, []);

  // Todo lo que no sea Despacho cae en Ingreso para que ningun registro quede
  // fuera de los dos buzones y se pueda cerrar siempre el segundo pesaje.
  const buzones = useMemo(() => {
    const despachos = (listaPlaca ?? []).filter(esDespacho);
    const ingresos = (listaPlaca ?? []).filter((r) => !esDespacho(r));
    return { Ingreso: ingresos, Despacho: despachos };
  }, [listaPlaca]);

  const registros = useMemo(
    () =>
      buzones[buzon].filter(
        (r) =>
          coincide(campo(r, 'Placa'), queryPlaca) &&
          coincide(campo(r, 'No_R'), queryTrailer)
      ),
    [buzones, buzon, queryPlaca, queryTrailer]
  );

  const filtrarFormulario = (placa) => {
    setFormSearch(placa);
    setEntrada(null);
  };

  const botonRojo = {
    border: 'none',
    backgroundColor: '#cc444c',
    color: 'white',
    borderRadius: 5,
  };

  const pestana = (nombre) => (
    <Nav.Item>
      <Nav.Link
        active={buzon === nombre}
        onClick={() => setBuzon(nombre)}
        style={{ cursor: 'pointer' }}
      >
        {nombre}{' '}
        <Badge bg={buzon === nombre ? 'danger' : 'secondary'}>
          {buzones[nombre].length}
        </Badge>
      </Nav.Link>
    </Nav.Item>
  );

  return (
    <>
      <tbody>
        <tr>
          <td>
            <Form>
              <Row className="d-flex align-items-center justify-content-start">
                <Col className="pl-1" md="auto">
                  <Form.Group style={{ width: '150px' }}>
                    <label>Número de Placa</label>
                    <Form.Control
                      name="filtroPlaca"
                      placeholder="Número de Placa"
                      type="text"
                      value={queryPlaca}
                      onChange={(text) => setQueryPlaca(text.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col className="pl-1 ml-2" md="auto">
                  <Form.Group style={{ width: '150px' }}>
                    <label>Trailer</label>
                    <Form.Control
                      name="filtroTrailer"
                      placeholder="Trailer"
                      type="text"
                      value={queryTrailer}
                      onChange={(text) => setQueryTrailer(text.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Nav variant="tabs" className="mb-2">
                {pestana('Ingreso')}
                {pestana('Despacho')}
              </Nav>

              <div style={{ height: 300, overflow: 'auto', marginBottom: 10 }}>
                {registros.length === 0 ? (
                  <p style={{ padding: 20 }}>
                    No hay vehículos en tránsito en el buzón de{' '}
                    {buzon.toLowerCase()}.
                  </p>
                ) : (
                  <table width={650} style={{ borderSpacing: '10px' }}>
                    <thead>
                      <tr>
                        <th style={{ padding: 20 }} className="border-0">
                          Fecha de Registro
                        </th>
                        <th className="border-0">Placa</th>
                        <th className="border-0">Trailer</th>
                        <th className="border-0">Identificador</th>
                        <th className="border-0">Peso</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registros.map((placa, idx) => (
                        <tr
                          key={`${campo(placa, 'Placa')}-${campo(
                            placa,
                            'No_Shipment'
                          )}-${idx}`}
                        >
                          <td>{fechaRegistro(placa)}</td>
                          <td>
                            <button
                              style={botonRojo}
                              type="button"
                              onClick={() => filtrarFormulario(placa)}
                            >
                              {campo(placa, 'Placa')}
                            </button>
                          </td>
                          <td>
                            <button
                              style={botonRojo}
                              type="button"
                              onClick={() => filtrarFormulario(placa)}
                            >
                              {campo(placa, 'No_R')}
                            </button>
                          </td>
                          <td>{campo(placa, 'No_Shipment')}</td>
                          <td>
                            {esDespacho(placa)
                              ? campo(placa, 'Tara')
                              : campo(placa, 'Bruto')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </Form>
          </td>
        </tr>
      </tbody>
    </>
  );
}
