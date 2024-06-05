import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const UploadImage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileSent, setFileSent] = useState(false);
  const [fileNotSent, setFileNotSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        setSelectedImage(asset.uri);
      }
    });
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
