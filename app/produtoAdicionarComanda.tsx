import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable, ScrollView, Image } from 'react-native'
import { ItemProduto } from '@/components/ItemProduto'
import { TopBarAdicionarProduto } from '@/components/navigation/TopBarAdicionarProduto'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'


export default function produtoAdicionarComanda(){


  // Este array guarda os produtos existentes no cadastro de produtos
  const produtos = [
    { nomeItem: 'Pão que o Thiago Amassou', estoque: 3, valorTotal: 10.50},
    { nomeItem: 'Caldo de piranha', estoque: 1, valorTotal: 10.50},
    { nomeItem: 'Pão que o Thiago Amassou', estoque: 3, valorTotal: 10.50},
    { nomeItem: 'Pão que o Thiago Amassou', estoque: 3, valorTotal: 10.50},
    { nomeItem: 'Pão que o Thiago Amassou', estoque: 3, valorTotal: 10.50},
    { nomeItem: 'Pão que o Thiago Amassou', estoque: 3, valorTotal: 10.50},
    { nomeItem: 'Pão que o Thiago Amassou', estoque: 3, valorTotal: 10.50},
    { nomeItem: 'Pão que o Thiago Amassou', estoque: 3, valorTotal: 10.50},

];



const router = useRouter();


  return (
    <SafeAreaView>
      <TopBarAdicionarProduto/>
      <ScrollView>

       
        {produtos.map((produtos, index) => (
                  <Pressable
                      key={index}
                      onPress={() => router.push({
                          pathname: '/comandaDetalhe',
                          params: produtos,
                      })}
                  >
                      <ItemProduto
                          nomeItem={produtos.nomeItem}
                          estoque={produtos.estoque}
                          valorTotal={produtos.valorTotal}

                      />
                  </Pressable>
              ))}
            

      </ScrollView>
    </SafeAreaView>
  );

}


const styles = StyleSheet.create({

  viewPrincipal: {
    height:100,
    borderWidth: 0.5,
    borderRadius:5,
    borderColor: '#4F4F4F',
    margin: 12,
    marginBottom:1,
    backgroundColor:'#1C1C1C',
    flexDirection: 'row'
  },

  viewStatus: {
    height:99,
    width:0,
    backgroundColor:'red',
    opacity:0.1,
    borderWidth: 0.2,
    borderRadius:5,
    borderTopRightRadius:5,
    borderBottomRightRadius:5,
    borderColor: '#696969',
    marginLeft: 0,
  },

  viewNumero: {
    height:99,
    width:99,
    alignItems: 'center',
    backgroundColor:'#696969',
    borderRadius:5,
    borderTopRightRadius:5,
    borderBottomRightRadius:5,
  },

  viewNumeroTexto: {
    alignItems: 'center',
    margin:20,
    gap: 6,
    color:'white',
    fontSize:50
  },

  viewInfo: {
    alignItems: 'flex-start',
    margin:3,
  },

  viewInfoNome: {
    alignItems: 'center',
    marginLeft:10,
    marginTop:5,
    color:'white',
    fontSize:20
  },

  viewInfoValorTotal: {
    marginLeft:10,
    marginTop:8,
    color:'#00FF00',
    fontSize:23
  },

  viewInfoHora: {
    marginLeft:10,
    marginTop:10,
    color:'white',
    fontSize:12
  },

  quantidadeItem: {
    fontSize: 13,
    color: '#C0C0C0',
    left: 10,
    margin: 0,
    marginTop: 7,
    fontWeight: '300',
  },

  viewNomeItem: {
    width: '66%',
    height: 30,
  },

  nomeItem: {
    width: '100%',
    fontSize: 18,
    color: 'white',
    left: 0,
    marginLeft: 10,
    margin: 5,
  },

  viewValorUnitItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },

  valorUnitItem: {
    fontSize: 13,
    fontWeight: '300',
    color: '#C0C0C0',
    left: '30%',
    margin: 5,
    marginTop: 0,
    position: 'absolute',
  },

  valorTotalItem: {
    fontSize: 16,
    color: '#00CC00',
    fontWeight: '800',
    right: '2%',
    top: '30%',
    margin: 5,
    position: 'absolute',
  },

  imagemNumero: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover',
    borderRadius:5,
},

});

