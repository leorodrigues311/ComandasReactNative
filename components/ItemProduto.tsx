import { StyleSheet, Text, View, Image } from 'react-native';
import { ComandaProvider, useComanda } from '@/app/context/comandaContext'



interface itemProps {
    nomeItem: string;
    estoque: number;
    valorTotal: number;
    imagem?: string;
    style?: object;
}

export function ItemProduto({ nomeItem, estoque, valorTotal, imagem, style }: itemProps) {

  const {formataValor} = useComanda() 

    return (
        <View  style={styles.viewPrincipal}>

          <View style={styles.viewNumero}>
              <Image 
                  source={imagem ? {uri: imagem} : {uri: './placeholder.png'}} 
                  style={styles.imagemNumero} 
              />
          </View>

          <View style={styles.viewInfo}>
            <Text style={styles.viewInfoNome}numberOfLines={1}>{nomeItem}</Text>
            <View style={styles.viewValorUnitItem}>
              <Text style={styles.viewInfoValorTotal}>{formataValor(valorTotal)}</Text>
              <Text style={styles.quantidadeItem}>Estoque: {estoque}</Text>
            </View>
          </View>
        </View>  
    );
}

const styles = StyleSheet.create({
  viewPrincipal: {
    height:70,
    borderWidth: 0.5,
    borderRadius:5,
    borderColor: '#4F4F4F',
    margin: 12,
    marginBottom:1,
    backgroundColor:'#1C1C1C',
    flexDirection: 'row'
    
  },

  viewNumero: {
    height:70,
    width:70,
    alignItems: 'center',
    backgroundColor:'#696969',
    borderRadius:5,
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
    flex: 1,
    margin:3,
  },

  viewInfoNome: {
    alignItems: 'center',
    marginLeft:10,
    marginTop:5,
    flex: 1, // ocupa o espaço disponível
    marginRight: 10, // margem que você quiser
    fontWeight:300,
    color:'white',
    fontSize:17
  },

  viewInfoValorTotal: {
    marginLeft:10,
    marginTop:8,
    color:'white',
    fontSize:23
  },

  viewInfoHora: {
    marginLeft:10,
    marginTop:10,
    color:'white',
    fontSize:12
  },

  quantidadeItem: {
    fontSize: 13,
    color: '#C0C0C0',
    left: 180,
    margin: 0,
    marginTop: 14,
    fontWeight: '300',
    position:'absolute'
  },

  viewNomeItem: {
    width: '66%',
    height: 30,
  },

  nomeItem: {
    width: '100%',
    fontSize: 18,
    color: 'white',
    left: 0,
    marginLeft: 10,
    margin: 5,
  },

  viewValorUnitItem: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 5,
  },

  valorUnitItem: {
    fontSize: 13,
    fontWeight: '300',
    color: '#C0C0C0',
    left: '30%',
    margin: 5,
    marginTop: 0,
    position: 'absolute',
  },

  valorTotalItem: {
    fontSize: 16,
    color: 'white',
    fontWeight: '800',
    right: '2%',
    top: '30%',
    margin: 5,
    position: 'absolute',
  },

  imagemNumero: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover',
    borderRadius:5,
},

});
