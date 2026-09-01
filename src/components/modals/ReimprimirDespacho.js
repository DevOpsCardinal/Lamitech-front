import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { PDFViewer } from '@react-pdf/renderer';
import { Page, Text,  Document, StyleSheet, Image, Line, View } from '@react-pdf/renderer';
import useAuth from 'hooks/useAuth';
import { getRecibo } from 'API/configuraciones';
import { getTrailer } from 'API/trailer';
import { getTrailer2 } from 'API/trailer';
import logo  from '../../assets/img/logo.png'


const maxWidth = 300
const letterSpacing = 1
const fontSize = 20
const fontWeight = 'thin'
const Modal = ({ datos, setDatos }) => {
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


    const buscarTrailerF = async () => {
      // La carga y el VGM los calcula y persiste el backend (calculos/pesos.js);
      // aqui solo se leen. Van FUERA del if del trailer: estaban dentro, y por
      // eso un movimiento sin trailer nunca mostraba el VGM aunque estuviera
      // calculado y guardado en la base.
      setCarga(datos?.Carga ?? null)
      setVgmD(datos?.Vgm ?? null)

      if(datos.Fecha_Entrada !== ""){
        const buscarTrailer = await getTrailer2(auth, datos.No_R, datos.Placa, datos.Fecha_Entrada, datos.Fecha_Peso_Vacio)

        console.log("buscarTrailer: ", buscarTrailer);


        if(buscarTrailer?.length > 0){

        
        
        console.log("buscarTrailer: ", buscarTrailer);
        console.log("Bruto: ", parseInt(datos.Bruto));
            console.log("tara: ", parseInt(datos.Tara));
            console.log("trailer: ", parseInt(buscarTrailer[0].Gross_Entrada));
            console.log("tara contenedor: ", parseInt(buscarTrailer[0].Peso_Trailer));
        setTrailer(buscarTrailer[0])
       }
      }
    }
    useEffect(() => {
      buscarTrailerF()
    }, [datos])
    

  const { auth } = useAuth()
  let y, x1,x2,x3,x4
  const hoy = new Date()
        const despachos = async () => {
            const reciboData = await getRecibo(auth)
            console.log("Recibo", reciboData)
            setEmpresa(reciboData[0]?.Valor);
            setDepartamento(reciboData[1]?.Valor);
            setDireccion(reciboData[2]?.Valor);
            setTelefono(reciboData[3]?.Valor);
            setCampo1(reciboData[4]?.Valor)
            setCampo2(reciboData[5]?.Valor)


           
        }

        despachos()

        const fechaActualISO = () =>{
          const fecha = new Date();
          let dia = fecha.getDate();
          let mes = fecha.getMonth()+1;
          let año = fecha.getFullYear();
          return`${dia<10? '0' :''}${dia}/${mes<10? '0':''}${mes}/${año}`
        }

        const horaISOActual = () =>{
          let horaBase = hoy.getHours()
          let hora
          let minutosBase= hoy.getMinutes()
          let minutos
          let segundosBase= hoy.getSeconds()
          let segundos
          horaBase<10? hora=`0${horaBase}` : hora=horaBase
          minutosBase<10? minutos=`0${minutosBase}`: minutos=minutosBase
          segundosBase<10? segundos=`0${segundosBase}`: segundos=segundosBase
          return `${hora}:${minutos}:${segundos}`
        }
        function fechaSql(fecha){
          if(fecha){
            console.log("fecha", fecha);
            const partes = fecha?.split('T')
            return partes[0]
          }else {
            return ''
          }
        
        }
        const fechaISO = (value) =>{
          const fecha = value.split('T')[0]
          console.log('valor de funcion '+fecha);
          let [year, month, day]= fecha.split('-').map(Number);
          const formatMonth = month<10 ?  `0${month}` : month
          const formatDay = day<10 ? `0${day}` : day
  
          return `${formatDay}/${formatMonth}/${year}`
        }

        const cambiarEsados = () => {
          setDatos(null)
      }

    return (
        <>
<Overlay>
                <ContenedorModal>
                <button style={{ marginBottom: 20, marginLeft: '90%' }} type='button' onClick={() => cambiarEsados()}>x</button>
                <div >
                    <PDFViewer  style={{ width: '100%', height: "90vh",  }} >
                    <Document style={{ position: 'absolute',  }} >
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
                                  <Text style={{ fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
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
                                       DESPACHO PRODUCTO
                                    </Text>

                                    <Text style={{ marginBottom: '1%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                    ---------------------------------------------------------------------
                                    </Text>

                                    <Text style={{ marginBottom: '2%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                        NUMERO TIQUETE: {datos? datos.No_Tiquete: ''}
                                    </Text>

                                  
                                   
                                    <View style={{flexDirection: 'row',}}>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                          PLACA:
                                      </Text>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginLeft: 139}}>
                                      {datos ? datos.Placa : ''}
                                      </Text>
                                    </View>

                                    <View style={{flexDirection: 'row', }} >
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }} >
                                          TRAILER:
                                      </Text>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginLeft: 117 }} numberOfLines={1} >
                                      {datos ? datos.No_R : ''}
                                      </Text>
                                    </View>

                                    <View style={{flexDirection: 'row', }} >
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }} >
                                          SHIPMENT: 
                                      </Text>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginLeft: 97 }} numberOfLines={1} >
                                      {datos ? datos.No_Shipment: ''}
                                      </Text>
                                    </View>

                                    <View style={{flexDirection: 'row', }} >
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }} >
                                          SELLO: 
                                      </Text>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginLeft: 140 }} numberOfLines={1} >
                                      {datos ? datos.No_Sello: ''}
                                      </Text>
                                    </View>

                                    <View style={{flexDirection: 'row', }} >
                                      <Text style={{ marginBottom: '1%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }} >
                                          CONTENEDOR: 
                                      </Text>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginLeft: 57 }} numberOfLines={1} >
                                      {datos ? datos.No_Contenedor: ''}
                                      </Text>
                                    </View>

                                    <View style={{flexDirection: 'row', }} >
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }} >
                                          CONDUCTOR:
                                      </Text>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginLeft: 72 }} numberOfLines={1} >
                                      {datos ? datos.Conductor : ''}
                                      </Text>
                                    </View>


                                    <View style={{flexDirection: 'row', }} >
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }} >
                                          TRANSPORTADORA:
                                      </Text>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginLeft: 5 }} numberOfLines={1} >
                                      {datos ? datos.Transportadora : ''}
                                      </Text>
                                    </View>
                                    <View style={{flexDirection: 'row', }} >
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }} >
                                          PLANTA:
                                      </Text>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginLeft: 129 }} numberOfLines={1} >
                                      {datos ? datos.Planta : ''}
                                      </Text>
                                    </View>

                                  

                                     <View style={{flexDirection: 'row',}}>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                      PRODUTO
                                      </Text>

                                      
                                        <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginLeft:113 }}>
                                        {datos ? datos?.Producto : ''}
                                      </Text>
                                      
                                      
                                      
                                    </View>

                                    <View style={{flexDirection: 'row',}}>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                      CLIENTE
                                     
                                      </Text>

                                      
                                      
                                        <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginLeft:125 }}>
                                        {datos ? datos?.Cliente : ''}
                                      
                                      </Text>
                                      
                                      
                                    </View>
                                    
                                    <View style={{flexDirection: 'row',}}>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                      DESTINO
                                      
                                      </Text>

                                      
                                      
                                        <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing,  marginLeft:122 }}>
                                      {datos ? datos?.Destino : ''}
                                      
                                      </Text>
                                      
                                     
                                     
                                    </View>

                                    <View style={{flexDirection: 'row',}}>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                       RESPONSABLE:
                                      </Text>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginLeft:52 }}>
                                        { datos ? datos.Responsable : ''}
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
                                   
                                    {datos ? datos.Fecha_Entrada == "Recoger_Trailer" ? (<>
                                      {datos ? datos.Fecha_Entrada != "" ? (<>
                                    <View style={{flexDirection: 'row',}}>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                       TRAILER:
                                      </Text>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing , marginLeft:153}}>
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
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing,  marginLeft:76 }}>
                                        { trailer ? trailer.Peso_Entrada : ''}
                                      </Text>
                                    </View>


                                    <View style={{flexDirection: 'row',}}>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                       PESO TARA:
                                      </Text>
                                      <Text style={{ marginBottom: '1%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing,   marginLeft:124 }}>
                                        { trailer ? trailer.taraCab1 : ''}
                                      </Text>
                                    </View>


                                    <View style={{flexDirection: 'row',}}>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                       PLACA SALIDA:
                                      </Text>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing,   marginLeft:92 }}>
                                        { trailer ? trailer.Placa_Salida : ''}
                                      </Text>
                                    </View>

                                    <View style={{flexDirection: 'row',}}>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                       PESO SALIDA:
                                      </Text>
                                      <Text style={{ marginBottom: '1%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing,   marginLeft:103 }}>
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
                                        {carga === null || carga === undefined ? '' : carga}
                                      </Text>
                                    </View>

                                    


                                    <View style={{flexDirection: 'row',}}>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                        VGM DEFINITIVO:
                                      </Text>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing,  marginLeft:68 }}>
                                          {vgmD ? vgmD: ''}
                                      </Text>
                                    </View>
                                    <Text style={{ marginBottom: '1%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing, marginTop: '1%' }}>
                                    ---------------------------------------------------------------------
                                    </Text>
                                   
                                   </>) : (<></>) : (<></>)}
                                    
                                    </>) : (<></>): (<></>)}
                                    
                                   
                                    
                                    <View style={{ lineHeight: 1.5 }}>
                                        <View style={{ marginBottom: '0.1%' }}>
                                            <View style={{ flex: 2, display: "flex", flexDirection: "column", maxWidth: 1200, marginBottom: "2%", }}>
                                                <Text style={{ fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                                    PESO BRUTO:
                                                </Text>
                                                <Text style={{ fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, marginLeft: "20.5%", letterSpacing: 1.5 }}>
                                                {datos ? datos.Bruto: "0 "}
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
                                                {datos ? datos.Tara: "0 "}
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
                                                    {datos ? datos.Neto: "0 "}
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
                                                    {datos ? datos.Tara_Contenedor: "0 "}
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
                                                    {datos?.Vgm ? datos.Vgm : ''}
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
                                            { fechaSql(datos?.Fecha_Peso_Vacio) + ' ' + datos?.Hora_Peso_Vacio}
                                            </Text>

                                        </View>
                                    </View>

                                    <View style={{ marginBottom: "0%" }}>
                                        <View style={{ flex: 2, display: "flex", flexDirection: "column", maxWidth: 1200, marginBottom: "4%" }}>
                                            <Text style={{ fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                                SALIDA:
                                            </Text>
                                            <Text style={{ fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, marginLeft: "12%", letterSpacing: letterSpacing }}>
                                            { fechaSql(datos?.Fecha_Peso_lleno) + ' ' + datos?.Hora_Peso_lleno}
                                            </Text>

                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', marginBottom: '1%' }} >
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }} >
                                          OPERARIO:
                                      </Text>
                                      <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing,marginLeft: 42 }} numberOfLines={1} >
                                      {datos ? datos.Responsable : '' }
                                      </Text>
                                    </View>
                                    <Text style={{ marginBottom: '0%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                        OBSERVACIONES:
                                    </Text>
                                    <Text style={{ marginBottom: '3%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                    {datos ? datos.Observaciones : '' }
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
      fontWeight:2
      
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






