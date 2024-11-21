import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View,  Modal, TextInput, Button} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { useLocalSearchParams  } from 'expo-router';


export default function novaComanda (){


    return (
        <SafeAreaView style={styles.viewPrincipal} >
    
        </SafeAreaView>  
    );

}


const styles = StyleSheet.create({

  viewPrincipal: {
    margin: 12,
    marginTop:0,
    marginBottom:16,
    backgroundColor:'#1C1C1C',
    flexDirection: 'column',
    flex:1,
    borderRadius:5
  },

});