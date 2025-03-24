import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Pressable, ScrollView, TouchableOpacity, Text } from 'react-native';
import { ItemProduto } from '@/components/ItemProduto';
import { BottomBarConferirItens } from '@/components/navigation/BottomBarConferirItens';
import { TopBarAdicionarProduto } from '@/components/navigation/TopBarAdicionarProduto';
import Dialog from "react-native-dialog";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ComandaProvider, useComanda } from '@/app/context/comandaContext'

export default function produtoAdicionarComanda() {

  const router = useRouter();
  const { comandas, itemSelecionado, itensCarrinho, produtos, carregaProdutos, adicionarItensCarrinho, removerItemCarrinho, setItemSelecionado } = useComanda()

  useEffect(() => {
    carregaProdutos();
  }, []);
  
  const [itemQtd, setItemQtd] = useState<string>('')
  const [dialogQuantidadeProduto, setDialogQuantidadeProdutoVisible] = useState(false)

  const handleCancel = () => {
    setDialogQuantidadeProdutoVisible(false)
  }

  const handleItemSelect = (itemId: number[], item_nome: string, buttonType?: string) => {
    if (buttonType === "adicionarAoCarrinho") {
      setItemSelecionado(itemId)
      setItemQtd(''); // inicia o input vazio
      setDialogQuantidadeProdutoVisible(true)
    } else if (buttonType === "confirmarCarrinho") {
      adicionarItensCarrinho({
        item_nome: item_nome,
        item_codigo: itensSelecionados[0],
        quantidade: Number(itemQtd)
      });
      setDialogQuantidadeProdutoVisible(false)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }
  }

  // Funções e estado relacionados ao diálogo de confirmação na BottomBarConferirItens
  const [dialogNovoProdutoVisible, setDialogNovoProdutoVisible] = useState(false)
  const showSuccessMessage = () => {
    // Aqui você pode implementar o Toast ou outra notificação de sucesso
    console.log('Itens adicionados com sucesso!')
  };

  return (
    <ComandaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <TopBarAdicionarProduto />

        <Dialog.Container visible={dialogQuantidadeProduto}>
          <Dialog.Title>Adicionar "{itensSelecionados[0]}"</Dialog.Title>
          <TextInput
            style={styles.textInput}
            placeholder="Quantidade:"
            value={itemQtd}
            onChangeText={setItemQtd}
            keyboardType="numeric"
          />
          <Dialog.Button onPress={handleCancel} label="Cancelar" />
          <Dialog.Button onPress={() => handleItemSelect(itensSelecionados, 'confirmarCarrinho')} label="Adicionar" />
        </Dialog.Container>

        <View>
          <ScrollView style={styles.viewPrincipal}>
            {produtos.map((produto, index) => (
              <Pressable
                key={index}
                onPress={() => handleItemSelect([produto.codigo_produto], produto.nome_produto, 'adicionarAoCarrinho')}
              >
                <ItemProduto
                  nomeItem={produto.nome_produto}
                  estoque={produto.estoque_produto}
                  valorTotal={produto.valor_venda}
                  imagem={produto.imagem}
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <BottomBarConferirItens />
      </SafeAreaView>
    </ComandaProvider>
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
