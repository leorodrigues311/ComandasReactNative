import { StyleSheet, Text, View, } from 'react-native';
import React, { useEffect } from "react";
import { ComandaProvider, useComanda } from '@/app/context/comandaContext'

interface ComandaProps {
  valorTotal: number;
}

export function ValorTotalComanda({valorTotal}: ComandaProps){

    const {comandaSelecionada} = useComanda();

        useEffect(() => {
          comandaSelecionada
        }, [])

        console.log(comandaSelecionada?.valor_total)
      

    return (

        <View style={styles.viewValorTotal}>
            <Text style={styles.textValorTotal}>Valor Total:</Text>
            <Text style={styles.textValorTotalNumero}>R$ {comandaSelecionada?.valor_total}</Text>

        </View>
 
    );

}


const styles = StyleSheet.create({


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
    color:'#00FF00',
    fontSize:26,
    marginTop:15,
    marginRight:15,
    fontWeight:'bold'

  }

});
