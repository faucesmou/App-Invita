import { StyleSheet } from "react-native";

export const credentialsColors = {
    blue:'#0f4f87',
    indigo:'#6610f2',
    purple:'#6f42c1',
    pink:'#e83e8c',
    red:'#dc3545',
    orange:'#fd7e14',
    yellow:'#f9b200',
    green:'#28a745',
    teal:'#20c997',
    cyan:'#17a2b8',
    white: '#fff',
    gray: '#6c757d',
    grayDark: '#343a40',
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    info: '#17a2b8',
    warning: '#ffc107',
    danger: '#dc3545',
    light: '#f8f9fa',
    dark: '#343a40',
    background:'#fff', 

}



export const credencialStyles = StyleSheet.create({
  body: {
    backgroundColor: '#f1e3c0',
  },
  link: {
    textDecorationLine: 'none',
    color: 'black',
  },
  linkHover: {
    color: 'blueviolet',
  },
  container: {
      flex: 1,
      padding: 20,
      backgroundColor: credentialsColors.background, 
      textAlign: 'center',
      justifyContent: 'center',
      
  },

});



export const globalStylesCredentials = StyleSheet.create({
  credenciales: {
    backgroundColor: 'aliceblue',
    width: '100%',
    padding: 50,
    // fontFamily: 'Katarine Experts',
  },
  h1: {
    width: 40,
    textTransform: 'uppercase',
    marginBottom: 20,
    textAlign: 'center',
  },
  frenteCard: {
    borderWidth: 0.5,
    borderColor: 'black',
   /*  padding: 10, */
    marginTop: 10,
    flexDirection: 'column',
    overflow: 'hidden', 
    marginVertical: 20,
    width: 400,
    height: 250,
    color: 'white',
    borderRadius: 10,    
  },
  frenteCard2: {
  /*   padding: 10,
    marginTop: 10, */
    marginBottom:10,
    flexDirection: 'column',
    overflow: 'hidden', 
    marginVertical: 20,
    width: 380,
    height: 220,
    color: 'white',
    borderRadius: 10,    
  },
  frenteCardHome: {
    borderWidth: 0.5,
    borderColor: 'white',
   /*  padding: 10, */
    marginTop: 10,
    flexDirection: 'column',
    overflow: 'hidden', 
    marginVertical: 20,
    width: 390,
    height: 230,
    paddingHorizontal: 0,
    color: 'white',
    borderRadius: 10, 
       
  },
  frenteCardHome2: {
  /*   padding: 10,
    marginTop: 10, */
    marginTop:30,
    paddingHorizontal: 0,
    marginBottom:10,
    flexDirection: 'column',
   /*  overflow: 'hidden',  */
    marginVertical: 0,
    width: 380,
    height: 220,
    color: 'white',
    borderRadius: 10,    
    zIndex: 2,
  },
  dorsoCard: {
    flexDirection: 'column',
    marginVertical: 0,
    marginTop: 70,
    width: '100%',
    height: '40%',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',    
  },
  contenedorTituloAndes: {
    flexDirection: 'column',
    overflow: 'hidden', 
   alignItems: 'center',
    marginVertical: 0,
    width: 50,
    height: 40,
    color: 'white',
    borderRadius: 10,    
  },
  contenedorTituloAndesDorso: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginVertical: 0,
    marginRight:'5%',
    width: 50,
    height: 40,
    color: 'blue',
    borderRadius: 10,  
   
  },
  planTitle: {
    fontSize: 26,   
    color: 'white',
    padding: 10,
    bottom:'80%',
    marginRight:'5%',
    fontWeight: 'bold',
  },
  planTitleHome: {
    fontSize: 26,   
    color: 'white',
    padding: 10,
    bottom:'80%',
    marginRight:'5%',
    fontWeight: 'bold',
  },
  fuente: {
    top:'auto',
    bottom:'80%',
  },
  tituloAndes: {
    color:'white',
    fontSize:15,
    fontWeight: 'bold',
  }, 

  titanium: {
    backgroundColor: '#452a64',
   /*  backgroundImage: "url('/images/logogris.png'), linear-gradient(to top left, #272528, #452B65, #52457c)", */
  },
  black: {
    backgroundColor: '#000000',
  /*   backgroundImage: "url('/images/logogris.png'), repeating-linear-gradient(36deg, rgba(255,255,255, 0.1), rgba(255,255,255, 0.1) 1px, transparent 0px, transparent 2px)", */
  },
  platinum: {
    backgroundColor: '#dcd0d0',
   /*  backgroundImage: "url('/images/logogris.png'), linear-gradient(-72deg, #c7c7c7, #999999 72%, #9b9b9b 80%, #b4b4b4 84%, #555564)", */
  },
  gold: {
    backgroundColor: '#9f7928',
   /*  backgroundImage: "url('/images/logogris.png'), radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)", */
  },
  green: {
    backgroundColor: '#5ab95a',
   /*  backgroundImage: "url('/images/logogris.png'), #5ab95a", */
  },
  frenteSuperior: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
  h2: {
    textTransform: 'capitalize',
  },
  frenteImagen: {
    position: 'relative',
  },
 
  h5: {
    fontSize: 20,
    paddingVertical: 5,
  },
  span: {
    fontSize: 16,
    paddingVertical: 6,
  },
  frenteImagenImg: {
    width: 80,
  },
  frenteContenido: {
    display: 'flex',
    flexWrap: 'wrap',
    /* padding: '20px 5px', */
    flexDirection: 'column',
    alignItems: 'flex-end',
    textAlign: 'right',
    marginTop: 20,
  },
});

