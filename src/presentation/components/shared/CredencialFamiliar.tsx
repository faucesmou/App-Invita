// Credencial.tsx
import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Image } from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from '@ui-kitten/components';
import { xml2json } from 'xml-js';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { FullScreenLoader } from '../ui/FullScreenLoader';
import { globalStylesCredentials } from '../../screens/credential/css/themeCredentials';


const convert = { xml2json };
const isotipo = require('../../screens/credential/CredentialsData/images/Isotipo.png');

type PlanName = 'titanium' | 'platinum' | 'black' | 'gold' | 'green';

const PlanPalettes: Record<PlanName, string[]> = {
  titanium: ['#8a6fa2', '#452a64', '#452a64', '#452a64'],
  platinum: ['#8c9292', '#8c9292', '#8c9292', '#8c9292'],
  black: ['#474648', '#161516', '#161516', '#161516'],
  gold: ['#98671e', '#8d7249', '#8d7249', '#8d7249'],
  green: ['#29bd0f', '#47ac34', '#47ac34', '#47ac34'],
};

interface CredencialFamiliarProps {
  idAfiliado: string;
}

export const CredencialFamiliar = ({ idAfiliado }: CredencialFamiliarProps) => {
  const [credencial, setCredencial] = useState('');
  const [isConsulting, setIsConsulting] = useState(false);
  const [datosCredencial, setDatosCredencial] = useState({
    plan: '',
    nombreAfiliado: '',
    numAfiliado: '',
    fecVencimiento: ''
  });

  const contarPalabras = (texto:string) => {
    // Dividimos el texto por espacios y filtramos para eliminar espacios en blanco
    const palabras = texto.split(' ').filter(palabra => palabra !== '');
    return palabras.length;
  };

  /*   const { idAfiliado } = useAuthStore(); */
  const idAfiliado2 = idAfiliado;
  console.log('ESTE ES EL idAfiliado desde ZARATUSTRA: ---->--->', idAfiliado2);

  const getPlanColors = (plan: string): string[] => {
    if (plan in PlanPalettes) {
      return PlanPalettes[plan as PlanName];
    }
    return [];
  };
  const planColors = getPlanColors(datosCredencial.plan);

  /*   const planColors = PlanPalettes[datosCredencial.plan] || []; */

  useEffect(() => {
    const consultaDatosCredencial = async (idAfiliado: string | undefined) => {
      try {
        setIsConsulting(true);
        const response = await axios({
          method: 'get',
          url: `https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPBuscaDatoCredencial?IMEI=ADMCE09D187-8D2C-4592-AE43-87B0D657299C&idAfiliado=${idAfiliado2}`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        const data = await response.data;
        const resultado = convert.xml2json(data, { compact: true, spaces: 4 });
        const parseado = JSON.parse(resultado);
        const nombreAfiliado = parseado.Resultado.fila.tablaEncabezado.nombreAfiliado._text;
        const numAfiliado = parseado.Resultado.fila.tablaEncabezado.numAfiliado._text;
        const fecVencimiento = parseado.Resultado.fila.tablaEncabezado.fecVencimiento._text;
        const tipoTarjeta = parseado.Resultado.fila.tablaEncabezado.tipoTarjeta._text.substring(parseado.Resultado.fila.tablaEncabezado.tipoTarjeta._text.lastIndexOf(' ') + 1).toLowerCase();

        setIsConsulting(false);
        setDatosCredencial({
          plan: tipoTarjeta,
          nombreAfiliado,
          numAfiliado,
          fecVencimiento,
        });
        /*    setDatosCredencial(prevState => ({
              ...prevState,
              plan: 'titanium'
            }));  */
        /* titanium platinum black gold green*/
      } catch (error) {
        console.log(error);
        setIsConsulting(false);
      }
    };

    consultaDatosCredencial(idAfiliado);
  }, [idAfiliado]);

  const cantidadPalabras = contarPalabras(datosCredencial.nombreAfiliado);

  return (
    <View style={{ /* flex: 1, */ marginBottom: '20%', /* marginHorizontal: '20%'  */ /* backgroundColor: 'green', */ /* marginRight:45, marginLeft: 45  */ }}>
      {isConsulting ? (
     
        <> 
        <FullScreenLoader />
        </>
      ) : (
        <View  style={{
        margin: 15, alignItems: 'center',   /* backgroundColor: 'blue',  */  marginBottom:3, marginRight:45, marginLeft: 45 }} >
          <LinearGradient colors={planColors} style={{...globalStylesCredentials.frenteCardHome, marginBottom: 0,}}>
            <ImageBackground source={require('../../screens/credential/CredentialsData/images/BackgroundLogoGray3.png')} 
            imageStyle={{
             /*  resizeMode: "cover", */
              flex: 1,
              justifyContent: 'flex-start',
              width: '100%',
              height: '80%',
              transform: [{ translateX: 190 }, { translateY: -35 }],
            }} 
            
            >
              <View>
                <View style={{ alignItems: 'flex-start', padding: 5, marginTop: 5 }}>
                  <Image source={isotipo} style={{ width: 50, height: 50, marginBottom: 10 }} />
                  <View style={globalStylesCredentials.contenedorTituloAndes}>
                    <Text style={globalStylesCredentials.tituloAndes}>andes</Text>
                    <Text style={globalStylesCredentials.tituloAndes}>salud</Text>
                  </View>
                </View>
                  <View style={[globalStylesCredentials.frenteCardHome2, { alignItems: 'flex-end', justifyContent: 'flex-end' }]}>
                    <Text style={globalStylesCredentials.planTitleHome}>Plan {datosCredencial.plan}</Text>
                    <View /* style={globalStylesCredentials.fuente} */
                      style={[globalStylesCredentials.fuente,
                      cantidadPalabras >= 3 && { width: '60%' },
                      cantidadPalabras === 2 && { width: '50%' },
                      ]}

                    >
                    <Text style={{ color: 'white' }}>{datosCredencial.nombreAfiliado}</Text>
                    <Text style={{ color: 'white' }}>{datosCredencial.numAfiliado}</Text>
                    <Text style={{ color: 'white' }}>{datosCredencial.fecVencimiento}</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </LinearGradient>

       {/* dorso de la tarjeta: */}

               <View  >

                <LinearGradient
                  colors={planColors}
                  /* style={globalStylesCredentials.frenteCard} */
                  style={{...globalStylesCredentials.frenteCardHome, marginBottom:10,}}
                >

                  <View  >
                    <View style={{ alignItems: 'flex-end', width: '95%', height: 50, padding: 10, }}>
                      <Image
                        source={isotipo}
                        style={{ width: 50, height: 50, marginBottom: 10, alignItems: 'center', }}
                      />
                      <View style={globalStylesCredentials.contenedorTituloAndesDorso}>
                        <Text style={globalStylesCredentials.tituloAndes} >andes</Text>
                        <Text style={[globalStylesCredentials.tituloAndes, { fontWeight: 'normal' }]}>salud</Text>
                      </View>
                    </View>

                    <View style={globalStylesCredentials.dorsoCard}>
                      <View style={{ alignItems: 'center' }}>
                        <View style={{ padding: 5 }}>
                          <Text style={{ color: 'white', textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>
                            Esta credencial es personal e intransferible para uso exclusivo del titular. Debe presentarse acompañado de DNI o Cédula de Identidad
                          </Text>
                        </View>
                        <View style={{ backgroundColor: 'white', padding: 5, borderRadius: 10 }}>
                          <Text style={{ color: 'blue', textAlign: 'center', fontWeight: 'bold' }}>
                            www.andessalud.com.ar
                          </Text>
                        </View>
                        <View style={{ padding: 5 }}>
                          <Text style={{ color: 'white', textAlign: 'center', fontSize: 13, }}>
                            Superintendencia de Servicio de Salud
                          </Text>
                          <Text style={{ color: 'white', textAlign: 'center', fontSize: 12, }}>
                            Órgano de Control 0800 222 SALUD (72583) www.sssalud.gov.ar
                          </Text>
                        </View>
                      </View>
                   
                    </View>
                  </View>

                </LinearGradient>

              </View> 
        </View>
         
      )
      }
    </View>
  );
};


