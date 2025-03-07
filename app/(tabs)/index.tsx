import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import { Comanda } from '@/components/Comanda';
import { TopBar } from '@/components/navigation/TopBar';
import { ButtonFlutuante } from '@/components/ButtonFlutuante';
import { useRouter } from "expo-router";
import { useComanda } from '@/app/context/comandaContext';

export default function HomeScreen() {
  const { comandas, carregarComandas } = useComanda();
  const router = useRouter();

  useEffect(() => {
    carregarComandas();
  }, []);

  console.log('comandas', comandas)

  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {comandas.length > 0 ? (
          comandas.map((comanda, index) => (
            <Pressable
              key={index}
              onPress={() => router.push({
                pathname: '/comandaDetalhe',
                params: {
                  nome_comanda: comanda.nome_comanda,
                  numero_comanda: comanda.numero_comanda.toString(),
                  hora_abertura: comanda.hora_abertura,
                  valorTotal: comanda.valorTotal.toString(),
                  status_comanda: comanda.status_comanda
                }
              })}
            >
              <Comanda
                numero_comanda={comanda.numero_comanda}
                nome_comanda={comanda.nome_comanda}
                valorTotal={comanda.valorTotal}
                hora_abertura={comanda.hora_abertura}
                status_comanda={comanda.status_comanda}
              />
            </Pressable>
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20, color:'white' }}>Nenhuma comanda encontrada</Text>
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
});
