import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable, ScrollView, Image } from 'react-native'
import { TopBarProdutos } from '@/components/navigation/TopBarProdutos'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ItemProdutoCardapio from '@/components/ItemProdutoCardapio'
import { useComanda } from '@/app/context/comandaContext';


export default function Produto(){

  const router = useRouter();
  const { carregaProdutos, produtos } = useComanda();

  useEffect(() => {
    carregaProdutos();
  }, [])

  return (
    <SafeAreaView>
      <TopBarProdutos/>
      <ScrollView style= {styles.scrollview}>
        {produtos.map((produto, index) => (
          <Pressable
            key={index}
          >
            <ItemProdutoCardapio
              nomeItem={produto.nome_produto}
              estoque={produto.estoque_produto}
              valorTotal={produto.valor_venda}
              imagem={produto.imagem}
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
  scrollview: {
    marginBottom:60
  }
});

