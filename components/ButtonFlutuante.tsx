import React, { useState } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import Dialog from "react-native-dialog"
import { useRouter } from "expo-router"
import * as Haptics from 'expo-haptics'

export function ButtonFlutuante() {
  const router = useRouter()
  const [visible, setVisible] = useState(false)
  const [viewColor, setViewColor] = useState('white')

  const handleFeedbackButton = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setViewColor('gray')
  }

  const showDialog = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
    setViewColor('white')
    setVisible(true)
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleConfirm = () => {
    setVisible(false)
    router.push('/novaComanda')
  };

  return (
    <View style={[styles.viewPrincipal, { backgroundColor: viewColor }]}>
      <Pressable onPressIn={handleFeedbackButton} onPressOut={showDialog}> 
        <Ionicons
          style={styles.btnNovaComanda}
          name="add-outline"
          size={40}
        />
      </Pressable>

      <Dialog.Container visible={visible}>
        <Dialog.Title>Nova Comanda</Dialog.Title>
        <Dialog.Description>
          Deseja realmente abrir uma nova comanda?
        </Dialog.Description>
        <Dialog.Button onPress={handleCancel} label="Não" />
        <Dialog.Button onPress={handleConfirm} label="Sim" />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPrincipal: {
    height: 70,
    width: 70,
    bottom: 30,
    right: 30,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 1,
  },
  btnNovaComanda: {
    fontSize: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
