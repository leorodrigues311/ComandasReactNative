import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';



export function TopBarDetalheComanda(){
    return (
        <View style={styles.viewPrincipal}>

            <View style={styles.inputContainer}>
                <Ionicons style={styles.viewBtnSair} name="arrow-back-outline" size={30} color="white" />
                <Ionicons style={styles.btnImprimir} name="print-outline" size={30} color="white" />
                <Ionicons style={styles.btnFinalizarComanda} name="reader-outline" size={30} color="red" ></Ionicons>
             </View>
          
        </View>  
    );

}


const styles = StyleSheet.create({

  viewPrincipal: {
    height:60,
    bottom: 0,
    top: 0,
    right: 0,
    backgroundColor:'#151718',
    borderBottomColor:'#363636',
    borderBottomWidth: 0.2,
    flexDirection: 'row',
    zIndex:1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },

  viewBtnSair:{
    alignItems: 'center',
    left:10
  },

  inputContainer:{
    position: 'relative',
    flex: 1,
  },

  btnImprimir:{
    position: 'absolute',
    right: 60,
    top:'50%',
    transform: [{ translateY: -12.5 }]
  },

  btnFinalizarComanda:{
    position: 'absolute',
    right: 10,
    top:'50%',
    transform: [{ translateY: -12.5 }]
  }


});
