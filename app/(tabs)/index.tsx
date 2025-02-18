import {Pressable, StyleSheet, Text } from 'react-native';
import { Comanda } from '@/components/Comanda';
import { TopBar } from '@/components/navigation/TopBar';
import { ButtonFlutuante } from '@/components/ButtonFlutuante';
import { SafeAreaView } from 'react-native';
import { View, ScrollView} from 'react-native';
import { useRouter } from "expo-router";
import * as Haptics from 'expo-haptics';

type ComandaDetalheParams = {
  nomeComanda: string;
  numeroComanda: number;
  horaAbertura: string;
  statusComanda: string;
};

export default function HomeScreen() {

  const comandas = [
    { nomeComanda: 'João da Silva', numeroComanda: 1, horaAbertura: '10:42', valorTotal: 134.21, statusComanda: 'ativo' },
    { nomeComanda: 'Roberto', numeroComanda: 2, horaAbertura: '10:42', valorTotal: 14.11, statusComanda: 'ativo' },
    { nomeComanda: 'Lucas', numeroComanda: 3, horaAbertura: '11:28', valorTotal: 1874.33, statusComanda: 'ativo' },
    { nomeComanda: 'Maria', numeroComanda: 4, horaAbertura: '09:52', valorTotal: 5.32, statusComanda: 'ativo' },
    { nomeComanda: 'Ana Clara', numeroComanda: 5, horaAbertura: '15:30', valorTotal: 87.50, statusComanda: 'inativo' },
    { nomeComanda: 'Pedro Henrique', numeroComanda: 6, horaAbertura: '17:00', valorTotal: 220.25, statusComanda: 'ativo' },
    { nomeComanda: 'Sofia', numeroComanda: 7, horaAbertura: '18:45', valorTotal: 65.99, statusComanda: 'inativo' },
    { nomeComanda: 'Lucas Oliveira', numeroComanda: 8, horaAbertura: '19:20', valorTotal: 110.00, statusComanda: 'ativo' },
    { nomeComanda: 'Camila Souza', numeroComanda: 9, horaAbertura: '20:05', valorTotal: 35.75, statusComanda: 'ativo' }
];

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
       <TopBar/>
       {/* <TopBarDetalheComanda/> */}
       <ScrollView contentContainerStyle={styles.scrollViewContent}>

        {comandas.map((comanda, index) => (
                  <Pressable
                      key={index}
                      onPress={() => router.push({
                          pathname: '/comandaDetalhe',
                          params: comanda,
                      })}
                  >
                      <Comanda
                          numeroComanda={comanda.numeroComanda}
                          nomeComanda={comanda.nomeComanda}
                          valorTotal={comanda.valorTotal}
                          horaAbertura={comanda.horaAbertura}
                          statusComanda={comanda.statusComanda}
                      />
                  </Pressable>
              ))}
              
      </ScrollView>
      <ButtonFlutuante/>  
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex:1

  },

  scrollViewContent: {
    flexGrow: 1,
  },

});
