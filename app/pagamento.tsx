import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity} from 'react-native';
import Dialog from "react-native-dialog"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics'
import { useComanda } from '@/app/context/comandaContext';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function Pagamento(){

      const router = useRouter()
      const {selectedItems, itensComanda, removerItens, carregaItens} = useComanda();

      return(
        <SafeAreaView>
            <View style={styles.viewPrincipal}>
                <View style={styles.viewValor}>
                    <Text style={styles.viewTotalAPagar}>Total a Pagar</Text>
                    <Text style={styles.viewValorTotal}>R$ 136,28</Text>
                </View>
                <View style={styles.viewBtnFormaPagamento}>
                    <TouchableOpacity style={styles.btnFormaPagamento}>
                        <Text>Teste</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </SafeAreaView>
      )
}

const styles = StyleSheet.create({

    viewPrincipal: {

    },

    viewValor:{
        alignItems:'center',
        marginTop:30
    },

    viewTotalAPagar:{
        color:'white',
        fontSize:22,
    },

    viewValorTotal:{
        color:'#06d691',
        fontSize:36,
        fontWeight:500
    },

    viewBtnFormaPagamento:{
        width:100,
        backgroundColor:'white'


    },

    btnFormaPagamento:{
        width:20,
        backgroundColor:'white'
    }

})