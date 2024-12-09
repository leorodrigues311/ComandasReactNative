import { StyleSheet, Text, View } from 'react-native';


interface itemProps {
    nomeItem: string;
    quantidade: number;
    valorUnit: number;
    valorTotal: number;
    style?: object;
}

export function ItemComanda({ nomeItem, quantidade, valorUnit, valorTotal, style }: itemProps) {
    return (
        <View style={[styles.viewPrincipal, style]}>
            <View style={styles.viewNomeItem}>
                <Text style={styles.nomeItem}>{nomeItem}</Text>
            </View>

            <View style={styles.viewValorUnitItem}>
                <Text style={styles.quantidadeItem}>QTD: {quantidade}</Text>
                <Text style={styles.valorUnitItem}>UN R$ {valorUnit}</Text>
            </View>

            <Text style={styles.valorTotalItem}>R$ {valorTotal}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  viewPrincipal: {
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#282828',
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
    color: '#00CC00',
    fontWeight: '800',
    right: '2%',
    top: '30%',
    margin: 5,
    position: 'absolute',
  },
});
