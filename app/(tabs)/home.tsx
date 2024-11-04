import {Pressable, StyleSheet, Text } from 'react-native';
import { Comanda } from '@/components/Comanda';
import { ComandaDetalhe } from '@/components/ComandaDetalhe';
import { ValorTotalComanda } from '@/components/valorTotalComanda';
import { TopBar } from '@/components/TopBar';
import { TopBarDetalheComanda } from '@/components/navigation/TopBarDetalheComanda';
import { ButtonFlutuante } from '@/components/ButtonFlutuante';
import { SafeAreaView } from 'react-native';
import { View, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Routes from '../routes/Routes'
 

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
       <TopBar/>
       {/* <TopBarDetalheComanda/> */}
       <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* <ComandaDetalhe
                    numeroComanda={1}
                    nomeComanda='João da Silva'
                    valorTotal={134.21}
                    horaAbertura='10:42'
                    statusComanda= {true}
          /> */}

        <Pressable onPress = {() => {navigation.navigate('ComandaDetalhe')}}>
          <Comanda
            numeroComanda={1}
            nomeComanda='João da Silva'
            valorTotal={134.21}
            horaAbertura='10:42'
            statusComanda= {true}
          />
        </Pressable>

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
      <ButtonFlutuante/>
{/* 
      <ValorTotalComanda
      valorTotal={1732.98}/> */}

      
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
