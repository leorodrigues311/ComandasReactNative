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

  const {produtos, comandaSelecionada, itensCarrinho, carregaProdutos, adicionarItensCarrinho, setComandaSelecionada,gerarData } = useComanda()

  useEffect(() => {
    console.log("produtos", produtos)
    carregaProdutos();
  }, [])
  
  const [itemQtd, setItemQtd] = useState<string>('')
  const [tituloItem, setTituloItem] = useState<string>('')
  const [codItem, setCodItem] = useState<number>(0)
  const [valorItem, setValorItem] = useState<number>(0)
  const [dialogQuantidadeProduto, setDialogQuantidadeProdutoVisible] = useState(false)

  const handleCancel = () => {
    setDialogQuantidadeProdutoVisible(false)
  }

  const handleItemSelect = (id_produto: number, produto_nome: string, produto_valor: number,  buttonType?: string) => {

    if (buttonType === "selecionarQuantidade") {
      setItemQtd('');
      setDialogQuantidadeProdutoVisible(true);
      setTituloItem(produto_nome);
      setCodItem(id_produto);
      setValorItem(produto_valor);

    } else if (buttonType === "AdicionarAoCarrinho") {
      adicionarItensCarrinho({
        item_id: String(id_produto||''),
        item_nome: tituloItem,
        item_codigo: codItem,
        quantidade: Number((itemQtd === '' ? 1 : itemQtd)),
        valor_unit: produto_valor,
        item_status: true,
        hora_inclusao: gerarData('completo')
      })
      setDialogQuantidadeProdutoVisible(false)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }
  }

  return (
      <SafeAreaView style={{ flex: 1 }}>
        <TopBarAdicionarProduto />

        <Dialog.Container visible={dialogQuantidadeProduto}>
        <Dialog.Title>Adicionar "{tituloItem}"</Dialog.Title>
          <TextInput
            style={styles.textInput}
            placeholder="Quantidade:"
            value={itemQtd}
            onChangeText={setItemQtd}
            keyboardType="numeric"
          />
          <Dialog.Button onPress={handleCancel} label="Cancelar" />
          <Dialog.Button onPress={() => handleItemSelect(codItem, tituloItem, valorItem, 'AdicionarAoCarrinho')}
            label="Adicionar" />
        </Dialog.Container>

        <View>
          <ScrollView style={styles.viewPrincipal}>
            {produtos.map((produto, index) => (
              <Pressable
                key={index}
                onPress={() => handleItemSelect(produto.codigo_produto, produto.nome_produto, produto.valor_venda, 'selecionarQuantidade')}
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
  );
}

const styles = StyleSheet.create({
  viewPrincipal: {
    marginBottom: 130,
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
