import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';



export function TopBar(){
    const [inputValue, setInputValue] = useState('');
    return (
        <View style={styles.viewPrincipal}>


            <View style={styles.viewOperador}>
                <Ionicons name="person-circle-outline" size={40} color="white" />
                <Text style={styles.nomeOperador}>Leonardo</Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                style={styles.inputPesquisar}
                placeholder="Procurar..."
                placeholderTextColor="gray"
                value={inputValue}
                onChangeText={setInputValue}
                />
                <Ionicons style={styles.btnPesquisar} name="search-outline" size={20} color="white" />
                <Ionicons style={styles.btnFiltro} name="filter-outline" size={20} color="white" ></Ionicons>
          </View>
          


        </View>  
    );

}


const styles = StyleSheet.create({

  viewPrincipal: {
    height:80,
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

  viewOperador:{
    alignItems: 'center',
  },

  nomeOperador:{
    alignItems: 'center',
    color:'white',
    fontSize:15,
    fontWeight:'600'

  },

  inputPesquisar:{
    height: 45,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    color: 'white',
    paddingRight: 40, // Espaço para o ícone
    marginLeft:10
  },

  inputContainer:{
    position: 'relative',
    flex: 1,
  },

  btnPesquisar:{
    position: 'absolute',
    right: 60,
    top: '50%',
    transform: [{ translateY: -12.5 }]
  }, 

  btnFiltro:{
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12.5 }]
  }


});
