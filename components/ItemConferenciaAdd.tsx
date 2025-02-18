import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Dimensions, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

export function ItemConferenciaAdd (){

    const excluirItem = () => {
        Haptics.NotificationFeedbackType.Warning
    }


    return (
        <View style = {styles.viewPrincipal}>
            <TouchableOpacity onPress={excluirItem}>
                <Ionicons name="close-circle-outline" color={'red'} size={30}></Ionicons>
            </TouchableOpacity>
            <Text style={styles.textoItem}>1 - Coca cola 2 Litros</Text>
        </View>

    );

}

const styles = StyleSheet.create({

    viewPrincipal:{

        flexDirection:'row'
    },


    textoItem:{

        color:'white',
        fontSize:18,
        marginBottom:23,
        marginLeft:5,
        marginTop:3

    }

})