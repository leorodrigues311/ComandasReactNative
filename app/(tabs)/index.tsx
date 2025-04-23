import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, SafeAreaView, FlatList, View, RefreshControl } from 'react-native';
import { Comanda } from '@/components/Comanda';
import { TopBar } from '@/components/navigation/TopBar';
import { ButtonFlutuante } from '@/components/ButtonFlutuante';
import { useRouter } from "expo-router";
import { useComanda } from '@/app/context/comandaContext';
import dayjs from 'dayjs'

const PAGE_SIZE = 30;

export default function HomeScreen() {
  const { comandas, mensagemErro, carregaComandas, setComandaSelecionada } = useComanda();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [visibleComandas, setVisibleComandas] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    carregaComandas();
    mensagemErro
  }, [mensagemErro]);

  useEffect(() => {
    if (comandas.length > 0) {
      setVisibleComandas(comandas.slice(0, PAGE_SIZE));
      setPage(1);
    }
  }, [comandas]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await carregaComandas();
    setRefreshing(false);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    const start = (nextPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const nextData = comandas.slice(start, end);

    if (nextData.length > 0) {
      setVisibleComandas([...visibleComandas, ...nextData]);
      setPage(nextPage);
    }
  };

  const renderItem = ({ item }: any) => (
    <Pressable
      onPress={() => {
        setComandaSelecionada({
          comanda_uuid: item.comanda_uuid,
          comanda_id: item.comanda_id,
          nome_comanda: item.nome_comanda,
          numero_comanda: item.numero_comanda,
          hora_abertura: item.hora_abertura,
          valor_total: item.valor_total,
          status_comanda: item.status_comanda,
          usuario_responsavel_id: item.usuario_responsavel_id,
        });
        router.push({ pathname: '/comandaDetalhe' });
      }}
    >
    <Comanda
      numero_comanda={item.numero_comanda}
      nome_comanda={item.nome_comanda}
      valor_total={item.valor_total}
      hora_abertura={
        dayjs(item.hora_abertura).isSame(dayjs(), 'day')
          ? dayjs(item.hora_abertura).format('HH:mm')
          : dayjs(item.hora_abertura).format('DD/MM/YYYY HH:mm')
      }
      status_comanda={item.status_comanda}
    />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      <FlatList
        data={visibleComandas.sort((a, b) => parseInt(a.numero_comanda || "0") - parseInt(b.numero_comanda || "0"))}
        keyExtractor={(item, index) => `${item.comanda_uuid}_${index}`}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{mensagemErro ? 'Erro ao buscar comandas, verifique a conexão com o servidor!' : 'Nenhuma comanda aberta'}</Text>
          </View>
        }
      />
      <ButtonFlutuante />
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
    marginTop:15
  },
  emptyText: {
    fontSize: 20,
    color: 'gray',
    margin:15
  },
});
