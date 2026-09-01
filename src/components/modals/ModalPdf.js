import React, { useState, useRef, useEffect  } from 'react'
import styled from '@emotion/styled'
import { PDFViewer } from '@react-pdf/renderer';
import { Page, Text, Document, StyleSheet, Image, View  } from '@react-pdf/renderer';
import useAuth from 'hooks/useAuth';
import { ultimoDespacho } from 'API/despachoSalida';
import { getUltimoIngreso } from 'API/ingresos';
import { getRecibo } from 'API/configuraciones';
import { getTrailer } from 'API/trailer';
import logo  from '../../assets/img/logo.png'


const maxWidth = 300
const letterSpacing = 1
const fontSize = 20
const fontWeight = 'thin'



const Modal = ({ Estado, Recibo, Recibo2, Peso, Estado2, volumenEstado, unidadEstado, PesoT, PesoG, PesoN, inputs, setPdf, setFormSearch }) => {
  const styles = StyleSheet.create({
    page: {
        position: 'absolute',
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '100vh',
        height: '100vh',
        flexDirection: 'row',
        transform: 'rotate(270deg)',
        marginTop: -800,
        marginLeft: 300
    },
    section: {
        marginTop: -50,
      
        width: '100%',
        height: '100%',
        lineHeight: 1.1,
     
      

    }
});

    
    function fechaSql(fecha){
      if(fecha){
        console.log("fecha", fecha);
        const partes = fecha?.split('T')
        return partes[0]
      }else {
        return ''
      }
    
    }
    const [recibo, setRecibo] = useState(null)
    const [empresa, setEmpresa] = useState(null)
    const [departamento, setDepartamento] = useState(null)
    const [direccion, setDireccion] = useState(null)
    const [telefono, setTelefono] = useState(null)
    const [campo1, setCampo1] = useState(null)
    const [campo2, setCampo2] = useState(null)
    const [trailer, setTrailer] = useState(null)
    const [vgmD, setVgmD] = useState(null)
    const [carga, setCarga] = useState(null)





    let y, x1, x2, x3,x4
    const {auth} = useAuth()

    async function reciboF(){
      const reciboData = await getRecibo(auth);
      console.log("Datos recibo", reciboData);
      setEmpresa(reciboData[0]?.Valor);
      setDepartamento(reciboData[1]?.Valor);
      setDireccion(reciboData[2]?.Valor);
      setTelefono(reciboData[3]?.Valor);
      setCampo1(reciboData[4]?.Valor)
      setCampo2(reciboData[5]?.Valor)
  }

    useEffect(() => {
      reciboF()
      if (Recibo?.Caso === "Despacho") {
          const despachos = async () => {
              const response = await ultimoDespacho(auth);
              console.log("responseDespachos", response[0]);
             


              try {
                
              
                setRecibo(response[0]);
              if(response[0].Fecha_Entrada !== ""){
                const buscarTrailer = await getTrailer(auth, response[0].No_R)
                console.log("buscarTrailer: ", buscarTrailer);
                setTrailer(buscarTrailer[0])

                console.log("Bruto: ", parseInt(response[0].Bruto));
                console.log("tara: ", parseInt(response[0].Tara));
                console.log("trailer: ", parseInt(buscarTrailer[0].Gross_Entrada));
                console.log("tara contenedor: ", parseInt(buscarTrailer[0].Peso_Trailer));



                
// La carga y el VGM los calcula y persiste el backend
                // (calculos/pesos.js). Antes se recalculaban aqui con una
                // formula distinta a la de la reimpresion, y el mismo tiquete
                // podia mostrar dos VGM diferentes.
                setCarga(String(response[0]?.No_Contenedor ?? '').trim() ? (response[0]?.Neto ?? null) : null)
                setVgmD(response[0]?.Vgm ?? null)
              }

            } catch (error) {
                
            }

          };
          despachos();
      } else {
        const ingresos = async () => {
          const response = await getUltimoIngreso(auth);
          console.log("responseDespachos", response[0]);
          setRecibo(response[0]);


          try {
          

          if(response[0].Fecha_Entrada !== ""){
            const buscarTrailer = await getTrailer(auth, response[0].No_R)
            console.log("buscarTrailer: ", buscarTrailer);
            console.log("Bruto: ", parseInt(response[0].Bruto));
                console.log("tara: ", parseInt(response[0].Tara));
                console.log("trailer: ", parseInt(buscarTrailer[0].Gross_Entrada));
                console.log("tara contenedor: ", parseInt(buscarTrailer[0].Peso_Trailer));


// La carga y el VGM los calcula y persiste el backend
                // (calculos/pesos.js). Antes se recalculaban aqui con una
                // formula distinta a la de la reimpresion, y el mismo tiquete
                // podia mostrar dos VGM diferentes.
                setCarga(String(response[0]?.No_Contenedor ?? '').trim() ? (response[0]?.Neto ?? null) : null)
                setVgmD(response[0]?.Vgm ?? null)
            setTrailer(buscarTrailer[0])
          }

            
          } catch (error) {
            
          }
      };
      ingresos();
      }
  }, [Recibo?.Caso, auth]);
   
    return (
        <>
            <Overlay>
                <ContenedorModal>
                <button style={{ marginBottom: 20, marginLeft: '90%' }} type='button' onClick={() => {setPdf(null) 
                  setFormSearch(null)
                }}>x</button>
                    <div >
                    <PDFViewer  style={{ width: '100%', height: "90vh" }} >
                    <Document style={{ position: 'absolute' }}>
                    <Page size="A2" style={styles.page} orientation="portrait">
                                <View style={styles.section}>
                                    <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <Image style={{width: 150, height: 150, marginLeft: '0.5vh', padding:2 }} src={logo} />
                                    
                                    <View style={{flexDirection: 'column', marginLeft: 20, marginTop: 50}}>
                                    {campo1 && campo1 !== '' ? (<>
                                    
                                    <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                    {campo1}
                                   </Text>
                                  </>): (<></>)}
                                  <Text style={{ fontSize: 9, maxWidth: 150, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                    {direccion && direccion !== '' ? direccion : ''}

                                    </Text>
                                    
                                    

                                    
                                    <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                    {departamento && departamento !== '' ? departamento : ''}
                                    </Text>

                                    <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                      {telefono && telefono !== '' ? telefono : ''}
                                    </Text>

                                    
                                    </View>
                                   
                                    </View>
                                  <Text style={{ marginBottom: '0.5%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginTop: '1%' }}>
                                  ---------------------------------------------------------------------
                                    </Text>
                                  <Text style={{ marginBottom: '0.5%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                        {Recibo?.Caso == "Despacho" ? "DESPACHO PRODUCTO" : "ENTRADA MATERIA PRIMA"}
                                    </Text>

                                    <Text style={{ marginBottom: '1%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                    ---------------------------------------------------------------------
                                    </Text>

                                    <Text style={{ marginBottom: '2%', fontSize: 24, maxWidth: 600, fontWeight: fontWeight, letterSpacing: 2 }}>
                                        NUMERO TIQUETE: {recibo? recibo.No_Tiquete: ''}
                                    </Text>

                                  
                                   
                                    <View style={{flexDirection: 'row',}}>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                          PLACA:
                                      </Text>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginLeft: 139}}>
                                      {recibo ? recibo.Placa : ''}
                                      </Text>
                                    </View>

                                    <View style={{flexDirection: 'row', }} >
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }} >
                                          TRAILER:
                                      </Text>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginLeft: 117 }} numberOfLines={1} >
                                      {recibo ? recibo.No_R : ''}
                                      </Text>
                                    </View>

                                    <View style={{flexDirection: 'row', }} >
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }} >
                                          SHIPMENT: 
                                      </Text>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginLeft: 97 }} numberOfLines={1} >
                                      {recibo ? recibo.No_Shipment: ''}
                                      </Text>
                                    </View>

                                    <View style={{flexDirection: 'row', }} >
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }} >
                                          SELLO: 
                                      </Text>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginLeft: 140 }} numberOfLines={1} >
                                      {recibo ? recibo.No_Sello: ''}
                                      </Text>
                                    </View>

                                    <View style={{flexDirection: 'row', }} >
                                      <Text style={{ marginBottom: '1%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }} >
                                          CONTENEDOR: 
                                      </Text>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginLeft: 57 }} numberOfLines={1} >
                                      {recibo ? recibo.No_Contenedor: ''}
                                      </Text>
                                    </View>

                                    <View style={{flexDirection: 'row', }} >
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }} >
                                          CONDUCTOR:
                                      </Text>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginLeft: 72 }} numberOfLines={1} >
                                      {recibo ? recibo.Conductor : ''}
                                      </Text>
                                    </View>


                                    <View style={{flexDirection: 'row', }} >
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }} >
                                          TRANSPORTADORA:
                                      </Text>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginLeft: 5 }} numberOfLines={1} >
                                      {recibo ? recibo.Transportadora : ''}
                                      </Text>
                                    </View>
                                    <View style={{flexDirection: 'row', }} >
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }} >
                                          PLANTA:
                                      </Text>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginLeft: 129 }} numberOfLines={1} >
                                      {recibo ? recibo.Planta : ''}
                                      </Text>
                                    </View>

                                  

                                     <View style={{flexDirection: 'row',}}>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                       {Recibo?.Caso === "Despacho" ? 'PRODUTO': 'MATERIA PRIMA'}
                                      </Text>

                                      {Recibo?.Caso === "Despacho" ? (<>
                                        <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing,  marginLeft:113 }}>
                                        {recibo ? Recibo?.Caso == "Despacho" ?  recibo.Producto : recibo.Materia_Prima: ''}
                                      </Text>
                                      
                                      </>) : (<>
                                      
                                        <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing,  marginLeft:50 }}>
                                        {recibo ? Recibo?.Caso == "Despacho" ?  recibo.Producto : recibo.Materia_Prima: ''}
                                      </Text>
                                      
                                      </>)}
                                      
                                    </View>

                                    <View style={{flexDirection: 'row',}}>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                      {Recibo?.Caso === "Despacho" ? 'CLIENTE': 'PROVEEDOR'}
                                     
                                      </Text>

                                      {Recibo?.Caso === "Despacho" ? (<>
                                      
                                        <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing,   marginLeft:125 }}>
                                        {recibo ? Recibo?.Caso == "Despacho" ?  recibo.Cliente : recibo.Proveedor: ''}
                                      
                                      </Text>
                                      </>) : (<>
                                      
                                        <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing,  marginLeft:84 }}>
                                        {recibo ? Recibo?.Caso == "Despacho" ?  recibo.Cliente : recibo.Proveedor: ''}
                                      
                                      </Text>
                                      </>)}
                                      
                                    </View>
                                    
                                    <View style={{flexDirection: 'row',}}>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                      {Recibo?.Caso === "Despacho" ? 'DESTINO': 'ORIGEN'}
                                      
                                      </Text>

                                      {Recibo?.Caso === "Despacho" ? (<>
                                      
                                        <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginLeft:122 }}>
                                      {recibo ? Recibo?.Caso == "Despacho" ?  recibo.Destino  : recibo.Origen: ''}
                                      
                                      </Text>
                                      
                                      </>) : (<>
                                        <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing,  marginLeft:135 }}>
                                      {recibo ? Recibo?.Caso == "Despacho" ?  recibo.Destino  : recibo.Origen: ''}
                                      
                                      </Text>
                                      
                                      </>)}
                                     
                                    </View>

                                    <View style={{flexDirection: 'row',}}>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                       RESPONSABLE:
                                      </Text>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginLeft:52 }}>
                                        { recibo ? recibo.Responsable : ''}
                                      </Text>
                                    </View>
                                    <Text style={{ marginBottom: '1%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginTop: '1%' }}>
                                    ---------------------------------------------------------------------
                                    </Text>
                                    {/* <View style={{flexDirection: 'row',}}>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                          CEDULA:
                                      </Text>
                                      <Text style={{ marginBottom: '0%', fontSize: 10, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing,  marginLeft:54 }}>
                                        {datos ? datos.Cedula : ''}
                                      </Text>
                                    </View> */}
                                    {/* <View style={{flexDirection: 'row',}}>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                          TRANSPORTADORA:
                                      </Text>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing,  }}>
                                          {datos ? datos.Transportadora : ''}
                                      </Text>
                                    </View> */}
                                   
                                    
                                   
                                   {recibo ? recibo.Fecha_Entrada == "Recoger_Trailer" || recibo.Fecha_Entrada == "Descargar_Trailer"  ? (<>
                                   

                                   <View style={{flexDirection: 'row',}}>
                                     <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                      TRAILER:
                                     </Text>
                                     <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing,   marginLeft:153 }}>
                                       { trailer ? trailer.Trailer : ''}
                                     </Text>
                                   </View>
                                 

                                  <View style={{flexDirection: 'row',}}>
                                     <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                      PLACA DE ENTRADA:
                                     </Text>
                                     <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing,   marginLeft:29 }}>
                                       { trailer ? trailer.Placa_Entrada : ''}
                                     </Text>
                                   </View>


                                   <View style={{flexDirection: 'row',}}>
                                     <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                      PESO ENTRADA:
                                     </Text>
                                     <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginLeft:76 }}>
                                       { trailer ? trailer.Peso_Entrada : ''}
                                     </Text>
                                   </View>


                                   <View style={{flexDirection: 'row',}}>
                                     <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                      PLACA SALIDA:
                                     </Text>
                                     <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginLeft:92 }}>
                                       { trailer ? trailer.Placa_Salida : ''}
                                     </Text>
                                   </View>


                                   <View style={{flexDirection: 'row',}}>
                                     <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                      PESO SALIDA:
                                     </Text>
                                     <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginLeft:103 }}>
                                       { trailer ? trailer.Peso_Salida : ''}
                                     </Text>
                                   </View>


                                   <View style={{flexDirection: 'row',}}>
                                     <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                      PESO TRAILER:
                                     </Text>
                                     <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing,   marginLeft:89 }}>
                                       { trailer ? trailer.Peso_Trailer : ''}
                                     </Text>
                                   </View>

                                     <View style={{flexDirection: 'row',}}>
                                                                         <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                                                           CARGA:
                                                                         </Text>
                                                                         <Text style={{ marginBottom: '1%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginLeft:170 }}>
                                                                           {carga ? carga: ''}
                                                                         </Text>
                                                                       </View>
                                   
                                                                       
                                   
                                   
                                                                       <View style={{flexDirection: 'row',}}>
                                                                         <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                                                           VGM DEFINITIVO:
                                                                         </Text>
                                                                         <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing,  marginLeft:68 }}>
                                                                             {vgmD ? vgmD: "0 "}
                                                                         </Text>
                                                                       </View>

                                  <Text style={{ marginBottom: '1%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginTop: '1%' }}>
                                  ---------------------------------------------------------------------
                                  </Text>
                                 
                                 </>) : (<></>) : (<></>)}
                                    
                                    <View style={{ lineHeight: 1.5 }}>
                                        <View style={{ marginBottom: '0.1%' }}>
                                            <View style={{ flex: 2, display: "flex", flexDirection: "column", maxWidth: 1200, marginBottom: "2%", }}>
                                                <Text style={{ fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                                    PESO BRUTO:
                                                </Text>
                                                <Text style={{ fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, marginLeft: "20.5%", letterSpacing: 1.5 }}>
                                                {recibo ? recibo.Bruto: "0 "}
                                                </Text>
                                                <Text style={{ marginBottom: '2%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, marginLeft: "29%", letterSpacing: letterSpacing }}>
                                                    KG
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={{ marginBottom: '0.1%' }}>
                                            <View style={{ flex: 2, display: "flex", flexDirection: "column", maxWidth: 1200, marginBottom: "2%" }}>
                                                <Text style={{ fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                                    PESO TARA:
                                                </Text>
                                                <Text style={{ fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, marginLeft: "20.5%", letterSpacing: 1.5 }}>
                                                {recibo ? recibo.Tara: "0 "}
                                                </Text>
                                                <Text style={{ marginBottom: '2%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, marginLeft: "29%", letterSpacing: letterSpacing }}>
                                                    KG
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={{ marginBottom: '0%' }}>
                                            <View style={{ flex: 2, display: "flex", flexDirection: "column", maxWidth: 1200, marginBottom: "2%", }}>
                                                <Text style={{ fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                                    PESO NETO:
                                                </Text>
                                                <Text style={{ fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, marginLeft: "20.5%", letterSpacing: 1.5 }}>
                                                    {recibo ? recibo.Neto: "0 "}
                                                </Text>
                                                <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, marginLeft: "29%", letterSpacing: letterSpacing }}>
                                                    KG
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={{ marginBottom: '0%' }}>
                                            <View style={{ flex: 2, display: "flex", flexDirection: "column", maxWidth: 1200, marginBottom: "2%", }}>
                                                <Text style={{ fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                                    TARA CONTENEDOR:
                                                </Text>
                                                <Text style={{ fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, marginLeft: "20.5%", letterSpacing: 1.5 }}>
                                                    {trailer ? trailer.Gross_Entrada : recibo ? recibo.Tara_Contenedor: "0 "}
                                                </Text>
                                                <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, marginLeft: "29%", letterSpacing: letterSpacing }}>
                                                    KG
                                                </Text>
                                            </View>
                                        </View>


                                        <View style={{ marginBottom: '0%' }}>
                                            <View style={{ flex: 2, display: "flex", flexDirection: "column", maxWidth: 1200, marginBottom: "2%", }}>
                                                <Text style={{ fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                                    PESO VGM:
                                                </Text>
                                                <Text style={{ fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, marginLeft: "20.5%", letterSpacing: 1.5 }}>
                                                    { Recibo?.Vgm ? Recibo.Vgm : "0 "}
                                                </Text>
                                                <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, marginLeft: "29%", letterSpacing: letterSpacing }}>
                                                    KG
                                                </Text>
                                            </View>
                                        </View>
                                    </View>


                                    <Text style={{ marginBottom: '1%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginTop: '1%' }}>
                                    ---------------------------------------------------------------------
                                    </Text>


                                    <Text style={{ marginBottom: '1%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                        FECHA Y HORA DE EVENTOS
                                    </Text>


                                    <View style={{ marginBottom: '0.1%' }}>
                                        <View style={{ flex: 2, display: "flex", flexDirection: "column", maxWidth: 1200, marginBottom: "2%", }}>
                                            <Text style={{ fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                                ENTRADA:
                                            </Text>
                                            <Text style={{ fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, marginLeft: "12%", letterSpacing: letterSpacing }}>
                                            {Recibo?.Caso=='Ingreso'? fechaSql(recibo?.Fecha_Peso_lleno) + ' ' + recibo?.Hora_Peso_lleno: fechaSql(recibo?.Fecha_Peso_Vacio) + ' ' + recibo?.Hora_Peso_Vacio}
                                            </Text>

                                        </View>
                                    </View>

                                    <View style={{ marginBottom: "2%" }}>
                                        <View style={{ flex: 2, display: "flex", flexDirection: "column", maxWidth: 1200, marginBottom: "2%" }}>
                                            <Text style={{ fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                                SALIDA:
                                            </Text>
                                            <Text style={{ fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, marginLeft: "12%", letterSpacing: letterSpacing }}>
                                            {Recibo?.Caso=='Ingreso'? fechaSql(recibo?.Fecha_Peso_Vacio) + ' ' + recibo?.Hora_Peso_Vacio: fechaSql(recibo?.Fecha_Peso_lleno) + ' ' + recibo?.Hora_Peso_lleno}
                                            </Text>

                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', marginBottom: '1%' }} >
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }} >
                                          OPERARIO:
                                      </Text>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing,maxWidth: maxWidth, marginLeft: 42 }} numberOfLines={1} >
                                      {recibo ? recibo.Responsable : '' }
                                      </Text>
                                    </View>
                                    <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                        OBSERVACIONES:
                                    </Text>
                                    <Text style={{ marginBottom: '3%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                    {recibo ? recibo.Observaciones : '' }
                                    </Text>
                                    
                                </View>
                            </Page>
                        </Document>
                    </PDFViewer>
                    </div>
                </ContenedorModal>
            </Overlay>

        </>
    )
}

export default Modal;


const styles = StyleSheet.create({
  page:{
    flexDirection:'row',
    backgroundColor:'white'
  },
  section:{
    margin:'10',
    padding:'2',
    flexGrow:1,
    position:'absolute'
  },
  text:{
    fontSize:4,
    textAlign:'left',
    margin: 5,
    position:'absolute',
    fontWeight:2,
    flexWrap: 'wrap'
    
  },
  textHeader:{
    fontSize:4,
    textAlign:'left',
    marginLeft:6,
    
    position:'absolute'

  },
  line:{
    
    backgroundColor:'black',
    width:'90vw',
    height:0.3,
    marginVertical:0.6,
    marginHorizontal: 0.5
    
  }
})



const Overlay = styled.div`
    z-index: 100;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.5);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Roboto, Helvetica, sans-serif ;
`;


const ContenedorModal = styled.div`

    width: 500px;
    min-height: 100px;
    background: #fff;
    position: relative;
    border-radius: 5px;
    box-shadow: rgba(100,100,111, 0.2) 0px 7px 39px 0px;
    padding: 20px;
    font-family: Roboto, Helvetica, sans-serif ;
`;




