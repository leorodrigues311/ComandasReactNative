import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { TopBarProdutos } from '@/components/navigation/TopBarProdutos';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import ItemProdutoCardapio from '@/components/ItemProdutoCardapio';
import { useComanda } from '@/app/context/comandaContext';

const PAGE_SIZE = 30;

export default function Produto() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const { carregaProdutos, produtos, inputProcurar } = useComanda();

  useEffect(() => {
    const carregar = async () => {
      setLoading(true);
      await carregaProdutos();
      setLoading(false);
    };
    carregar();
  }, []);

  useEffect(() => {
    if (produtos.length > 0) {
      setPage(1); // resetar para a primeira página quando os produtos forem atualizados
    }
  }, [produtos]);

  const onRefresh = async () => {
    setRefreshing(true);
    await carregaProdutos();
    setRefreshing(false);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    const totalItems = nextPage * PAGE_SIZE;

    if (totalItems <= produtosFiltrados.length) {
      setPage(nextPage);
    }
  };

  const produtosFiltrados = useMemo(() => {
    let lista = [...produtos];

    if (inputProcurar.trim() !== '') {
      const texto = inputProcurar.toLowerCase();
      lista = lista.filter(produto =>
        produto.nome_produto?.toLowerCase().includes(texto)
      );
    }

    return lista.sort((a, b) =>
      parseInt(a.nome_produto || 'Produto sem nome') - parseInt(b.nome_produto || 'Produto sem nome')
    );
  }, [produtos, inputProcurar]);

  const renderItem = ({ item }: any) => (
    <Pressable>
      <ItemProdutoCardapio
        nomeItem={item?.nome_produto || 'Produto sem nome'}
        estoque={item?.estoque_produto || 0}
        valorTotal={item?.valor_venda || 0}
        imagem={item?.imagem || 'default_image.png'}
      />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopBarProdutos />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <FlatList
          data={produtosFiltrados.slice(0, page * PAGE_SIZE)}
          keyExtractor={(item, index) => `${item.codigo_produto}_${index}`}
          renderItem={renderItem}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.2}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {inputProcurar.trim() !== ''
                  ? 'Nenhum produto encontrado.'
                  : 'Nenhum item para exibir.'}
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
