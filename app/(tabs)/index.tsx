import {Pressable, StyleSheet, Text } from 'react-native';
import { Comanda } from '@/components/Comanda';
import { TopBar } from '@/components/navigation/TopBar';
import { ButtonFlutuante } from '@/components/ButtonFlutuante';
import { SafeAreaView } from 'react-native';
import { View, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from "expo-router";

export default function HomeScreen() {


  const botaoComanda = () => {
    router.push('/comandaDetalhe')
}


  return (
    <SafeAreaView style={styles.container}>
       <TopBar/>
       {/* <TopBarDetalheComanda/> */}
       <ScrollView contentContainerStyle={styles.scrollViewContent}>
       <Pressable onPress={botaoComanda}>
          <Comanda
            numeroComanda={1}
            nomeComanda='João da Silva'
            valorTotal={134.21}
            horaAbertura='10:42'
            statusComanda= {true}
          />
        </Pressable>
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
