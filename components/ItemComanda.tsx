import { StyleSheet, Text, View } from 'react-native';
import { ComandaProvider, useComanda } from '@/app/context/comandaContext'

// Aqui nós instanciamos uma interface para definir o tipo de cada variavel/ variáveis opcionais tem um ? após o nome
interface itemProps {
    nomeItem: string;
    quantidade: number;
    valorUnit: string;
    valorTotal: string;
    style?: object;
}

export function ItemComanda({ nomeItem, quantidade, valorUnit, valorTotal, style }: itemProps) {

    const { itensComanda, comandaSelecionada, carregaItens, formataValor } = useComanda()
    return (
        <View style={[styles.viewPrincipal, style]}>
            <View style={styles.viewNomeItem}>
                <Text style={[styles.nomeItem,
                  {color: comandaSelecionada?.status_comanda === '4' ||
                          comandaSelecionada?.status_comanda === '3' || 
                          comandaSelecionada?.status_comanda === '2' ? 'gray' : 'white' }]}>
                  {nomeItem}
                </Text>
            </View>

            <View style={styles.viewValorUnitItem}>
                <Text style={styles.quantidadeItem}>QTD: {quantidade}</Text>
                <Text style={styles.valorUnitItem}>UN  {valorUnit}</Text>
            </View>

            <Text style={styles.valorTotalItem}>{valorTotal}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  viewPrincipal: {
    backgroundColor: '#1C1C1C',
    marginBottom:10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: 60,
    flexDirection: 'column',
    borderRadius: 5,
  },

  quantidadeItem: {
    fontSize: 13,
    color: '#C0C0C0',
    left: 10,
    margin: 5,
    marginTop: 0,
    fontWeight: '300',
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
    justifyContent: 'space-between',
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
    color: '#04c78a',
    fontWeight: '800',
    right: '2%',
    top: '30%',
    margin: 5,
    position: 'absolute',
  },
});
