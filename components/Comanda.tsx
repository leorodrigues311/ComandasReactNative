import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View} from 'react-native';
import react from 'react'

// Aqui nós instanciamos uma interface para definir o tipo de cada variavel
interface ComandaProps {
  nome_comanda: string;
  numero_comanda: string;
  hora_abertura: string;
  valorTotal: number;
  status_comanda: string;
}

export function Comanda({nome_comanda, numero_comanda, valorTotal, hora_abertura, status_comanda}: ComandaProps){
    return (
        <View  style={styles.viewPrincipal}>
          {/*Aqui fica o visualizador do status da comanda, estiver ativo, fica verde, inativo fica vermelho*/}
            <View style={[styles.viewStatus,
              {backgroundColor: status_comanda === 'ativo' ? '#00FF00' : '#FF0000'},
              {borderColor: status_comanda === 'ativo' ? '#00FF00' : '#FF0000'}]}>
             </View>

          {/*Essa é a view que exibe o numero da comanda*/}
            <View style={styles.viewNumero}>
                <Text style={styles.viewNumeroTexto}>{numero_comanda}</Text>
            </View>

          {/*Essa é a view que traz os detalhes da comanda*/}
            <View style={styles.viewInfo}>
              <Text style={styles.viewInfoNome}>{nome_comanda}</Text>
              <Text style={styles.viewInfoValorTotal}>R$ {valorTotal.toFixed(2).replace('.', ',')}</Text>
              <Text style={styles.viewInfoHora}>Hora de Abertura: {hora_abertura}</Text>
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
    fontSize:50,
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
