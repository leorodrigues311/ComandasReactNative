import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


export function BottomBarDetalheComanda(){

    return (
        <View style={styles.viewPrincipal}>

        <Text style={styles.viewBtnSair}>1</Text>


        <View style={styles.viewOperacoesComanda}>
            <Ionicons style={styles.btnFinalizarComanda} name="trash-outline" size={32} color="red" ></Ionicons>
            <Ionicons style={styles.btnImprimir} name="print-outline" size={32} color="white" />
            <Ionicons style={styles.btnAdicionarItens} name="arrow-down-outline" size={32} color="white" ></Ionicons>
        </View>
    
        </View>  
    );

}


const styles = StyleSheet.create({

  viewPrincipal: {
    height:60,
    bottom: 0,
    width:'100%',
    backgroundColor:'#363636',
    borderBottomColor:'#363636',
    borderBottomWidth: 0.2,
    borderRadius:5,
    flexDirection: 'row',
    zIndex:1,
    justifyContent: 'space-between',
    alignItems: 'center',
    position:'absolute',
    padding: 15,
    marginBottom:10,
  },


  viewOperacoesComanda:{
    top:'50%',
    width:'50%',
    height:40,
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:20
  },

  viewBtnSair:{
    left:10,
    flexDirection: 'row',
    color:'white',
    fontSize:25

  },

  
  btnFinalizarComanda:{

  },

  btnImprimir:{

  },

  btnAdicionarItens:{

  }


});
