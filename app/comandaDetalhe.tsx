import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable, ScrollView, Animated } from 'react-native'
import { ItemComanda } from '@/components/ItemComanda'
import { TopBarDetalheComanda } from '@/components/navigation/TopBarDetalheComanda'
import { BottomBarDetalheComanda } from '@/components/navigation/BottomBarDetalheComanda'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ValorTotalComanda } from '@/components/valorTotalComanda'
import { useLocalSearchParams, useRouter } from 'expo-router'
import * as Haptics from 'expo-haptics'
import { ComandaProvider, useComanda } from '@/app/context/comandaContext'


export default function ComandaDetalhe () {

  const { itensComanda } = useComanda()
  const { nomeComanda, numeroComanda, horaAbertura, statusComanda, novosItens } = useLocalSearchParams<{
    nomeComanda: string,
    numeroComanda: string,
    horaAbertura: string,
    statusComanda: string,
    novosItens?: string,
  }>()

  console.log(itensComanda)

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
    <ComandaProvider>
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
        {itensComanda
        .filter(item => item.numeroComanda.toString() === numeroComanda)
        .map((item) => (
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
    </ComandaProvider>
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
