import { StyleSheet } from "react-native";

export const globalColors = {
    primary:'#7037eb',
    secondary:'#f72585',
    tertiary:'#3a0ca3',
    success:'#4cc9f0',
    warning:'#fca3100',
    danger:'#e71d36',
    dark:'#22223b',
    profile: '#577CEE',
    profile2:'#3457e6',
    orange: '#ed843e',
    select: '#efe3e3',
    disabled: '#92c0f0',
    pressed: '#3d8ee5',
  

    background:'#fff', 

}
export const globalStyles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: /* 'yellow' */  globalColors.background   , 
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
     backgroundColor: '#efe3e3',
  
    },
    itemStyle:{
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
    pickerWrapper:{
      width: '100%', 
      height: 50,
      marginBottom:10,
      padding: 0,
      borderRadius: 15,
      backgroundColor: 'white', // Fondo para ver el borderRadius
      shadowColor: '#000', // Color de la sombra
      shadowOffset: { width: -5, height: 6 }, // Desplazamiento de la sombra
      shadowOpacity: 0.5, // Opacidad de la sombra
      shadowRadius: 8, // Radio de la sombra
    },
    primaryButton: {
        backgroundColor: globalColors.profile2,
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
    secondaryButton: {
        backgroundColor: 'white',
        borderColor: globalColors.orange,
        borderWidth:2,
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
        color: globalColors.orange,
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
      marginBottom:10,
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
    marginBottom:10,

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
      margin:10,
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
      fontSize: 20,
      color: '#721c24',
      fontFamily: 'Quicksand-Light',
      textAlign: 'center',
    },

})