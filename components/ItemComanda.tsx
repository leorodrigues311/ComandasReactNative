import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View} from 'react-native';
import react from 'react'


interface itemProps {
    nomeItem: string;
    quantidade: number;
    valorUnit: number,
    valorTotal: number;
  }


export function ItemComanda({nomeItem, quantidade, valorUnit, valorTotal}: itemProps){

    return (

        <View style={styles.viewPrincipal}>
            <View>
              <Text style={styles.nomeItem}>{nomeItem}</Text>
            </View>

            <View style={styles.viewValorUnitItem}>
              <Text style={styles.quantidadeItem}>QTD: {quantidade}</Text>
              <Text style={styles.valorUnitItem}>UN R$ {valorUnit}</Text>
              <Text style={styles.valorTotalItem}>R$ {valorTotal}</Text>
            </View>

        </View>


    );

}


const styles = StyleSheet.create({

  viewPrincipal: {
    margin: 8,
    backgroundColor:'#2e2e2e',
    justifyContent:'space-between',
    alignItems:'flex-start',
    height:60,
    flexDirection: 'column',
    borderRadius:5,
  },

  quantidadeItem:{
    fontSize:14,
    color:'white',
    left:10,
    margin:5,
    fontWeight:'300'
  },

  nomeItem:{
    width:'100%',
    fontSize:19,
    color:'white',
    left:0,
    marginLeft:10,
    margin:5
  },

  viewValorUnitItem:{
    flexDirection: 'row',
    justifyContent:'space-between',
    width:'100%'
  },

  valorUnitItem:{
    fontSize:14,
    fontWeight:'300',
    color:'white',
    left:'30%',
    margin:5,
    position:'absolute'

  },

  valorTotalItem:{
    fontSize:20,
    color:'#00FF00',
    left:'70%',
    margin:5,
    position:'absolute'
  }


});
