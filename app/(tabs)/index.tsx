import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import { Comanda } from '@/components/Comanda';
import { TopBar } from '@/components/navigation/TopBar';
import { ButtonFlutuante } from '@/components/ButtonFlutuante';
import { useRouter } from "expo-router";
import { useComanda } from '@/app/context/comandaContext';

export default function HomeScreen() {
  const { comandas, carregaComandas } = useComanda();
  const router = useRouter();

  useEffect(() => {
   carregaComandas();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {comandas.map((comanda, index) => (
            <Pressable
              key={index}
              onPress={() => router.push({
                pathname: '/comandaDetalhe',
                params: {
                  nome_comanda: comanda.nome_comanda,
                  numero_comanda: comanda.numero_comanda,
                  hora_abertura: comanda.hora_abertura,
                  valor_total: comanda.valor_total,
                  status_comanda: comanda.status_comanda,
                }
              })}
            >
              <Comanda
                numero_comanda={comanda.numero_comanda}
                nome_comanda={comanda.nome_comanda}
                valor_total={comanda.valor_total}
                hora_abertura={comanda.hora_abertura}
                status_comanda={comanda.status_comanda}
              />
            </Pressable>
          ))}

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
