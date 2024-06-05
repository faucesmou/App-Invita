import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import axios from 'axios';
import { useAuthStore } from '../../store/auth/useAuthStore';

const UploadImage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileSent, setFileSent] = useState(false);
  const [fileNotSent, setFileNotSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { GuardarImagenes } = useAuthStore();

  const [base64Image, setBase64Image] = useState<string | null>(null);

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
        console.log('User cancelled image picker');
      } else if (result.errorCode) {
        console.error('ImagePicker Error: ', result.errorCode);
      } else if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setSelectedImage(asset.uri || null);
  
        // Convertir la imagen a Base64
        const base64String = await convertImageToBase64(asset.uri);
        console.log('Imagen convertida a Base64: el useState lo contiene---> base64String ');
        setBase64Image(base64String); // Guardar la imagen convertida en el estado
      // Guardar la imagen en el estado global
      const resultado = await GuardarImagenes(base64String);

      // Manejar el resultado de GuardarImagenes(recibe true o false)
      if (resultado) {
        console.log('Imagen guardada exitosamente en zustand');
        
      } else {
        console.log('un problemita para guardar la imagen en zustand');
      }
      
      }
    } catch (error) {
      console.error('ImagePicker Error: ', error);
    }
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
      <Text style={styles.title}>Cargar Imagen</Text>

      <Button title="Seleccionar Imagen" onPress={handleImagePicker} />

      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}

      {fileSent && <Text style={styles.successMessage}>Imagen enviada exitosamente!!</Text>}
      {fileNotSent && <Text style={styles.errorMessage}>Error al enviar la imagen: {errorMessage}</Text>}

      <Button title="Enviar Imagen" onPress={handleImageUpload} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
 /*    flex: 1, */
    padding: 10,
    marginTop:0,
    justifyContent: 'center',
    alignItems: 'center',
   /*  backgroundColor:'green', */
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Quicksand-Regular', //TODO: Descargar y adaptar tipo letra
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
