import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View} from 'react-native';
import react from 'react'
import { ItemComanda } from '@/components/ItemComanda';
import { TopBarDetalheComanda } from '@/components/navigation/TopBarDetalheComanda';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { ValorTotalComanda } from '@/components/valorTotalComanda';

interface ComandaProps {
  nomeComanda: string;
  numeroComanda: number;
  valorTotal: number;
  horaAbertura: string;
  statusComanda: boolean
}

export default function ComandaDetalhe ({nomeComanda, numeroComanda, horaAbertura, statusComanda}:ComandaProps){

    return (
        <SafeAreaView style={styles.viewPrincipal} >
          <TopBarDetalheComanda/>

            <View style={styles.viewInfoComanda}>

              <View style={[styles.viewStatus,
              {backgroundColor: statusComanda ? '#00FF00' : '#FF0000'},
              {borderColor: statusComanda ? '#00FF00' : '#FF0000'}]}>
              </View>

              <View style={styles.viewNumero}>
                  <Text style={styles.viewNumeroTexto}>{numeroComanda}</Text>
              </View>

              <View style={styles.viewInfo}>
                <Text style={styles.viewInfoNome}>{nomeComanda}</Text>
                <Text style={styles.viewInfoHora}>Hora de Abertura: {horaAbertura}</Text>
                <Text style={styles.viewInfoHora}>Aberta por: Leonardo</Text>
              </View>


            </View>
          <ScrollView>
            <View style={styles.itensComanda}>

                <ItemComanda
                  nomeItem='Teste grelhado com queijo'
                  valorUnit={10.00}
                  valorTotal={100.00}
                  quantidade={3453}
                />
                
                <ItemComanda
                  nomeItem='Comida gostosa'
                  valorUnit={24.93}
                  valorTotal={100.00}
                  quantidade={103}
                />

                <ItemComanda
                  nomeItem='Coquinha gelada'
                  valorUnit={39.90}
                  valorTotal={1430.34}
                  quantidade={1}
                />

                <ItemComanda
                  nomeItem='Comida com nome grande de proposito'
                  valorUnit={10.00}
                  valorTotal={2.25}
                  quantidade={10}
                />

                <ItemComanda
                  nomeItem='Teste grelhado com queijo'
                  valorUnit={2.24}
                  valorTotal={100.39}
                  quantidade={45}
                />
              </View>
            </ScrollView>
            <ValorTotalComanda
            valorTotal={10}/>
        </SafeAreaView>  
    );

}


const styles = StyleSheet.create({

  viewPrincipal: {
    margin: 12,
    marginTop:0,
    marginBottom:16,
    backgroundColor:'#1C1C1C',
    flexDirection: 'column',
    flex:1,
    borderRadius:5
  },

  viewInfoComanda: {
    flexDirection: 'row',
    backgroundColor:'#363636',
    borderRadius:5,
    height:99,
    marginBottom:25
  },

  viewStatus: {
    height:99,
    width:12,
    backgroundColor:'#00FF00',
    borderWidth: 0.2,
    borderRadius:5,
    borderTopRightRadius:0,
    borderBottomRightRadius:0,
    borderColor: '#00FF00',
    marginLeft: 0,
  },

  viewNumero: {
    height:99,
    width:99,
    alignItems: 'center',
    backgroundColor:'#696969',
    borderTopRightRadius:5,
    borderBottomRightRadius:5,
  },

  viewNumeroTexto: {
    alignItems: 'center',
    margin:20,
    gap: 6,
    color:'white',
    fontSize:50
  },

  viewInfo: {
    alignItems: 'flex-start',
    margin:3,
  },

  viewInfoNome: {
    alignItems: 'center',
    marginLeft:10,
    marginTop:5,
    color:'white',
    fontSize:25
  },

  viewInfoValorTotal: {
    marginLeft:10,
    marginTop:8,
    color:'#00FF00',
    fontSize:23
  },

  viewInfoHora: {
    marginLeft:10,
    marginTop:10,
    color:'white',
    fontSize:12
  },

  itensComanda: {
    flex:1,
    
  },

  itensComandaIndice:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginLeft:10,
    marginRight:10
  },

  itensComandaTexto:{
    color:'white',
    margin:10,
    marginBottom:2

  },
  viewValorTotal:{
    backgroundColor:'#363636',
    width:'100%',
    height:60,
    bottom:0,
    borderRadius:5,
    flexDirection:'row',
    justifyContent:'space-between',
    position:'absolute'
  },
  textValorTotal:{
    color:'white',
    fontSize:26,
    marginTop:15,
    marginLeft:15,
    fontWeight:'bold'
  },

  textValorTotalNumero:{
    color:'#00FF00',
    fontSize:26,
    marginTop:15,
    marginRight:15,
    fontWeight:'bold'

  },
});
