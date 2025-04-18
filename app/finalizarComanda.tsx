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
    const { itensComanda, comandaSelecionada, carregaItens, formataValor } = useComanda()

       useEffect(() => {
        carregaItens();
       }, []);

  return (
    <SafeAreaView>
        <View style={styles.viewPrincipal}>
            
            <View style={styles.viewInfoComanda}>
            <View style={[
                styles.viewStatus, 
                { backgroundColor: comandaSelecionada?.status_comanda === '1' ? '#06d691' : (comandaSelecionada?.status_comanda === '2' ?'#e11d48' :'#383737') },
                { borderColor: comandaSelecionada?.status_comanda === '1' ? '#06d691' : (comandaSelecionada?.status_comanda === '2' ?'#e11d48' :'#383737') }
                ]}
            />
            <View style={styles.viewNumero}>
                <Text style={styles.viewNumeroTexto}  
                numberOfLines={1}
                adjustsFontSizeToFit>{comandaSelecionada?.numero_comanda || ''}</Text>
            </View>
            <View style={styles.viewInfo}>
                <Text style={styles.viewInfoNome}numberOfLines={1}>{comandaSelecionada?.nome_comanda || ''}</Text>
                <Text style={styles.viewInfoHora}>Abertura: {comandaSelecionada?.hora_abertura || ''}</Text>
                <Text style={styles.viewInfoHora}>Aberta por: {comandaSelecionada?.usuario_responsavel}</Text>
            </View>
            </View>

        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    viewPrincipal: {
      margin: 12,
      marginTop: 0,
      marginBottom: 16,
      backgroundColor: 'black',
      flexDirection: 'column',
      flex: 1,
      borderRadius: 5
    },
    viewInfoComanda: {
      flexDirection: 'row',
      backgroundColor: '#1C1C1C',
      borderRadius: 5,
      height: 99,
      marginBottom: 25
    },
    viewStatus: {
      height: 99,
      width: 5,
      borderWidth: 0.2,
      borderRadius: 5,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      marginLeft: 0,
    },
    viewNumero: {
      height:99,
      width:99,
      alignItems: 'center',
      display:'flex',
      justifyContent:'center',
      backgroundColor:'#383737',
      borderTopRightRadius:5,
      borderBottomRightRadius:5,
    },
    viewNumeroTexto: {
      alignItems: 'center',
      textAlign:'center',
      fontWeight:'500',
      gap: 6,
      color:'#adacac',
      margin:10,
      fontSize:50,
    },
    viewInfo: {
      alignItems: 'flex-start',
      margin: 3,
      flex:1
    },
    viewInfoNome: {
      marginLeft: 10,
      marginTop: 5,
      color: 'white',
      fontSize: 25,
      maxHeight:30,
      flex:1
    },
    viewInfoHora: {
      marginLeft: 10,
      marginTop: 10,
      color: 'white',
      fontSize: 12
    },
    itensComanda: {
      flex: 1,
      marginBottom: 50
    },
    selectedItem: {
      marginBottom:10,
      margin: 5,
      backgroundColor: '#696969',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      height: 60,
      flexDirection: 'column',
      borderRadius: 5,
      borderColor:'#A9A9A9',
      borderWidth: 0.6
    },
    btnAdicionarItem: {
      backgroundColor: '#02bf02',
      padding: 15,
      alignItems: 'center',
      margin: 10,
      borderRadius: 5,
    },
    textoAdicionarItem: {
      color: 'white',
      fontSize: 18,
    },
  
    viewValorTotal:{
      backgroundColor:'#363636',
      width:'100%',
      height:60,
      bottom:0,
      borderRadius:5,
      flexDirection:'row',
      justifyContent:'space-between',
      position:'absolute',
      marginBottom:10,
    },
    textValorTotal:{
      color:'white',
      fontSize:26,
      marginTop:15,
      marginLeft:15,
      fontWeight:'bold'
    },
  
    textValorTotalNumero:{
      color:'#04c78a',
      fontSize:26,
      marginTop:15,
      marginRight:15,
      fontWeight:'bold'
  
    }
  })
  