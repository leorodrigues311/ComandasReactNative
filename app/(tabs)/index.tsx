import {Pressable, StyleSheet, Text } from 'react-native';
import { Comanda } from '@/components/Comanda';
import { TopBar } from '@/components/navigation/TopBar';
import { ButtonFlutuante } from '@/components/ButtonFlutuante';
import { SafeAreaView } from 'react-native';
import { View, ScrollView} from 'react-native';
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Haptics from 'expo-haptics';
import { ComandaProvider, useComanda } from '@/app/context/comandaContext'




export default function HomeScreen() {

  const { comandas, buscaComandas } = useComanda();
  const router = useRouter();
  buscaComandas();

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
                          params: {
                              nomeComanda: comanda.nomeComanda,
                              numeroComanda: comanda.numeroComanda.toString(),
                              horaAbertura: comanda.horaAbertura,
                              valorTotal: comanda.valorTotal.toString(),
                              statusComanda: comanda.statusComanda
                          }
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
