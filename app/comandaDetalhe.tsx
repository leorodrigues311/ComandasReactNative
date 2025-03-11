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

  const { itensComanda, carregaItens } = useComanda()
  const { nome_comanda, numero_comanda, hora_abertura, status_comanda, novosItens } = useLocalSearchParams<{
    nome_comanda: string,
    numero_comanda: string,
    hora_abertura: string,
    status_comanda: string,
    novosItens?: string,
  }>()

  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const limparSelecao = () => {
    setSelectedItems([])
  }

  const handleLongPress = (id: string) => {
    if (selectedItems.length === 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    }
    setSelectedItems(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(item => item !== id)
        : [...prevSelected, id]
    )
  }

  const handlePress = (id: string) => {
    if (selectedItems.length !== 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
      setSelectedItems(prevSelected =>
        prevSelected.includes(id)
          ? prevSelected.filter(item => item !== id)
          : [...prevSelected, id]
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
            { backgroundColor: status_comanda === '1' ? '#00FF00' : '#FF0000' },
            { borderColor: status_comanda === '1' ? '#00FF00' : '#FF0000' }
          ]}
        />
        <View style={styles.viewNumero}>
          <Text style={styles.viewNumeroTexto}>{numero_comanda}</Text>
        </View>
        <View style={styles.viewInfo}>
          <Text style={styles.viewInfoNome}>{nome_comanda}</Text>
          <Text style={styles.viewInfoHora}>Hora de Abertura: {hora_abertura}</Text>
          <Text style={styles.viewInfoHora}>Aberta por: Leonardo</Text>
        </View>
      </View>

      <ScrollView>
        <View style={styles.itensComanda}>
        {itensComanda
        .filter(item => item.numero_comanda.toString() === numero_comanda)
        .map((item) => (
            <Pressable
              key={item.id}
              onLongPress={() => handleLongPress(item.id)}
              onPress={() => handlePress(item.id)}
            >
              <ItemComanda
                nomeItem={item.nome_item}
                valorUnit={item.valor_unit}
                valorTotal={item.valor_unit * item.quantidade}
                quantidade={item.quantidade}
                style={selectedItems.includes(item.id) ? styles.selectedItem : {}}
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
