import React, { useState } from 'react'
import { StyleSheet, TextInput, View, Pressable, ScrollView, Image } from 'react-native'
import { ItemProduto } from '@/components/ItemProduto'
import { TopBarAdicionarProduto } from '@/components/navigation/TopBarAdicionarProduto'
import Dialog from "react-native-dialog"
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import * as Haptics from 'expo-haptics'


export default function produtoAdicionarComanda() {
  const router = useRouter()

  // Este array guarda os produtos existentes no cadastro de produtos
  const produtos = [
    { nomeItem: 'Pão que o Thiago Amassou', estoque: 3, valorTotal: 10.50},
    { nomeItem: 'Caldo de piranha', estoque: 1, valorTotal: 10.50},
    { nomeItem: 'Ruffles do Outback', estoque: 4, valorTotal: 10.50},
    { nomeItem: 'Prime Ribs costela do luis', estoque: 21, valorTotal: 10.50},
    { nomeItem: 'Sopa de hospital', estoque: 43, valorTotal: 10.50},
    { nomeItem: 'Caldo knorr com agua', estoque: 32, valorTotal: 10.50},
    { nomeItem: 'Sambiquira', estoque: 1, valorTotal: 10.50},
    { nomeItem: 'Pipoca', estoque: 0, valorTotal: 10.50},
    { nomeItem: 'Guizado', estoque: 0, valorTotal: 10.50},
    { nomeItem: 'Tilapia assada', estoque: 0, valorTotal: 10.50},
    { nomeItem: 'Macaxeira', estoque: 0, valorTotal: 10.50},
    { nomeItem: 'Salada de frutas', estoque: 0, valorTotal: 10.50},
    { nomeItem: 'Farofa', estoque: 0, valorTotal: 10.50},
    { nomeItem: 'Coca cola', estoque: 0, valorTotal: 10.50},
    { nomeItem: 'Chopp pilsen', estoque: 0, valorTotal: 10.50},
    { nomeItem: 'Jaggermeister', estoque: 0, valorTotal: 10.50},
    { nomeItem: 'Milho verde', estoque: 0, valorTotal: 10.50},
    { nomeItem: 'Mexerica', estoque: 0, valorTotal: 10.50},
    { nomeItem: 'Javali', estoque: 0, valorTotal: 10.50},

  ]

  // Aqui nós guardamos o nome do item que foi selecionado
  const [selectedItem, setSelectedItem] = useState<string>('')


  // Estado para armazenar o texto do campo de entrada
  const [inputText, setInputText] = useState<string>('')

  // Este array guarda os produtos existentes no cadastro de produtos
  const [dialogQuantidadeProduto, setdialogQuantidadeProdutoVisible] = useState(false)

  // Este cancela a ação do dialogo
  const handleCancel = () => {
    setdialogQuantidadeProdutoVisible(false)
  }

  // Função para exibir o nome do item no dialogo
  const handleItemSelect = (itemName: string, buttonType?: string) => {

    if (buttonType === 'adicionarItemComanda') {

      setSelectedItem(itemName)
      setInputText('') // Limpar o campo de texto quando um novo item for selecionado
      setdialogQuantidadeProdutoVisible(true)
      
    }

    else if (buttonType === 'confirmarItemQuantidade'){

      setdialogQuantidadeProdutoVisible(false)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    

  }

  return (
    <SafeAreaView>
      <TopBarAdicionarProduto />

{/* Este é dialogo para escolher a quantidade */}
      <Dialog.Container visible={dialogQuantidadeProduto}>
        <Dialog.Title>Adicionar "{selectedItem}"</Dialog.Title>

        {/* Campo de texto para input do usuário */}
        <TextInput
          style={styles.textInput}
          placeholder="Quantidade:"
          value={inputText}
          onChangeText={setInputText}
          keyboardType='numeric'
        />
        <Dialog.Button onPress={handleCancel} label="Cancelar" />
        <Dialog.Button onPress={() => handleItemSelect(selectedItem, 'confirmarItemQuantidade')} label="Adicionar" />
      </Dialog.Container>

      <ScrollView style={styles.viewPrincipal}>
        {produtos.map((produto, index) => (
          <Pressable
            key={index}
            onPress={() => handleItemSelect(produto.nomeItem, 'adicionarItemComanda')}
          >
            <ItemProduto
              nomeItem={produto.nomeItem}
              estoque={produto.estoque}
              valorTotal={produto.valorTotal}
            />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewPrincipal:{
    marginBottom: 65
  },

  textInput: {
    borderWidth: 0.3,
    borderColor: '#4F4F4F',
    color:'white',
    fontSize:30,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignSelf:'center',
    height:45,
    width:'80%'
  },
})
