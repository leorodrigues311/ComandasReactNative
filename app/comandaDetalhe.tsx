import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable, ScrollView, Vibration } from 'react-native'
import { ItemComanda } from '@/components/ItemComanda'
import { TopBarDetalheComanda } from '@/components/navigation/TopBarDetalheComanda'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ValorTotalComanda } from '@/components/valorTotalComanda'
import { useLocalSearchParams, useRouter } from 'expo-router'
import * as Haptics from 'expo-haptics';

type ComandaDetalheParams = {
  nomeComanda: string
  numeroComanda: number
  horaAbertura: string
  statusComanda: string
}

export default function ComandaDetalhe () {

  const { nomeComanda, numeroComanda, horaAbertura, statusComanda } = useLocalSearchParams<ComandaDetalheParams>()
  const router = useRouter()

  const itensComanda = [   
    { numeroComanda: 1, nomeItem: 'Teste grelhado', valorUnit: 12.21, quantidade: 3 },
    { numeroComanda: 2, nomeItem: 'Pao com pao', valorUnit: 12.21, quantidade: 3 },
    { numeroComanda: 3, nomeItem: 'Sopa de macaco', valorUnit: 12.21, quantidade: 3 },
    { numeroComanda: 4, nomeItem: 'Copo de Guaravita', valorUnit: 12.21, quantidade: 3 },
    { numeroComanda: 5, nomeItem: 'Pé de frango', valorUnit: 12.21, quantidade: 3 },
    { numeroComanda: 6, nomeItem: 'Osso assado', valorUnit: 12.21, quantidade: 3 },
    { numeroComanda: 7, nomeItem: 'Goiabada', valorUnit: 12.21, quantidade: 3 },
    { numeroComanda: 8, nomeItem: 'Pé de moleque', valorUnit: 12.21, quantidade: 3 },
    { numeroComanda: 9, nomeItem: 'Cuscuz', valorUnit: 12.21, quantidade: 3 }
  ]

  const [selectedItems, setSelectedItems] = useState<number[]>([])  // Lista de itens selecionados
  const [isSelectingMultiple, setIsSelectingMultiple] = useState(false) // Controle de seleção múltipla

  const handleLongPress = (numeroComanda: number) => {
    // A primeira vez que um item é pressionado por longo tempo
    if (selectedItems.length === 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
      setIsSelectingMultiple(true)  // Ativa o modo de seleção múltipla
    }

    // Se o item já está selecionado, remove da lista, caso contrário, adiciona
    setSelectedItems(prevSelected => 
      prevSelected.includes(numeroComanda)
        ? prevSelected.filter(item => item !== numeroComanda) // Remover item
        : [...prevSelected, numeroComanda] // Adicionar item
    )
  }

  const handlePress = (numeroComanda: number) => {
    // Quando mais de um item é selecionado, usamos o onPress
    if (selectedItems.length !== 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
      setSelectedItems(prevSelected => 
        prevSelected.includes(numeroComanda)
          ? prevSelected.filter(item => item !== numeroComanda) // Remover item
          : [...prevSelected, numeroComanda] // Adicionar item
      )
    }
  }


  return (
    <SafeAreaView style={styles.viewPrincipal}>
      <TopBarDetalheComanda/>

      <View style={styles.viewInfoComanda}>
        <View style={[styles.viewStatus, 
          { backgroundColor: statusComanda === 'ativo' ? '#00FF00' : '#FF0000' },
          { borderColor: statusComanda === 'ativo' ? '#00FF00' : '#FF0000' }
        ]}></View>

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
              onPress={() => handlePress(item.numeroComanda)} // Usa o onPress após o primeiro item
            >
              <ItemComanda
                nomeItem={item.nomeItem}
                valorUnit={item.valorUnit}
                valorTotal={50.00}
                quantidade={item.quantidade}
                style={selectedItems.includes(item.numeroComanda) ? styles.selectedItem : {}}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <ValorTotalComanda valorTotal={134.21}/>
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
    backgroundColor: '#00FF00',
    borderWidth: 0.2,
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: '#00FF00',
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
    gap: 6,
    color: 'white',
    fontSize: 50
  },

  viewInfo: {
    alignItems: 'flex-start',
    margin: 3,
  },

  viewInfoNome: {
    alignItems: 'center',
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
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#696969',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: 60,
    flexDirection: 'column',
    borderRadius: 5,
    borderColor:'#A9A9A9',
    borderWidth:0.6
  },
});
