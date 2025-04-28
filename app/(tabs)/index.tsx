import React, { useEffect, useState, useMemo } from 'react';
import { Pressable, StyleSheet, Text, SafeAreaView, FlatList, View, RefreshControl, ActivityIndicator } from 'react-native';
import { Comanda } from '@/components/Comanda';
import { TopBar } from '@/components/navigation/TopBar';
import { ButtonFlutuante } from '@/components/ButtonFlutuante';
import { useRouter } from "expo-router";
import { useComanda } from '@/app/context/comandaContext';
import dayjs from 'dayjs';

const PAGE_SIZE = 30;

export default function HomeScreen() {
  const { comandas, mensagemErro, ordem, filtroStatus, tipoOrdem, inputProcurar, setInputProcurar, carregaComandas, setComandaSelecionada } = useComanda();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const carregar = async () => {
      setLoading(true);
      await carregaComandas();
      setLoading(false);
    };
    carregar();
  }, []);

  useEffect(() => {
    if (comandas.length > 0) {
      setPage(1); // Resetar para primeira página ao receber novas comandas
    }
  }, [comandas]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await carregaComandas();
    setRefreshing(false);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    const totalItems = nextPage * PAGE_SIZE;

    if (totalItems <= comandasFiltradas.length) {
      setPage(nextPage);
    }
  };

  const comandasFiltradas = useMemo(() => {
    let listaFiltrada = [...comandas];
  
    // Filtro de status
    if (filtroStatus !== 'todas') {
      listaFiltrada = listaFiltrada.filter((comanda) => comanda.status_comanda === filtroStatus);
    }
  
    // Filtro de pesquisa (inputProcurar)
    if (inputProcurar.trim() !== '') {
      const texto = inputProcurar.toLowerCase();
      listaFiltrada = listaFiltrada.filter((comanda) =>
        (comanda.nome_comanda?.toLowerCase().includes(texto) || comanda.numero_comanda?.toString().includes(texto))
      );
    }
  
    // Ordenação
    listaFiltrada.sort((a, b) => {
      let valorA: any;
      let valorB: any;
  
      if (ordem === 'numero') {
        valorA = parseInt(a.numero_comanda || "0");
        valorB = parseInt(b.numero_comanda || "0");
      } else if (ordem === 'status') {
        valorA = a.status_comanda || '';
        valorB = b.status_comanda || '';
      } else { // padrão: hora_abertura
        valorA = new Date(a.hora_abertura).getTime();
        valorB = new Date(b.hora_abertura).getTime();
      }
  
      if (valorA < valorB) return tipoOrdem === 'crescente' ? -1 : 1;
      if (valorA > valorB) return tipoOrdem === 'crescente' ? 1 : -1;
      return 0;
    });
  
    return listaFiltrada;
  }, [comandas, ordem, filtroStatus, tipoOrdem, inputProcurar]);
  

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
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <FlatList
          data={comandasFiltradas.slice(0, page * PAGE_SIZE)}
          keyExtractor={(item, index) => `${item.comanda_uuid}_${index}`}
          renderItem={renderItem}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.2}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              {mensagemErro ? (
                <Text style={styles.emptyText}>Erro ao buscar comandas, verifique a conexão com o servidor!</Text>
              ) : inputProcurar.trim() !== '' ? (
                <Text style={styles.emptyText}>Nenhuma comanda encontrada para sua busca.</Text>
              ) : (
                <Text style={styles.emptyText}>Nenhuma comanda aberta.</Text>
              )}
            </View>
          }
        />
      )}
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
    marginTop: 15,
  },
  emptyText: {
    fontSize: 20,
    color: 'gray',
    margin: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
