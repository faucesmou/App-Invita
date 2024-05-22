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
  

    background:'#fff', 

}
export const globalStyles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: /* 'yellow' */ globalColors.background , 
        textAlign: 'center',
        justifyContent: 'center',
      
        
    },
    inputIOS: {
      padding: 0,
      width: '100%',
      height: 50,
      color: 'black',
      fontSize: 5,
      fontFamily: 'Quicksand-Light',
      borderRadius: 15,
     backgroundColor: '#efe3e3',
  
    },
    itemStyle:{
      fontSize: 16,
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
})