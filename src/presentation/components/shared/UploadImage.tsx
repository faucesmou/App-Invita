import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import axios from 'axios';
import { useAuthStore } from '../../store/auth/useAuthStore';

const UploadImage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [SelectedFileName, setSelectedFileName] = useState<string | null>(null);
  /* Estados para manejar un posible envio (no se esta usando por ahora) */
  const [fileSent, setFileSent] = useState(false);
  const [fileNotSent, setFileNotSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { GuardarImagenes } = useAuthStore();

  const [base64Image, setBase64Image] = useState<string | null>(null);
  /* Primera prueba cargando varias imagenes:  */
  const [imagenes, setImagenes] = useState<(string | null)[]>([null, null, null, null, null]);
  const [fileNames, setFileNames] = useState<(string | null)[]>([null, null, null, null, null]);

  const convertImageToBase64 = async (imageUri: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Leer la imagen y convertirla a Base64
      RNFS.readFile(imageUri, 'base64')
        .then((base64String: string) => {
          resolve(base64String);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  const handleImagePicker = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
      });

      if (result.didCancel) {
        console.log('El usuario canceló image picker');
      } else if (result.errorCode) {
        console.error('ImagePicker Error: ', result.errorCode);
      } else if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const base64String = await convertImageToBase64(asset.uri);

        const emptyIndex = imagenes.findIndex(image => image === null);
        if (emptyIndex !== -1) {
          const newImages = [...imagenes];
          newImages[emptyIndex] = base64String;
          setImagenes(newImages);

          const newFileNames = [...fileNames];
          newFileNames[emptyIndex] = asset.fileName || null;
          setFileNames(prev => {
            const newFileNames = [...prev];
            newFileNames[emptyIndex] = asset.fileName || 'Desconocido';
            return newFileNames;
          });
          /*   setFileNames(newFileNames); */

          // Guardar la imagen en el estado global
          const resultado = await GuardarImagenes(newImages);
          if (resultado) {
            console.log('Imagen guardada exitosamente en zustand');
          } else {
            console.log('Un problema para guardar la imagen en zustand');
          }
        } else {
          console.log('No se pueden cargar más de 5 imágenes');
        }
      }
    } catch (error) {
      console.error('ImagePicker Error: ', error);
    }
    /* primera prueba de cargar 5 imagfenes: */
         /*  if (resultado) {
            console.log('Imagen guardada exitosamente en zustand');
            setFileSent(true);
            setFileNotSent(false);
          } else {
            console.log('Un problemita para guardar la imagen en zustand');
            setFileSent(false);
            setFileNotSent(true);
            setErrorMessage('Error al guardar la imagen en el estado global');
          }
        } else {
          console.log('Ya se han cargado 5 imágenes');
        }
      }
    } catch (error) {
      console.error('ImagePicker Error: ', error);
      setFileSent(false);
      setFileNotSent(true);
      setErrorMessage('Error al seleccionar la imagen');
    } */

          /* ----------antes del cambio a 5 imagenes */
          /*   setSelectedImage(asset.uri || null);
            setSelectedFileName(asset.fileName || null); */ // Aquí guardas el nombre del archivo
          // Convertir la imagen a Base64
          /*    const base64String = await convertImageToBase64(asset.uri); */
          /*    setBase64Image(base64String);  */// Guardar la imagen convertida en el estado
          // Guardar la imagen en el estado global
          /*    const resultado = await GuardarImagenes(base64String); */
          
          
          // Manejar el resultado de GuardarImagenes(recibe true o false)
        /*   if (resultado) {
            console.log('Imagen guardada exitosamente en zustand');
          } else {
            console.log('un problemita para guardar la imagen en zustand');
          }
          
        }
      } catch (error) {
        console.error('ImagePicker Error: ', error);
      } */
      /* ----------antes del cambio a 5 imagenes */
    };

    const handleImageUpload = async () => {
      try {
        if (!selectedImage) {
          Alert.alert('Error', 'Debes seleccionar una imagen.');
          return;
        }

        const formData = new FormData();
        formData.append('image', {
          uri: selectedImage,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });

        const response = await axios.post('https://your-backend-url.com/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.success) {
          setFileSent(true);
          setFileNotSent(false);
        } else {
          setFileSent(false);
          setFileNotSent(true);
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        setFileSent(false);
        setFileNotSent(true);
        setErrorMessage(error.message);
      }
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargar Imágenes de Estudios</Text>

        <Button title="Seleccionar Imagen" onPress={handleImagePicker} />
      {fileNames.map((fileName, index) => (
        fileName && (
          <View key={index}>
            <Text style={styles.title}>Imagen {index + 1}:</Text>
            <Text style={styles.subitle}>{fileName}</Text>
          </View>
        )
      ))}
{/*       {fileSent && <Text style={styles.successMessage}>Imagen enviada exitosamente!!</Text>}
      {fileNotSent && <Text style={styles.errorMessage}>Error al enviar la imagen: {errorMessage}</Text>} */}



     {/*    {images.map((image, index) => (
        image ? (
          <View key={index}>
            <Text style={styles.title}>Imagen {index + 1}:</Text>
            <Text style={styles.subitle}>{fileNames[index]}</Text>
          </View>
        ) : null
      ))}

      {images.some(image => image === null) && (
        <Button title="Seleccionar Imagen" onPress={handleImagePicker} />
      )} */}


    {/*     <Button title="Seleccionar Imagen" onPress={handleImagePicker} /> */}

      {/*   {selectedImage && (
          <>
            <Text style={styles.title}>Imagen1: </Text>
            <Text style={styles.subitle}>{SelectedFileName}</Text>
          </>

        )} */}

{/*         {fileSent && <Text style={styles.successMessage}>Imagen enviada exitosamente!!</Text>}
        {fileNotSent && <Text style={styles.errorMessage}>Error al enviar la imagen: {errorMessage}</Text>} */}

        {/*  <Button title="Enviar Imagen" onPress={handleImageUpload} /> */}

      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      /*    flex: 1, */
      padding: 10,
      marginTop: 0,
      justifyContent: 'center',
      alignItems: 'center',
      /*  backgroundColor:'green', */
    },
    title: {
      fontSize: 20,
      marginBottom: 10,
      fontFamily: 'Quicksand-Regular',
    },
    subitle: {
      fontSize: 15,
      marginBottom: 5,
      fontFamily: 'Quicksand-Regular',
    },
    image: {
      width: 200,
      height: 200,
      marginVertical: 20,
    },
    successMessage: {
      color: 'green',
      marginTop: 20,
    },
    errorMessage: {
      color: 'red',
      marginTop: 20,
    },
  });

  export default UploadImage;
