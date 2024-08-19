import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';

const MyComponent = () => {
  const [showNotification, setShowNotification] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showNotification) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        setShowNotification(false);
      }, 2000); // Ocultar después de 2 segundos
    }
  }, [showNotification]);

  const handleCopy = () => {
    // ... código para copiar al portapapeles
    setShowNotification(true);
  };

  return (
    <View>
      {/* ... */}
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          backgroundColor: 'lightgray',
          padding: 10,
          borderRadius: 5,
          opacity: fadeAnim,
        }}
      >
        <Text>Guardado en portapapeles</Text>
      </Animated.View>
    </View>
  );
};