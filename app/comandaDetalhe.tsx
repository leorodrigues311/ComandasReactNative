import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable, ScrollView, Animated } from 'react-native'
import { ItemComanda } from '@/components/ItemComanda'
import { TopBarDetalheComanda } from '@/components/navigation/TopBarDetalheComanda'
import { BottomBarDetalheComanda } from '@/components/navigation/BottomBarDetalheComanda'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ValorTotalComanda } from '@/components/valorTotalComanda'
import { useLocalSearchParams, useRouter } from 'expo-router'
import * as Haptics from 'expo-haptics'

interface Comanda {
  nomeComanda: string
  numeroComanda: string
  horaAbertura: string
  valorTotal: number
  statusComanda: string
}

interface ComandaItem {
  id: string;
  numeroComanda: number
  nomeItem: string
  valorUnit: number
  quantidade: number
}

const [comandas, setComandas] = useState<Comanda[]>([
    { nomeComanda: 'João da Silva', numeroComanda: '1', horaAbertura: '10:42', valorTotal: 134.21, statusComanda: 'ativo' },
    { nomeComanda: 'Roberto', numeroComanda: '2', horaAbertura: '10:42', valorTotal: 14.11, statusComanda: 'ativo' },
    { nomeComanda: 'Lucas', numeroComanda: '3', horaAbertura: '11:28', valorTotal: 1874.33, statusComanda: 'ativo' },
    { nomeComanda: 'Maria', numeroComanda: '4', horaAbertura: '09:52', valorTotal: 5.32, statusComanda: 'ativo' },
    { nomeComanda: 'Ana Clara', numeroComanda: '5', horaAbertura: '15:30', valorTotal: 87.50, statusComanda: 'inativo' },
    { nomeComanda: 'Pedro Henrique', numeroComanda: '6', horaAbertura: '17:00', valorTotal: 220.25, statusComanda: 'ativo' },
    { nomeComanda: 'Sofia', numeroComanda: '7', horaAbertura: '18:45', valorTotal: 65.99, statusComanda: 'inativo' },
    { nomeComanda: 'Lucas Oliveira', numeroComanda: '8', horaAbertura: '19:20', valorTotal: 110.00, statusComanda: 'ativo' },
    { nomeComanda: 'Camila Souza', numeroComanda: '9', horaAbertura: '20:05', valorTotal: 35.75, statusComanda: 'ativo' },

  ])

const gerarId = () => {
  return `item${Date.now()}-${Math.floor(Math.random() * 1000)}`; // Gerando um id único baseado no timestamp e número aleatório
};

const [itensComanda, setItensComanda] = useState<ComandaItem[]>([
  { id: gerarId(), numeroComanda: 1, nomeItem: 'Teste grelhado', valorUnit: 12.21, quantidade: 3 },
  { id: gerarId(), numeroComanda: 2, nomeItem: 'Pão com pao', valorUnit: 12.21, quantidade: 3 },
  { id: gerarId(), numeroComanda: 3, nomeItem: 'Sopa de macaco', valorUnit: 12.21, quantidade: 3 },
]);

const adicionarComanda = (novaComanda: Comanda, setComandas: React.Dispatch<React.SetStateAction<Comanda[]>>) => {
  setComandas(prevComandas => [...prevComandas, novaComanda]);
};

const removerComanda = (numeroComanda: string, setComandas: React.Dispatch<React.SetStateAction<Comanda[]>>) => {
  setComandas(prevComandas => prevComandas.filter(comanda => comanda.numeroComanda !== numeroComanda));
};

const adicionarItens = (novoItem: Omit<ComandaItem, 'id'>, setItensComanda: React.Dispatch<React.SetStateAction<ComandaItem[]>>) => {
  const novoItemComId = { ...novoItem, id: gerarId() }; // Gerando id único ao adicionar o item
  setItensComanda(prevItens => [...prevItens, novoItemComId]);
};

/*
const adicionarItens = () => {
  console.log('funcionou')
}
*/
const removerItemComanda = (idItem: string, setItensComanda: React.Dispatch<React.SetStateAction<ComandaItem[]>>) => {
  setItensComanda(prevItens => prevItens.filter(item => item.id !== idItem)); // Usando o id único para remover
};


export {comandas, setComandas, adicionarItens, removerItemComanda, removerComanda, adicionarComanda, itensComanda, setItensComanda, gerarId }

export default function ComandaDetalhe () {
  const { nomeComanda, numeroComanda, horaAbertura, statusComanda, novosItens } = useLocalSearchParams<{
    nomeComanda: string,
    numeroComanda: string,
    horaAbertura: string,
    statusComanda: string,
    novosItens?: string,
  }>()

  // Estados e funções para seleção de itens (como já estava no seu código)
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const limparSelecao = () => {
    setSelectedItems([])
  }

  const handleLongPress = (numeroComanda: number) => {
    if (selectedItems.length === 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    }
    setSelectedItems(prevSelected =>
      prevSelected.includes(numeroComanda)
        ? prevSelected.filter(item => item !== numeroComanda)
        : [...prevSelected, numeroComanda]
    )
  }

  const handlePress = (numeroComanda: number) => {
    if (selectedItems.length !== 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
      setSelectedItems(prevSelected =>
        prevSelected.includes(numeroComanda)
          ? prevSelected.filter(item => item !== numeroComanda)
          : [...prevSelected, numeroComanda]
      )
    }
  }

  const isBottomBarVisible = selectedItems.length > 0

  return (
    <SafeAreaView style={styles.viewPrincipal}>
      <TopBarDetalheComanda hideIcons={isBottomBarVisible} />

      <View style={styles.viewInfoComanda}>
        <View style={[
            styles.viewStatus, 
            { backgroundColor: statusComanda === 'ativo' ? '#00FF00' : '#FF0000' },
            { borderColor: statusComanda === 'ativo' ? '#00FF00' : '#FF0000' }
          ]}
        />
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
          {itensComanda.map((item) => (
            <Pressable
              key={item.numeroComanda}
              onLongPress={() => handleLongPress(item.numeroComanda)}
              onPress={() => handlePress(item.numeroComanda)}
            >
              <ItemComanda
                nomeItem={item.nomeItem}
                valorUnit={item.valorUnit}
                valorTotal={item.valorUnit * item.quantidade}
                quantidade={item.quantidade}
                style={selectedItems.includes(item.numeroComanda) ? styles.selectedItem : {}}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {(!isBottomBarVisible) && <ValorTotalComanda valorTotal={134.21} />}
      {isBottomBarVisible && <BottomBarDetalheComanda selectedItemsLength={selectedItems.length} limparSelecao={limparSelecao} />}

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  viewPrincipal: {
    margin: 12,
    marginTop: 0,
    marginBottom: 16,
    backgroundColor: '#1C1C1C',
    flexDirection: 'column',
    flex: 1,
    borderRadius: 5
  },
  viewInfoComanda: {
    flexDirection: 'row',
    backgroundColor: '#363636',
    borderRadius: 5,
    height: 99,
    marginBottom: 25
  },
  viewStatus: {
    height: 99,
    width: 5,
    borderWidth: 0.2,
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginLeft: 0,
  },
  viewNumero: {
    height: 99,
    width: 99,
    alignItems: 'center',
    backgroundColor: '#696969',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  viewNumeroTexto: {
    alignItems: 'center',
    margin: 20,
    color: 'white',
    fontSize: 50
  },
  viewInfo: {
    alignItems: 'flex-start',
    margin: 3,
  },
  viewInfoNome: {
    marginLeft: 10,
    marginTop: 5,
    color: 'white',
    fontSize: 25
  },
  viewInfoHora: {
    marginLeft: 10,
    marginTop: 10,
    color: 'white',
    fontSize: 12
  },
  itensComanda: {
    flex: 1,
    marginBottom: 50
  },
  selectedItem: {
    margin: 5,
    marginHorizontal: 10,
    backgroundColor: '#696969',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: 60,
    flexDirection: 'column',
    borderRadius: 5,
    borderColor:'#A9A9A9',
    borderWidth: 0.6
  },
  btnAdicionarItem: {
    backgroundColor: '#02bf02',
    padding: 15,
    alignItems: 'center',
    margin: 10,
    borderRadius: 5,
  },
  textoAdicionarItem: {
    color: 'white',
    fontSize: 18,
  },
})
