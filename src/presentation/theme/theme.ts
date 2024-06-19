import { StyleSheet } from "react-native";

export const globalColors = {
  primary: '#7037eb',
  secondary: '#f72585',
  tertiary: '#3a0ca3',
  success: '#4cc9f0',
  warning: '#fca3100',
  danger: '#e71d36',
  dark: '#22223b',
  profile: '#577CEE',
  profile2: '#3457e6',
  orange: '#ed843e',
  select: '#efe3e3',
  disabled: '#c4d2da',
  pressed: '#3d8ee5',
  pressed2: '#ee5a3d',
  orange2: '#d83414',
  brown: '#362521',
  yellow: '#d25e1b',
  gray:'#505050',
  gray2:'#878383',
  gray3:'#c1b9bb',
  white1:'##d8d8cf',
  white2:'#ffffff',


  background: '#fff',

}
export const globalStyles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: /* 'yellow' */ 'white' /* globalColors.background */,
    textAlign: 'center',
    justifyContent: 'center',
  },
  inputIOS: {
    padding: 0,
    width: '100%',
    height: 50,
    color: 'black',
    fontSize: 10,
    fontFamily: 'Quicksand-Light',
    borderRadius: 15,
    backgroundColor: 'white' /* '#efe3e3' */,

  },
  itemStyle: {
    fontSize: 20,
    fontFamily: 'Quicksand-Light',
    flex: 1,
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    color: 'black',
    alignItems: 'center',
    borderRadius: 15,
  },
  //para la sombra: 
  pickerWrapper: {
    width: '100%',
    height: 50,
    marginBottom: 10,
    padding: 0,
    borderRadius: 15,
    backgroundColor: 'white', // Fondo para ver el borderRadius
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: -5, height: 6 }, // Desplazamiento de la sombra
    shadowOpacity: 0.2, // Opacidad de la sombra
    shadowRadius: 8, // Radio de la sombra
  },
  primaryButton: {
    backgroundColor: globalColors.profile2,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    marginBottom: 5,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center'

  },
  secondaryButton: {
    backgroundColor: 'white',
    borderColor: globalColors.orange,
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    marginBottom: 5,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center'

  },
  searchButton: {
    borderRadius: 5,
    padding: 0,
    margin: 0,
    marginBottom: 5,
    marginHorizontal: 0,
    paddingHorizontal: 0,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',

  },
  searchButtonText: {
    fontSize: 18,
    paddingHorizontal: 5,
    fontWeight: 'normal',
    color: 'white',
    fontFamily: 'Quicksand-Light',
  },
  buttonText: {
    color: globalColors.background,
    fontSize: 18,
    textAlign: 'center',
  },
  buttonText2: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  productScreen: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#e9f6f8'

  },
  /* estilos para el input numero 2: */
  containerInput2: {
    marginTop: 20,
    marginBottom: 10,
    justifyContent: 'center',
    paddingHorizontal: 30,
    /* backgroundColor: 'blue' */
  },
  estilosInput2: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 15,
    fontSize: 20,
    fontFamily: 'Quicksand-Light',
    borderRadius: 15,
  },
  /* estilos para estudios medicos enviados: */
  containerEstudiosMedicosEnv: {
    /*  flex: 0.5, */
    paddingHorizontal: 30,
    marginTop: 20,

    /*  backgroundColor: 'yellow', */
    marginBottom: 10,

  },
  titleEstudiosMedicosEnv: {
    marginBottom: 5,
    fontSize: 21,
    fontFamily: 'Quicksand-Light',
    textAlign: 'center',
  },
  resultText: {
    fontSize: 18,
    fontFamily: 'Quicksand-Light',
    margin: 10,
    marginTop: 10,
  },
  errorContainerEstudios: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f8d7da',
    borderRadius: 5,
  },
  titleErrorEstMedicosEnv: {
    marginBottom: 5,
    fontSize: 25,
    fontFamily: 'Quicksand-Light',
    textAlign: 'center',
  },
  errorTextEstudios: {
    fontSize: 18,
    color: '#721c24',
    fontFamily: 'Quicksand-Light',
    textAlign: 'center',
  },
  /* estilos para estudios consulta de facturas: */
  containerEstudiosMedicosEnv2: {
    /*    flex: 0.5,  */
    paddingHorizontal: 0,
    marginTop: 20,
    alignItems: 'center',
    /*  backgroundColor: 'yellow', */
    marginBottom: 10,

  },
  resultText2: {
    fontSize: 18,
    fontFamily: 'Quicksand-Light',
    margin: 0,
    marginTop: 0,
  },
  resultText3: {
    fontSize: 18,
    fontFamily: 'Quicksand-Light',
    margin: 0,
    marginTop: 10,
  },

  primaryButton2: {
    backgroundColor: globalColors.profile2,
    borderRadius: 5,
    padding: 5,
    margin: 10,
    marginTop: 15,
    marginBottom: 15,
    marginHorizontal: 60,
    paddingHorizontal: 10,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center'

  },
  primaryButton3: {
    backgroundColor: 'lightgrey'/* globalColors.profile2 */,
    borderRadius: 5,
    padding: 5,
    margin: 10,
    marginTop: 0,
    marginBottom: 15,
    marginHorizontal: 60,
    paddingHorizontal: 10,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',

  },
  /* probando nuesvos estilos de botones: SecondaryButton componente:  */
  buttonText3: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'normal',
/*     marginLeft: 5,  */
    flexWrap: 'wrap',
  },
  secondaryButton2: {
    backgroundColor: 'white',
  /*   minWidth: '50%', */ 
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 0 }, // Desplazamiento de la sombra
    shadowOpacity: 0.60, // Opacidad de la sombra
    shadowRadius: 20, // Radio de la sombra
    padding: 10,
    margin: 5,
    marginBottom: 5,
    marginHorizontal: 5,//distancia entre botones 
    paddingHorizontal: 20,//este si afecta
    paddingVertical:20,
    alignItems: 'flex-start',
    textAlign: 'center',
    justifyContent: 'center'

  },
  contentWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal:5,  
  },
    icon: {
    marginRight: 0, // Espacio entre el icono y el texto
  },
  iconWrapper: {
    alignItems: 'center', // Alinea el icono al centro horizontalmente
    marginBottom: 5, // Añadir margen inferior para separar el icono del texto
 /*    marginLeft:5 */
  },
  descriptionText: {
    color: 'gray',
    fontSize: 18,
    flexWrap: 'wrap',
  },
    /* probando nuesvos estilos de botones: TertiaryButton componente:  */

    TertiaryButton: {
      backgroundColor: 'white',
      minWidth: '50%', 
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 15,
      shadowColor: '#000', // Color de la sombra
      shadowOffset: { width: 0, height: 0 }, // Desplazamiento de la sombra
      shadowOpacity: 0.60, // Opacidad de la sombra
      shadowRadius: 20, // Radio de la sombra
      padding: 10,
      margin: 5,
      marginBottom: 5,
      marginHorizontal: 15,//distancia entre botones 
      paddingHorizontal: 10,//este si afecta
      paddingVertical:15,
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center'
  
    },
    contentWrapper2: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    
    },
      icon2: {
      marginRight: 5, 
      alignItems: 'flex-end',
    },
    iconWrapper2: {
      alignItems: 'flex-end', 
      marginBottom: 0, 
      marginLeft:75
    },


})