// Credencial.tsx
import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Image } from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from '@ui-kitten/components';
import { xml2json } from 'xml-js';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { globalStylesCredentials } from '../../screens/credential/css/themeCredentials';


const convert = { xml2json };
const isotipo = require('../../screens/credential/CredentialsData/images/Isotipo.png');

type PlanName = 'titanium' | 'platinum' | 'black' | 'gold' | 'green';

const PlanPalettes: Record<PlanName, string[]> =  {
  titanium: ['#8a6fa2', '#452a64', '#452a64', '#452a64'],
  platinum: ['#939095', '#8c9292', '#8c9292', '#8c9292'],
  black: ['#474648', '#161516', '#161516', '#161516'],
  gold: ['#98671e', '#8d7249', '#8d7249', '#8d7249'],
  green: ['#29bd0f', '#47ac34', '#47ac34', '#47ac34'],
};

const Credencial = () => {
  const [credencial, setCredencial] = useState('');
  const [isConsulting, setIsConsulting] = useState(false);
  const [datosCredencial, setDatosCredencial] = useState({
    plan: '',
    nombreAfiliado: '',
    numAfiliado: '',
    fecVencimiento: ''
  });

  const { idAfiliado } = useAuthStore();

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
          url: `https://srvloc.andessalud.com.ar/WebServicePrestacional.asmx/APPBuscaDatoCredencial?IMEI=ADMCE09D187-8D2C-4592-AE43-87B0D657299C&idAfiliado=${idAfiliado}`,
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

  return (
    <View style={{ flex: 1, marginBottom:0,  }}>
      {isConsulting ? (
      /*   <FullScreenLoader /> */
      <>
      </>
      ) : (
        <View >
          <LinearGradient colors={planColors} style={globalStylesCredentials.frenteCardHome}>
            <ImageBackground source={require('../../screens/credential/CredentialsData/images/logogris4.png')} 
            imageStyle={{
              resizeMode: "contain",/* cover o contain */
              flex: 1,
              justifyContent: 'flex-start',
              width: '80%',
              height: '80%',
              transform: [{ translateX: 210 }, { translateY: -50 }],
            }} 
            
            >
              <View>
                <View style={{ alignItems: 'flex-start', padding: 12 }}>
                  <Image source={isotipo} style={{ width: 50, height: 50, marginBottom: 10 }} />
                  <View style={globalStylesCredentials.contenedorTituloAndes}>
                    <Text style={globalStylesCredentials.tituloAndes}>andes</Text>
                    <Text style={globalStylesCredentials.tituloAndes}>salud</Text>
                  </View>
                </View>
                <View style={[globalStylesCredentials.frenteCardHome2, { alignItems: 'flex-end', justifyContent: 'flex-end' }]}>
                  <Text style={globalStylesCredentials.planTitleHome}>Plan {datosCredencial.plan}</Text>
                  <View style={globalStylesCredentials.fuente}>
                    <Text style={{ color: 'white' }}>{datosCredencial.nombreAfiliado}</Text>
                    <Text style={{ color: 'white' }}>{datosCredencial.numAfiliado}</Text>
                    <Text style={{ color: 'white' }}>{datosCredencial.fecVencimiento}</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </LinearGradient>
        </View>
      )}
    </View>
  );
};

export default Credencial;
