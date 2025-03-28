import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable, ScrollView, Animated, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { ItemComanda } from '@/components/ItemComanda'
import { TopBarDetalheComanda } from '@/components/navigation/TopBarDetalheComanda'
import { BottomBarDetalheComanda } from '@/components/navigation/BottomBarDetalheComanda'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import * as Haptics from 'expo-haptics'
import { ComandaProvider, useComanda } from '@/app/context/comandaContext'


export default function FinalizarComanda(){

    const router = useRouter()

  return (
    <View style={styles.viewPrincipal}>
        
      <Text style={styles.textoItem}numberOfLines={1}>{'Teste Pastel de Frango'}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  viewPrincipal: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 0,
    justifyContent: 'space-between',
    maxHeight:50,
    flex: 1,
  },
  textoItem: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
    marginTop:3,
    flex: 1,
  },
  itemQtd: {
    color: 'white',
    fontSize: 18,
    marginHorizontal: 5,
  },
  botoesContainer: {
    flexDirection: 'row',
    alignItems:'center'
  },
  botao: {
    marginHorizontal: 2,
  },
});
