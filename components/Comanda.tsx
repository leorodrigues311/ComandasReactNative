import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View} from 'react-native';
import react from 'react'

interface ComandaProps {
  nomeComanda: string;
  numeroComanda: number;
  valorTotal: number;
  horaAbertura: string;
  statusComanda: string
}

export function Comanda({nomeComanda, numeroComanda, valorTotal, horaAbertura, statusComanda}: ComandaProps){
    return (
        <View  style={styles.viewPrincipal}>
            <View style={[styles.viewStatus,
              {backgroundColor: statusComanda === 'ativo' ? '#00FF00' : '#FF0000'},
              {borderColor: statusComanda === 'ativo' ? '#00FF00' : '#FF0000'}]}>
             </View>

            <View style={styles.viewNumero}>
                <Text style={styles.viewNumeroTexto}>{numeroComanda}</Text>
            </View>

            <View style={styles.viewInfo}>
              <Text style={styles.viewInfoNome}>{nomeComanda}</Text>
              <Text style={styles.viewInfoValorTotal}>R$ {valorTotal}</Text>
              <Text style={styles.viewInfoHora}>Hora de Abertura: {horaAbertura}</Text>
            </View>
        </View>  
    );

}


const styles = StyleSheet.create({

  viewPrincipal: {
    height:100,
    borderWidth: 0.5,
    borderRadius:5,
    borderColor: '#4F4F4F',
    margin: 12,
    marginBottom:1,
    backgroundColor:'#1C1C1C',
    flexDirection: 'row'
  },

  viewStatus: {
    height:99,
    width:5,
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
    fontSize:20
  },

  viewInfoValorTotal: {
    marginLeft:10,
    marginTop:8,
    color:'#00FF00',
    fontSize:23
  },

  viewInfoHora: {
    marginLeft:10,
    marginTop:7,
    color:'#C0C0C0',
    fontSize:12
  },

});
