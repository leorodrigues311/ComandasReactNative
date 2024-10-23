import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';



export function ButtonFlutuante(){
    return (
        <View style={styles.viewPrincipal}>

            <Pressable>
                <Ionicons style={styles.btnNovaComanda} name="add-outline" size={40} color="black" />
            </Pressable>

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
