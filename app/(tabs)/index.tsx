import {StyleSheet, Text } from 'react-native';

import { Comanda } from '@/components/Comanda';
import { TopBar } from '@/components/TopBar';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';


export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
       <TopBar/>
       <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Comanda
          numeroComanda={1}
          nomeComanda='João da Silva'
          valorTotal={134.21}
          horaAbertura='10:42'
          statusComanda= {true}
        />

        <Comanda
          numeroComanda={2}
          nomeComanda='Joana Dias'
          valorTotal={73.15}
          horaAbertura='11:23'
          statusComanda= {true}
        />

        <Comanda
          numeroComanda={3}
          nomeComanda='José Roberto'
          valorTotal={33.52}
          horaAbertura='12:02'
          statusComanda= {true}
        />

        <Comanda
          numeroComanda={4}
          nomeComanda='Jairo Mendes'
          valorTotal={714.15}
          horaAbertura='13:52'
          statusComanda= {true}
        />

        <Comanda
          numeroComanda={5}
          nomeComanda='Manoel da Cruz'
          valorTotal={14.22}
          horaAbertura='14:43'
          statusComanda= {false}
        />

        <Comanda
          numeroComanda={6}
          nomeComanda='Charles Darwin da Silva'
          valorTotal={7.55}
          horaAbertura='14:53'
          statusComanda= {true}
        />

      </ScrollView>
    </SafeAreaView>
    

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  scrollViewContent: {
    
  },
});
