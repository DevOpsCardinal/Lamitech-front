import React, { useState, useRef, useEffect  } from 'react'
import styled from '@emotion/styled'
import { PDFViewer } from '@react-pdf/renderer';
import { Page, Text, Document, StyleSheet, Image, View  } from '@react-pdf/renderer';
import useAuth from 'hooks/useAuth';
import { ultimoDespacho } from 'API/despachoSalida';
import { getUltimoIngreso } from 'API/ingresos';
import { getRecibo } from 'API/configuraciones';
import { ultimoTransito } from 'API/entrada';
import { getTrailer } from 'API/trailer';
import { ultimoTransitoByPlaca } from 'API/entrada';
import { getDespachosByPlacaApi } from 'API/despachoSalida';
import { getIngresosByPlacaApi } from 'API/ingresos';
import logo  from '../../assets/img/logo.png'

const maxWidth = 300
const letterSpacing = 1
const fontSize = 20
const fontWeight = 'thin'



const Modal = ({ pesoNumEnv, setPdf, checkDespacho, checkEntrada, placa }) => {

  const caso = checkDespacho ? "Despacho" : "Ingreso"
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
        marginTop: 0,
      
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
    const [carga, setCarga] = useState(null)
    const [vgmD, setVgmD] = useState(null)

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

 async function transito() {

  if(checkDespacho == true){
    const response = await getDespachosByPlacaApi(auth, placa);
    console.log("ultimoTransito", response[0]);
    setRecibo(response[0]);
    console.log("Recibo", response[0]);
    

    if(response[0]?.Fecha_Entrada.length > 0){
      const buscarTrailer = await getTrailer(auth, response[0]?.No_R)
      console.log("buscarTrailer: ", buscarTrailer); 
      setTrailer(buscarTrailer[0])
      const cargaF  =  parseInt(response[0]?.Bruto) - parseInt(response[0]?.Tara) - parseInt(buscarTrailer[0].Gross_Entrada) - parseInt(buscarTrailer[0].Peso_Trailer)
      setCarga(cargaF)
      setVgmD(cargaF + parseInt(buscarTrailer[0].Peso_Trailer))
    }
  }else {
    const response = await getIngresosByPlacaApi(auth, placa);
    console.log("ultimoTransito", response[0]);
    setRecibo(response[0]);
    console.log("Recibo", response[0]);
    if(response[0]?.Fecha_Entrada.length > 0){
      const buscarTrailer = await getTrailer(auth, response[0]?.No_R)
      console.log("buscarTrailer: ", buscarTrailer); 
      setTrailer(buscarTrailer[0])

      const cargaF  =  parseInt(response[0]?.Bruto) - parseInt(response[0]?.Tara) - parseInt(buscarTrailer[0].Gross_Entrada) - parseInt(buscarTrailer[0].Peso_Trailer)
      setCarga(cargaF)

      setVgmD(cargaF + parseInt(buscarTrailer[0].Peso_Trailer))
    }
  }
   

 
  
    
  };

    useEffect(() => {
      reciboF()
      
      transito();
  }, [pesoNumEnv, setPdf]);
   
    return (
        <>
            <Overlay>
                <ContenedorModal>
                <button style={{ marginBottom: 20, marginLeft: '90%' }} type='button' onClick={() => {setPdf(null) 
                  
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
                                        {recibo?.Caso == "Despacho" ? "DESPACHO PRODUCTO" : "ENTRADA MATERIA PRIMA"}
                                    </Text>

                                    <Text style={{ marginBottom: '1%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                    ---------------------------------------------------------------------
                                    </Text>

                                    <Text style={{ marginBottom: '2%', fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
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
                                                <Text style={{ fontSize: fontSize, maxWidth: 150, fontWeight: fontWeight, marginLeft: "20.5%", letterSpacing: 1.5 }}>
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
                                                    {recibo ? recibo.Tara_Contenedor: "0 "}
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
                                                    0
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
                                        <View style={{ flex: 2, display: "flex", flexDirection: "column", maxWidth: 1200, marginBottom: "1%", }}>
                                            <Text style={{ fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                                ENTRADA:
                                            </Text>
                                            <Text style={{ fontSize: 10, maxWidth: maxWidth, fontWeight: fontWeight, marginLeft: "12%", letterSpacing: letterSpacing }}>
                                            {checkDespacho == true ? fechaSql(recibo?.Fecha_Peso_Vacio) + ' ' + recibo?.Hora_Peso_Vacio : fechaSql(recibo?.Fecha_Peso_lleno) + ' ' + recibo?.Hora_Peso_lleno}
                                            </Text>

                                        </View>
                                    </View>

                                    <View style={{ marginBottom: "2%" }}>
                                        <View style={{ flex: 2, display: "flex", flexDirection: "column", maxWidth: 1200, marginBottom: "1%" }}>
                                            <Text style={{ fontSize: fontSize, maxWidth: maxWidth, fontWeight: fontWeight, letterSpacing: letterSpacing }}>
                                                SALIDA:
                                            </Text>
                                            <Text style={{ fontSize: 10, maxWidth: maxWidth, fontWeight: fontWeight, marginLeft: "12%", letterSpacing: letterSpacing }}>
                                            {recibo?.Fecha_salida !== null || recibo?.Fecha_salida !== ' ' ? recibo?.Fecha_salida + ' ' +  recibo?.Hora_salida : checkDespacho == true ? fechaSql(recibo?.Fecha_Peso_lleno) + ' ' + recibo?.Hora_Peso_lleno : fechaSql(recibo?.Fecha_Peso_Vacio) + ' ' + recibo?.Hora_Peso_Vacio}
                                            </Text>

                                        </View>
                                    </View>
                                   
                                    
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




