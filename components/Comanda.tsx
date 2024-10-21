import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View} from 'react-native';
import react from 'react'

export function Comanda(){
    return (

        <View  style={styles.viewPrincipal}>
            <View style={styles.viewStatus}></View>
            <View style={styles.viewNumero}>
                <Text style={styles.viewNumeroTexto}>12</Text>
            </View>
        </View>



    
        
    );

}


const styles = StyleSheet.create({

  viewPrincipal: {
    height:100,
    borderWidth: 0.5,
    borderRadius:3,
    borderColor: '#4F4F4F',
    margin: 12,
    backgroundColor:'#1C1C1C',
    flexDirection: 'column'
  },

  viewStatus: {
    height:98,
    width:12,
    backgroundColor:'#00FF00',
    borderWidth: 0.2,
    borderRadius:3,
    borderTopRightRadius:0,
    borderBottomRightRadius:0,
    borderColor: '#00FF00',
    marginLeft: 0,
  },

  viewNumero: {
    height:98,
    width:98,
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


});
