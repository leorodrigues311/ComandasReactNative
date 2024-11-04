import {Pressable, StyleSheet, Text } from 'react-native';
import { Comanda } from '@/components/Comanda';
import { ComandaDetalhe } from '@/components/ComandaDetalhe';
import { ValorTotalComanda } from '@/components/valorTotalComanda';
import { TopBar } from '@/components/navigation/TopBar';
import { TopBarDetalheComanda } from '@/components/navigation/TopBarDetalheComanda';
import { ButtonFlutuante } from '@/components/ButtonFlutuante';
import { SafeAreaView } from 'react-native';
import { View, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
       <TopBar/>
       {/* <TopBarDetalheComanda/> */}
       <ScrollView contentContainerStyle={styles.scrollViewContent}>
       <Pressable onPress={() => {
            navigation.navigate('ComandaDetalhe', {
            numeroComanda: 1,
            nomeComanda: 'João da Silva',
            valorTotal: 134.21,
            horaAbertura: '10:42',
            statusComanda: true,
            });
        }}>
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
