import {Pressable, StyleSheet, Text } from 'react-native';
import { Comanda } from '@/components/Comanda';
import { TopBar } from '@/components/navigation/TopBar';
import { ButtonFlutuante } from '@/components/ButtonFlutuante';
import { SafeAreaView } from 'react-native';
import { View, ScrollView} from 'react-native';
import { router } from "expo-router";
import { Link } from 'expo-router';

export default function HomeScreen() {

 

 

  return (
    <SafeAreaView style={styles.container}>
       <TopBar/>
       {/* <TopBarDetalheComanda/> */}
       <ScrollView contentContainerStyle={styles.scrollViewContent}>
       <Link href="/comandaDetalhe" asChild>
        <Pressable>
            <Comanda
              numeroComanda={1}
              nomeComanda='João da Silva'
              valorTotal={134.21}
              horaAbertura='10:42'
              statusComanda= {true}
            />
          </Pressable>
        </Link>
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
