import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

export function ItemConferenciaAdd (){


    return (
        <View style = {styles.viewPrincipal}>
            <Ionicons name="close-circle-outline" color={'red'} size={24}></Ionicons>
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
        marginBottom:18,
        marginLeft:5

    }

})