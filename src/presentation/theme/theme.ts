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

    background:'#fff', 

}
export const globalStyles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: globalColors.background, 
        textAlign: 'center',
        justifyContent: 'center',
        
    },

    primaryButton: {
        backgroundColor: globalColors.primary,
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
        color: globalColors.profile,
        fontSize: 18,
        textAlign: 'center',
    },
    productScreen: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: '#e9f6f8'
        
    },
})