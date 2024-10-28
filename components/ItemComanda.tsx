import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View} from 'react-native';
import react from 'react'


interface itemProps {
    nomeItem: string;
    quantidade: number;
    valor: number;
  }


export function ItemComanda({nomeItem, quantidade, valor}: itemProps){

    return (

        <View style={styles.viewPrincipal}>
            <Text style={styles.quantidadeItem}>{quantidade}</Text>
            <Text style={styles.nomeItem}>{nomeItem}</Text>
            <Text style={styles.valorItem}>R$ {valor}</Text>
        </View>


    );

}


const styles = StyleSheet.create({

  viewPrincipal: {
    margin: 8,
    backgroundColor:'#2e2e2e',
    justifyContent:'space-between',
    alignItems:'center',
    height:35,
    flexDirection: 'row',
    borderRadius:5,
  },

  quantidadeItem:{
    fontSize:16,
    color:'white',
    margin:5,
    marginLeft:10,
    position:'absolute'
  },

  nomeItem:{
    fontSize:16,
    color:'white',
    margin:5,
    position:'absolute',
    left:'16%'
  },

  valorItem:{
    fontSize:18,
    color:'white',
    paddingLeft:10,
    margin:5,
    marginRight:10,
    right:0,
    position:'absolute',
    backgroundColor:'#2e2e2e'

  }



});
