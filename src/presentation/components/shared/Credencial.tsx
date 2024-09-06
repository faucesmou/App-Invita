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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const convert = { xml2json };
const isotipo = require('../../screens/credential/CredentialsData/images/Isotipo.png');

type PlanName = 'titanium' | 'platinum' | 'black' | 'gold' | 'green';

const PlanPalettes: Record<PlanName, string[]> =  {
  titanium: ['#8a6fa2', '#452a64', '#452a64', '#452a64'],
  platinum: ['#8c9292', '#8c9292', '#8c9292', '#8c9292'],
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
    fecVencimiento: '',
    nombreExtendido: '',
  });

  const contarPalabras = (texto:string) => {
    // Dividimos el texto por espacios y filtramos para eliminar espacios en blanco
    const palabras = texto.split(' ').filter(palabra => palabra !== '');
    return palabras.length;
  };
  const dividirNombre = (nombreCompleto:string) => {
    const palabras = nombreCompleto.split(' ');
    if (palabras.length > 3) {
      return {
        nombreAfiliado: palabras.slice(0, 2).join(' '),
        nombreExtendido: palabras.slice(2).join(' '),
      };
    } else {
      return {
        nombreAfiliado: nombreCompleto,
        nombreExtendido: '',
      };
    }
  };

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
          nombreExtendido: ''
        }); 
   /*     setDatosCredencial(prevState => ({
               ...prevState,
               plan: 'platinum'
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
    <View style={{ /* flex: 1, */ marginBottom:0, zIndex: 3, height: hp('23%'), marginTop: hp('0%')  }}>
      {isConsulting ? (
      /*   <FullScreenLoader /> */
      <>
      </>
      ) : (
        <View style={{ height: hp('23%'), marginTop: hp('-1%') }} >
          <LinearGradient colors={planColors} style={globalStylesCredentials.frenteCardHome}>
            <ImageBackground source={require('../../screens/credential/CredentialsData/images/BackgroundLogoGray3.png')} 
            imageStyle={{
              resizeMode: "cover",/* cover o contain */
              flex: 1,
              justifyContent: 'flex-start',
             /*  width: '100%', */
              width: wp('90%'),
            /*   height: '80%', */
              height: hp('33%'),
              transform: [{ translateX: wp('44%') }, { translateY: hp('-4%') }],
             /*  transform: [{ translateX: 190 }, { translateY: -40 }], */
            }} 
            
            >
              <View>
                <View style={{ alignItems: 'flex-start',
                 padding: wp('2%'),
                  marginTop: hp('1%') }}>
                  <View style={{ width: wp('13%'),
                   height: hp('6%'), 
                   marginBottom: hp('0.5%'), 
                   marginTop: hp('-1%'), 
                   minHeight:hp('10%')  }} >
                  <Image source={isotipo} style={{ /* width: 50 */
                  width: wp('13%'), 
                  height: hp('6%'), 
                  /* height: 50 */
                  minHeight:hp('7%') ,
                   marginBottom: hp('0%'),
                    marginTop: hp('0%'),
                    resizeMode: 'contain'
                      }} />
                  </View>
                  <View style={globalStylesCredentials.contenedorTituloAndes}>
                    <Text style={globalStylesCredentials.tituloAndes}>andes</Text>
                    <Text style={globalStylesCredentials.tituloAndes}>salud</Text>
                    </View>
                  </View>
                  <View style={[globalStylesCredentials.frenteCardHome2, { alignItems: 'flex-end', justifyContent: 'flex-end' }]}>
                    <Text style={globalStylesCredentials.planTitleHome}>Plan {datosCredencial.plan}</Text>
                    <View /* style={globalStylesCredentials.fuente} */
                      style={[globalStylesCredentials.fuente,
                      cantidadPalabras >= 3 && { /* width: '60%' */ width: wp('60%') },
                      cantidadPalabras === 2 && { /* width: '50%' */ width: wp('50%') },
                      ]} >
                      <Text style={{ color: 'white', fontSize: hp('1.7%') }}>{datosCredencial.nombreAfiliado}</Text>
                      <Text style={{ color: 'white', fontSize: hp('1.7%') }}>{datosCredencial.numAfiliado}</Text>
                      <Text style={{ color: 'white', fontSize: hp('1.7%') }}>{datosCredencial.fecVencimiento}</Text>
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
