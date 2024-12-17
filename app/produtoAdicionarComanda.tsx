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
    { nomeItem: 'Pão que o Thiago Amassou', estoque: 3, valorTotal: 10.50, imagem: 'https://emporiokaminski.com.br/wp-content/uploads/2024/06/Pao-Frances-50g-2.jpg'},
    { nomeItem: 'Caldo de piranha', estoque: 1, valorTotal: 10.50, imagem: 'https://www.joicetur.com.br/arquivos/media/receitas/caldodepiranha-copy-1.jpg'},
    { nomeItem: 'Ruffles do Outback', estoque: 4, valorTotal: 10.50, imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlk7vfIddfl3rD4XDzz8vc_Nhc8skC20il4g&s'},
    { nomeItem: 'Prime Ribs costela do luis', estoque: 21, valorTotal: 10.50, imagem: 'https://media-cdn.tripadvisor.com/media/photo-p/19/ed/95/3f/outback-prime-rib-with.jpg'},
    { nomeItem: 'Sopa de hospital', estoque: 43, valorTotal: 10.50, imagem: 'https://static.itdg.com.br/images/640-440/d44a957b687ea4a22c86f66857da183f/sopa-de-legumes.jpg'},
    { nomeItem: 'Caldo knorr com agua', estoque: 32, valorTotal: 10.50, imagem: 'https://www.lactosenao.com/wp-content/uploads/2017/06/sopa-legumes-facil-deliciosa.png'},
    { nomeItem: 'Sambiquira', estoque: 1, valorTotal: 10.50, imagem: 'https://static.itdg.com.br/images/360-240/f966f498ad257feb884f035cb522eac6/shutterstock-2311324171-1-.jpg'},
    { nomeItem: 'Pipoca', estoque: 0, valorTotal: 10.50, imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0VAatVZEfxQsS9bVgYtWcMPztrgox973y6g&s'},
    { nomeItem: 'Guizado', estoque: 0, valorTotal: 10.50, imagem: 'https://receitatodahora.com.br/wp-content/uploads/2023/06/carne-de-panela-19-06-1024x683.jpg'},
    { nomeItem: 'Tilapia assada', estoque: 0, valorTotal: 10.50, imagem: 'https://cdn.casaeculinaria.com/wp-content/uploads/2023/04/01130723/Tilapia-assada.webp'},
    { nomeItem: 'Macaxeira', estoque: 0, valorTotal: 1070.50, imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhhzPjDfw0J9cOLcNSGp_R_gEDBhaujk0WoQ&s'},
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
              imagem = {produto.imagem}
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
