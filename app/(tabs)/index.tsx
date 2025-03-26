import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, SafeAreaView, ScrollView, View, RefreshControl } from 'react-native';
import { Comanda } from '@/components/Comanda';
import { TopBar } from '@/components/navigation/TopBar';
import { ButtonFlutuante } from '@/components/ButtonFlutuante';
import { useRouter } from "expo-router";
import { useComanda } from '@/app/context/comandaContext';

export default function HomeScreen() {
  const { comandas, carregaComandas, setComandaSelecionada } = useComanda();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    carregaComandas();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await carregaComandas();  // Recarrega os dados
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        {comandas.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma comanda aberta</Text>
          </View>
        ) : (
          [...comandas]
            .sort((a, b) => (parseInt(a.numero_comanda || "0") - parseInt(b.numero_comanda || "0")))
            .map((comanda, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  setComandaSelecionada({
                    comanda_uuid: comanda.comanda_uuid,
                    nome_comanda: comanda.nome_comanda,
                    numero_comanda: comanda.numero_comanda,
                    hora_abertura: comanda.hora_abertura,
                    valor_total: comanda.valor_total,
                    status_comanda: comanda.status_comanda
                  });
                  router.push({ pathname: '/comandaDetalhe' });
                }}
              >
                <Comanda
                  numero_comanda={comanda.numero_comanda}
                  nome_comanda={comanda.nome_comanda}
                  valor_total={comanda.valor_total}
                  hora_abertura={comanda.hora_abertura}
                  status_comanda={comanda.status_comanda}
                />
              </Pressable>
            ))
        )}
      </ScrollView>
      <ButtonFlutuante />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
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
