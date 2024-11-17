import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Touchable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Router } from 'expo-router';


export function TopBarDetalheComanda(){


    return (
        <View style={styles.viewPrincipal}>
          <Ionicons style={styles.viewBtnSair} name="arrow-back-outline" size={32} color="white" />
          <View style={styles.viewOperacoesComanda}>
            <Ionicons style={styles.btnFinalizarComanda} name="receipt-outline" size={32} color="red" ></Ionicons>
            <Ionicons style={styles.btnImprimir} name="print-outline" size={32} color="white" />
            <Ionicons style={styles.btnAdicionarItens} name="add-circle-outline" size={32} color="#00FF00" ></Ionicons>
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
    marginBottom:10
  },

  viewBtnSair:{
    left:10,
    flexDirection: 'row',

  },

  viewOperacoesComanda:{
    top:'50%',
    width:'50%',
    height:40,
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:20
  },

  
  btnFinalizarComanda:{

  },

  btnImprimir:{

  },

  btnAdicionarItens:{

  }


});
