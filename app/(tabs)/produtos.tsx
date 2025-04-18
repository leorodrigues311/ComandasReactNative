import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable, FlatList, RefreshControl } from 'react-native'
import { TopBarProdutos } from '@/components/navigation/TopBarProdutos'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ItemProdutoCardapio from '@/components/ItemProdutoCardapio'
import { useComanda } from '@/app/context/comandaContext';

export default function Produto() {

  const PAGE_SIZE = 30;
  const router = useRouter();
  const { carregaProdutos, produtos } = useComanda();
  const [produtosVisiveis, setProdutosVisiveis] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    carregaProdutos()
  }, [])

  useEffect(() => {
    console.log('produtos:', produtos)
    if (produtos.length > 0) {
      setProdutosVisiveis(produtos.slice(0, PAGE_SIZE));
      setPage(1);
    }
  }, [produtos]);

  const onRefresh = () => {
    setRefreshing(true)
    carregaProdutos()
    setRefreshing(false)
  }

  const loadMore = () => {
    const nextPage = page + 1;
    const start = (nextPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const nextData = produtos.slice(start, end);

    if (nextData.length > 0) {
      setProdutosVisiveis([...produtosVisiveis, ...nextData]);
      setPage(nextPage);
    }
  };

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
      <FlatList
        data={produtosVisiveis.sort((a, b) => parseInt(a.codigo_produto || "0") - parseInt(b.codigo_produto || "0"))}
        keyExtractor={(item, index) => `${item.codigo_produto}_${index}`}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum item para exibir</Text>
          </View>
        }
      />
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
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
});
