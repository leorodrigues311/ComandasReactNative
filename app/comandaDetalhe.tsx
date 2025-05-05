import React, { useState, useEffect, useCallback  } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { StyleSheet, Text, View, Pressable, ScrollView, Animated, ActivityIndicator } from 'react-native'
import { ItemComanda } from '@/components/ItemComanda'
import { TopBarDetalheComanda } from '@/components/navigation/TopBarDetalheComanda'
import { BottomBarDetalheComanda } from '@/components/navigation/BottomBarDetalheComanda'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import * as Haptics from 'expo-haptics'
import { ComandaProvider, useComanda } from '@/app/context/comandaContext'
import dayjs from 'dayjs'

export default function ComandaDetalhe () {

  const router = useRouter()
  const { itensComanda, selectedItems, comandaSelecionada, taxValue, taxState, tipoTaxa, carregaItens, carregaComandas, recarregaComanda,  formataValor, toggleLongPressItens, limparSelecao, setTaxState, formataTaxa} = useComanda()
  const [comandaFinalizada, setComandaFinalizada] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true)
      await carregaItens()
      setLoading(false)
      recarregaComanda(comandaSelecionada?.comanda_uuid||'')
    }
  
    if (comandaSelecionada) {
      carregarDados()
    }
  }, [])

  const handleLongPress = (item_uuid: string) => {
    if (selectedItems?.length === 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    }
    toggleLongPressItens(item_uuid)
  }

  const handlePress = (item_uuid: string) => {
    if (selectedItems?.length !== 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
      toggleLongPressItens(item_uuid)
    }
  }

  const handlePagar = () => {
    router.push('./pagamento')
  }

  const isBottomBarVisible = (selectedItems || []).length > 0

  useEffect(() => {
    if (comandaSelecionada?.status_comanda === '4') {
      setComandaFinalizada(true)
    } else {
      setComandaFinalizada(false)
    }
  }, [comandaSelecionada?.status_comanda])

  if (loading) {
    return (
      <SafeAreaView style={[styles.viewPrincipal, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="white" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.viewPrincipal}>
      <TopBarDetalheComanda hideIcons={isBottomBarVisible} />

      <View style={styles.viewInfoComanda}>
        <View style={[
            styles.viewStatus, 
            { backgroundColor: comandaSelecionada?.status_comanda === '1' ? '#06d691' : (comandaSelecionada?.status_comanda === '2' ?'#e11d48' :'#383737') },
            { borderColor: comandaSelecionada?.status_comanda === '1' ? '#06d691' : (comandaSelecionada?.status_comanda === '2' ?'#e11d48' :'#383737') }
          ]}
        />
        <View style={styles.viewNumero}>
          <Text style={styles.viewNumeroTexto}  
            numberOfLines={1}
            adjustsFontSizeToFit>{comandaSelecionada?.numero_comanda || ''}
          </Text>
        </View>
        <View style={styles.viewInfo}>
          <Text style={[styles.viewInfoNome,
             {color: comandaSelecionada?.status_comanda === '4' ? 'gray' : 'white' }]}
              numberOfLines={1}>
              {comandaSelecionada?.nome_comanda || ''}
          </Text>
          
          <Text style={[styles.viewInfoHora,
            {color: comandaSelecionada?.status_comanda === '4' ? 'gray' : 'white' }]}>
            Abertura: {comandaSelecionada?.hora_abertura ? dayjs(comandaSelecionada.hora_abertura).format('DD/MM/YYYY HH:mm') : ''}
          </Text>
          <Text style={[styles.viewInfoHora,
            {color: comandaSelecionada?.status_comanda === '4' ? 'gray' : 'white' }]}>
            Aberta por: {comandaSelecionada?.usuario_responsavel}</Text>
        </View>
      </View>

      <ScrollView>
        <View style={styles.itensComanda}>
          {itensComanda
            .filter(item => item.comanda_uuid.toString() === comandaSelecionada?.comanda_uuid)
            .map((item) => (
              <Pressable
                key={item.item_uuid}
                onLongPress={() => {comandaSelecionada?.status_comanda === '1' ? handleLongPress(item.item_uuid ? item.item_uuid : '') : ''}}
                onPress={() => {comandaSelecionada?.status_comanda === '1' ? handlePress(item.item_uuid ? item.item_uuid : '') : ''}}
              >
                <ItemComanda
                  nomeItem={item.item_nome}
                  valorUnit={formataValor(item.valor_unit)}
                  valorTotal={formataValor(item.valor_unit * item.quantidade)}
                  quantidade={item.quantidade}
                  style={selectedItems?.includes(item.item_uuid || '') ? styles.selectedItem : {}}
                />
              </Pressable>
            ))}
        </View>
      </ScrollView>

      {(!isBottomBarVisible) && 
        <View style={styles.viewValorTotal}>
          <Text style={styles.textValorTotal}>Valor Total:</Text>
          <Text style={styles.textValorTotalNumero}>{
            comandaSelecionada?.status_comanda === '4' && taxState ?
            formataTaxa(comandaSelecionada?.valor_total||0, taxValue, tipoTaxa, true, false)
            :
            formataValor(comandaSelecionada?.valor_total||0)
          }</Text>
        </View>
      }

      {comandaFinalizada && !isBottomBarVisible && (
        <View style={styles.viewBtnPagar}>
          <Pressable 
            style={styles.btnTaxaServico} 
            onPress={() => setTaxState(!taxState)}
          >
            <View style={[styles.checkBtnTaxaServico, { backgroundColor: taxState ? '#04c78a' : 'transparent' }]}  />
            <Text style={{ color: '#fff' }}>
              {tipoTaxa === false 
              ?
             `Taxa de serviço (${taxValue}%) - ${formataTaxa(comandaSelecionada?.valor_total||0, taxValue, tipoTaxa, false, false)} ` 
             :
              `Taxa de serviço - R$ ${taxValue}`}</Text>
          </Pressable>

          <Pressable 
            style={[styles.btnPagar]} 
            onPress={() => handlePagar()}
          >
            <Text style={styles.textoBtnPagar}>Pagar</Text>
          </Pressable>

        </View>
      )}

      {isBottomBarVisible && 
        <BottomBarDetalheComanda 
          selectedItemsLength={(selectedItems || []).length} 
          limparSelecao={limparSelecao} 
        />
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  viewPrincipal: {
    margin: 12,
    marginTop: 0,
    marginBottom: 16,
    backgroundColor: 'black',
    flexDirection: 'column',
    flex: 1,
    borderRadius: 5
  },
  viewInfoComanda: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1C',
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
    margin: 3,
    flex:1
  },
  viewInfoNome: {
    marginLeft: 10,
    marginTop: 5,
    color: 'white',
    fontSize: 25,
    maxHeight:30,
    flex:1
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
    marginBottom:10,
    margin: 5,
    backgroundColor: '#696969',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: 60,
    flexDirection: 'column',
    borderRadius: 5,
    borderColor:'#A9A9A9',
    borderWidth: 0.6
  },
  btnTaxaServico: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10 
  },
  checkBtnTaxaServico: {
    height: 20,
    width: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#fff',
    marginRight: 10
  },
  viewBtnPagar: {
    marginHorizontal:0,
    marginBottom:'10%',
    position:'absolute'
  },
  btnPagar: {
    backgroundColor: '#04c78a',
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 5,
  },
  textoBtnPagar: {
    color: 'white',
    fontSize: 18,
  },
  viewValorTotal:{
    backgroundColor:'#363636',
    width:'100%',
    height:'8%',
    bottom:0,
    borderRadius:5,
    flexDirection:'row',
    justifyContent:'space-between',
    position:'absolute',
    marginBottom:10,
  },
  textValorTotal:{
    color:'white',
    fontSize:26,
    marginTop:15,
    marginLeft:15,
    fontWeight:'bold'
  },
  textValorTotalNumero:{
    color:'#04c78a',
    fontSize:26,
    marginTop:15,
    marginRight:15,
    fontWeight:'bold'
  }
})
