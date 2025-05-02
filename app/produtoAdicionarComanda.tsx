import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Pressable,
  FlatList,
  Text,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { ItemProduto } from '@/components/ItemProduto';
import { BottomBarConferirItens } from '@/components/navigation/BottomBarConferirItens';
import { TopBarAdicionarProduto } from '@/components/navigation/TopBarAdicionarProduto';
import Dialog from "react-native-dialog";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useComanda } from '@/app/context/comandaContext';

export default function produtoAdicionarComanda() {
  const router = useRouter();

  const {
    produtos,
    inputProcurar,
    setInputProcurar,
    carregaProdutos,
    adicionarItensCarrinho,
    gerarData
  } = useComanda();

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [btnAdicionar, setBtnAdicionar] = useState(true)

  useEffect(() => {
    const carregar = async () => {
      setLoading(true);
      await carregaProdutos();
      setLoading(false);
    };
    carregar();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await carregaProdutos();
    setRefreshing(false);
  };

  const [itemQtd, setItemQtd] = useState('');
  const [tituloItem, setTituloItem] = useState('');
  const [codItem, setCodItem] = useState(0);
  const [valorItem, setValorItem] = useState(0);
  const [dialogQuantidadeProduto, setDialogQuantidadeProdutoVisible] = useState(false);

  const handleCancel = () => {
    setDialogQuantidadeProdutoVisible(false);
  };

  const handleItemSelect = (id_produto: number, produto_nome: string, produto_valor: number, buttonType?: string) => {
    if (buttonType === "selecionarQuantidade") {
      setItemQtd('');
      setDialogQuantidadeProdutoVisible(true);
      setTituloItem(produto_nome);
      setCodItem(id_produto);
      setValorItem(produto_valor);
    } else if (buttonType === "AdicionarAoCarrinho") {
      adicionarItensCarrinho({
        item_id: String(id_produto || ''),
        item_nome: tituloItem,
        item_codigo: codItem,
        quantidade: Number(itemQtd === '' ? 1 : itemQtd),
        valor_unit: produto_valor,
        item_status: true,
        hora_inclusao: gerarData('completo')
      });
      setDialogQuantidadeProdutoVisible(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const produtosFiltrados = useMemo(() => {
    return produtos.filter(produto =>
      produto.nome_produto.toLowerCase().includes(inputProcurar.toLowerCase())
    );
  }, [produtos, inputProcurar]);

  const renderItem = ({ item }: any) => (
    <Pressable
      onPress={() =>{
        setBtnAdicionar(true)
        handleItemSelect(item.codigo_produto, item.nome_produto, item.valor_venda, 'selecionarQuantidade')
        }
      }
    >
      <ItemProduto
        nomeItem={item.nome_produto}
        estoque={item.estoque_produto}
        valorTotal={item.valor_venda}
        imagem={item.imagem}
      />
    </Pressable>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopBarAdicionarProduto />

      <Dialog.Container
        visible={dialogQuantidadeProduto}
        contentStyle={{ backgroundColor: '#1e1e1e' }}>
          
        <Dialog.Title>Adicionar "{tituloItem}"</Dialog.Title>
        <TextInput
          style={styles.textInput}
          placeholder="Quantidade:"
          placeholderTextColor="#888"
          value={itemQtd}
          onChangeText={setItemQtd}
          keyboardType="numeric"
        />
        <Dialog.Button onPress={handleCancel} label="Cancelar" />
        <Dialog.Button
        disabled={!btnAdicionar}
        onPress={() => {
          setBtnAdicionar(false)
          handleItemSelect(codItem, tituloItem, valorItem, 'AdicionarAoCarrinho');
        }}
        label="Adicionar"
      />
      </Dialog.Container>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <FlatList
          data={produtosFiltrados}
          keyExtractor={(item, index) => `${item.codigo_produto}_${index}`}
          renderItem={renderItem}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhum produto encontrado.</Text>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 130 }}
        />
      )}

      <BottomBarConferirItens />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 0.3,
    borderColor: '#4F4F4F',
    color: 'white',
    fontSize: 20,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignSelf: 'center',
    height: 45,
    width: '90%',
  },
  searchInput: {
    borderWidth: 0.5,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    margin: 10,
    fontSize: 16,
    color: 'white',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
