import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Dialog from "react-native-dialog";



export function ButtonFlutuante(){

  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleConfirm = () => {
    setVisible(false);
  };

    return (

      
        <View style={styles.viewPrincipal}>

            <Pressable>
                <Ionicons onPress={showDialog} style={styles.btnNovaComanda} name="add-outline" size={40} color="black" />
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
    height:70,
    width:70,
    bottom: 30,
    right: 30,
    zIndex:1,
    alignItems: 'center',
    justifyContent:'center',
    position:'absolute',
    backgroundColor:'white',
    borderRadius:100,
    borderColor:'white',
    borderWidth:1
  },

  btnNovaComanda:{
    fontSize:40,
    alignItems: 'center',
    justifyContent:'center',


  }

 
});
