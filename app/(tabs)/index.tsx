import {StyleSheet, Text } from 'react-native';

import { Comanda } from '@/components/Comanda';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Comanda
          numeroComanda={1}
          nomeComanda='João da Silva'
          valorTotal={134.21}
          horaAbertura='10:42'
        />

        <Comanda
          numeroComanda={2}
          nomeComanda='Joana Dias'
          valorTotal={73.15}
          horaAbertura='11:23'
        />

        <Comanda
          numeroComanda={3}
          nomeComanda='José Roberto'
          valorTotal={33.52}
          horaAbertura='12:02'
        />

        <Comanda
          numeroComanda={4}
          nomeComanda='Jairo Mendes'
          valorTotal={714.15}
          horaAbertura='13:52'
        />

        <Comanda
          numeroComanda={5}
          nomeComanda='Manoel da Cruz'
          valorTotal={14.22}
          horaAbertura='14:43'
        />

        <Comanda
          numeroComanda={6}
          nomeComanda='Charles Darwin da Silva'
          valorTotal={7.55}
          horaAbertura='14:53'
        />

      </ScrollView>
    </SafeAreaView>
    

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
    color:'white',
    fontSize: 24,
    marginLeft: 20,
    marginTop: 20
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
