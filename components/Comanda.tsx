import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View} from 'react-native';
import react from 'react'
import { ComandaProvider, useComanda } from '@/app/context/comandaContext'

// Aqui nós instanciamos uma interface para definir o tipo de cada variavel
interface ComandaProps {
  nome_comanda: string;
  numero_comanda: string;
  hora_abertura: string;
  valor_total: number;
  status_comanda: string;
}

export function Comanda({nome_comanda, numero_comanda, valor_total, hora_abertura, status_comanda}: ComandaProps){

  const {gerarData, formataValor} = useComanda()

    return (
        <View  style={styles.viewPrincipal}>
          {/*Aqui fica o visualizador do status da comanda, estiver ativo, fica verde, inativo fica vermelho*/}
            <View style={[styles.viewStatus,
              {backgroundColor: status_comanda === '1' ? '#06d691' : (status_comanda === '2' ?'#e11d48' : '#383737')},
              {borderColor: status_comanda === '1' ? '#06d691' : (status_comanda === '2' ?'#e11d48' : '#383737')}]}>
             </View>

          {/*Essa é a view que exibe o numero da comanda*/}
            <View style={styles.viewNumero}>
                <Text style={styles.viewNumeroTexto}
                  numberOfLines={1}
                  adjustsFontSizeToFit>{numero_comanda}</Text>
            </View>

          {/*Essa é a view que traz os detalhes da comanda*/}
            <View style={styles.viewInfo}>
              <Text style={styles.viewInfoNome}numberOfLines={1}>{nome_comanda}</Text>
              <Text style={styles.viewInfoValorTotal}>{formataValor(valor_total)}</Text>
              <Text style={styles.viewInfoHora}>{gerarData(hora_abertura)}</Text>
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
    backgroundColor:'#059669',
    borderWidth: 0.2,
    borderRadius:5,
    borderTopRightRadius:0,
    borderBottomRightRadius:0,
    borderColor: '#059669',
    marginLeft: 0,
  },

  viewNumero: {
    height:99,
    width:99,
    alignItems: 'center',
    display:'flex',
    justifyContent:'center',
    backgroundColor:'#383737',
    borderTopRightRadius:5,
    borderBottomRightRadius:5,
  },

  viewNumeroTexto: {
    alignItems: 'center',
    textAlign:'center',
    fontWeight:'500',
    gap: 6,
    color:'#adacac',
    margin:10,
    fontSize:50,
  },

  viewInfo: {
    alignItems: 'flex-start',
    margin:3,
    flex:1,
  },

  viewInfoNome: {
    alignItems: 'center',
    marginLeft:10,
    marginTop:5,
    color:'white',
    fontWeight:300,
    fontSize:20,
    flex:1,
    maxHeight:25
  },

  viewInfoValorTotal: {
    marginLeft:10,
    marginTop:8,
    color:'white',
    fontWeight:600,
    fontSize:23
  },

  viewInfoHora: {
    marginLeft:10,
    marginTop:7,
    color:'#C0C0C0',
    fontSize:12
  },

});
