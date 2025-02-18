import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Pressable, ScrollView } from 'react-native';
import { ItemProduto } from '@/components/ItemProduto';
import { BottomBarConferirItens } from '@/components/navigation/BottomBarConferirItens';
import { TopBarAdicionarProduto } from '@/components/navigation/TopBarAdicionarProduto';
import Dialog from "react-native-dialog";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

export default function produtoAdicionarComanda() {
  const produtos = [
    { nomeItem: 'Pão que o Thiago Amassou', estoque: 3, valorTotal: 10.50, imagem: 'https://emporiokaminski.com.br/wp-content/uploads/2024/06/Pao-Frances-50g-2.jpg'},
    { nomeItem: 'Caldo de piranha', estoque: 1, valorTotal: 10.50, imagem: 'https://www.joicetur.com.br/arquivos/media/receitas/caldodepiranha-copy-1.jpg'},
  ];

  const [selectedItem, setSelectedItem] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [items, setItems] = useState<{ id: number; name: string }[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [dialogQuantidadeProduto, setDialogQuantidadeProdutoVisible] = useState(false);

  const limparSelecao = () => {
    setSelectedItems([]);
  };

  const handleCancel = () => {
    setDialogQuantidadeProdutoVisible(false);
  };

  const adicionarItemAoCarrinho = (nomeItem: string) => {
    setItems((prevItems) => [
      ...prevItems,
      { id: prevItems.length + 1, name: nomeItem },
    ]);
  };

    // Função para remover itens da lista
    const removeItem = (id: number) => {
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    };

  const handleItemSelect = (itemName: string, buttonType?: string) => {
    if (buttonType === "adicionarItemComanda") {
      setSelectedItem(itemName);
      setInputText('');
      setDialogQuantidadeProdutoVisible(true);
    } else if (buttonType === "confirmarItemQuantidade") {
      adicionarItemAoCarrinho(selectedItem);
      setDialogQuantidadeProdutoVisible(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopBarAdicionarProduto />

      <Dialog.Container visible={dialogQuantidadeProduto}>
        <Dialog.Title>Adicionar "{selectedItem}"</Dialog.Title>
        <TextInput
          style={styles.textInput}
          placeholder="Quantidade:"
          value={inputText}
          onChangeText={setInputText}
          keyboardType="numeric"
        />
        <Dialog.Button onPress={handleCancel} label="Cancelar" />
        <Dialog.Button onPress={() => handleItemSelect(selectedItem, 'confirmarItemQuantidade')} label="Adicionar" />
      </Dialog.Container>

      <View>
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
                imagem={produto.imagem}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <BottomBarConferirItens items={items} limparSelecao={limparSelecao} removeItem={removeItem} />
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
