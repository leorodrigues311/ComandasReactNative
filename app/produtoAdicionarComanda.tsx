import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Pressable, ScrollView, TouchableOpacity, Text } from 'react-native';
import { ItemProduto } from '@/components/ItemProduto';
import { BottomBarConferirItens } from '@/components/navigation/BottomBarConferirItens';
import { TopBarAdicionarProduto } from '@/components/navigation/TopBarAdicionarProduto';
import Dialog from "react-native-dialog";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function produtoAdicionarComanda() {
  // Recupera o numeroComanda dos parâmetros da rota
  const { numeroComanda } = useLocalSearchParams<{ numeroComanda: string }>();
  const router = useRouter();

  const produtos = [
    { nomeItem: 'Pão', estoque: 3, valorTotal: 10.50, imagem: 'https://emporiokaminski.com.br/wp-content/uploads/2024/06/Pao-Frances-50g-2.jpg'},
    { nomeItem: 'Caldo de galinha', estoque: 1, valorTotal: 10.50, imagem: 'https://www.joicetur.com.br/arquivos/media/receitas/caldodepiranha-copy-1.jpg'},
  ];

  const [selectedItem, setSelectedItem] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [items, setItems] = useState<{ id: number; itemNome: string; itemQtd: number }[]>([]);
  const [itemQtd, setItemQtd] = useState<string>(''); // inicia como string vazia
  const [dialogQuantidadeProduto, setDialogQuantidadeProdutoVisible] = useState(false);

  const limparSelecao = () => {
    setSelectedItems([]);
  };

  const handleCancel = () => {
    setDialogQuantidadeProdutoVisible(false);
  };

  const adicionarItemAoCarrinho = (nomeItem: string, quantidade: number) => {
    setItems((prevItems) => [
      ...prevItems,
      { id: prevItems.length + 1, itemNome: nomeItem, itemQtd: quantidade },
    ]);
  };

  // Função para remover itens da lista
  const removeItem = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleItemSelect = (itemName: string, buttonType?: string) => {
    if (buttonType === "adicionarItemComanda") {
      setSelectedItem(itemName);
      setItemQtd(''); // inicia o input vazio
      setDialogQuantidadeProdutoVisible(true);
    } else if (buttonType === "confirmarItemQuantidade") {
      adicionarItemAoCarrinho(selectedItem, Number(itemQtd));
      setDialogQuantidadeProdutoVisible(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  /*
  // Função que navega para a tela de detalhes da comanda, passando o numero e os itens adicionados
  const adicionaItensComanda = () => {
    setDialogNovoProdutoVisible(false);
    showSuccessMessage();
    setTimeout(() => {
      // Converte os itens para string JSON e codifica para URL
      const itensString = encodeURIComponent(JSON.stringify(items));
      // Navega para a tela de ComandaDetalhe passando o numeroComanda e os novos itens
      router.push(`/comandaDetalhe?numeroComanda=${numeroComanda}&novosItens=${itensString}`);
    }, 2500);
  };

  */
  // Funções e estado relacionados ao diálogo de confirmação na BottomBarConferirItens
  const [dialogNovoProdutoVisible, setDialogNovoProdutoVisible] = useState(false);
  const showSuccessMessage = () => {
    // Aqui você pode implementar o Toast ou outra notificação de sucesso
    console.log('Itens adicionados com sucesso!');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopBarAdicionarProduto />

      <Dialog.Container visible={dialogQuantidadeProduto}>
        <Dialog.Title>Adicionar "{selectedItem}"</Dialog.Title>
        <TextInput
          style={styles.textInput}
          placeholder="Quantidade:"
          value={itemQtd}
          onChangeText={setItemQtd}
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
  viewPrincipal: {
    marginBottom: 65,
  },
  textInput: {
    borderWidth: 0.3,
    borderColor: '#4F4F4F',
    color: 'white',
    fontSize: 30,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignSelf: 'center',
    height: 45,
    width: '80%',
  },
  btnIncluir: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#02bf02',
    borderRadius: 8,
    margin: 10,
  },
  textoBtnIncluir: {
    color: 'white',
    fontSize: 28,
  },
});
