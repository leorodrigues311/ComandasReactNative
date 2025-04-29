import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useComanda } from '@/app/context/comandaContext';


export function TopBarProdutos(){

    const { inputProcurar, setInputProcurar } = useComanda();
    return (
        <View style={styles.viewPrincipal}>
            <View style={styles.inputContainer}>
              <View style={styles.containerPesquisar}>
                <TextInput
                style={styles.inputPesquisar}
                placeholder="Procurar..."
                placeholderTextColor="gray"
                value={inputProcurar}
                onChangeText={setInputProcurar}
                />
                <Pressable style={styles.viewBtnPesquisar}>
                 <Ionicons style={styles.btnPesquisar} name="search-outline" size={20} color="white" />
                </Pressable>
              </View>
              <Pressable style={styles.viewBtnFiltro}>
                <Ionicons style={styles.btnFiltro} name="filter-outline" size={20} color="white" ></Ionicons>
              </Pressable>
          </View>
        </View>  
    );

}


const styles = StyleSheet.create({

  viewPrincipal: {
    height: '12%',
    position:'fixed',
    backgroundColor: "#151718",
    borderBottomColor: "#363636",
    borderBottomWidth: 0.2,
    flexDirection: "row",
    zIndex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },

  viewOperador:{
    alignItems: 'center',
  },

  nomeOperador:{
    alignItems: 'center',
    color:'white',
    fontSize:13,
    fontWeight:'600'

  },

  containerPesquisar:{
    position:'relative',
    width:'85%'
  },

  inputPesquisar:{
    height: 45,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    color: "white",
    paddingRight: 40,
    marginLeft: 10,
  },

  inputContainer:{
    flex:1,
    flexDirection:'row',
    width:'100%',
  },
  viewBtnPesquisar:{
    position: "absolute",
    height:'100%',
    flex:1,
    justifyContent:'center',
    right:0,

  },

  viewBtnFiltro:{
    position: "absolute",
    height:'90%',
    flex:1,
    justifyContent:'center',
    right:0,
  },

  btnPesquisar:{
   // transform: [{ translateY: -12.5 }]
  }, 

  btnFiltro:{
    //transform: [{ translateY: -12.5 }]
  }


});
