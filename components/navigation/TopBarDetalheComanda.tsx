import React, { useState } from 'react'
import { View, StyleSheet, Pressable, ViewStyle } from 'react-native'
import Dialog from "react-native-dialog"
import Ionicons from '@expo/vector-icons/Ionicons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import * as Haptics from 'expo-haptics'

// Aqui tivemos que criar um type, para mudar o estado de cada icone ao clicar
type IconName = 
  | "receipt-outline"
  | "receipt"
  | "print-outline"
  | "print"
  | "add-circle-outline"
  | "add-circle"

// Aqui criamos uma interface para mudar o estilo da topbar, ele remove os icones quando a bottomBar está visivel
// (isso acontece no documento 'comandaDetalhe')
interface EstiloMutavel {
  style?: ViewStyle
  hideIcons: boolean
}

export function TopBarDetalheComanda({ style, hideIcons  }: EstiloMutavel) {
  const router = useRouter()

  const { numeroComanda } = useLocalSearchParams<{ numeroComanda: string }>();

  // Aqui foi criado um estado para o conteudo dos 'dialog', pois temos vários botões, então cada um usa o 'dialog' com um conteudo diferente
  const [tituloModal, setTituloModal] = useState('')
  const [conteudoModal, setConteudoModal] = useState('')

  // Aqui ficam os estados normais dos icones, que são todos 'outline', é através dessas funções que trocamos o tipo do icone
  const [iconeImpressora, setIconeImpressora] = useState<IconName>('print-outline')
  const [iconeComanda, setIconeComanda] = useState<IconName>('receipt-outline')
  const [iconeAdd, setIconeAdd] = useState<IconName>('add-circle-outline')

  // Aqui nós exibimos o 'dialog'
  const [dialogActionVisible, setDialogNovoProdutoVisible] = useState(false)

  // Este é o feedback tátil do icone de ADD novo produto (acionado no OnPressIn)
  const handleFeedbackAdd = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setIconeAdd('add-circle')
  }

  // Este é o feedback tátil do icone de impressora (acionado no OnPressIn)
  const handleFeedbackPrint = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    setIconeImpressora('print')
  }

  // Este é o feedback tátil do icone de Finalizar comanda (acionado no OnPressIn)
  const handleFeedbackComanda = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    setIconeComanda('receipt')
  }

  // Esta é a ação real do botão de ADD, junto com o feedback tátil (acionado no OnPressOut)
  const handleAddProduto = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setIconeAdd('add-circle-outline')
    router.push({
      pathname: '/produtoAdicionarComanda',
      params: {numeroComanda: numeroComanda},
    })
  }
 
  // Esta é a ação real do botão de imprimir, junto com o feedback tátil (acionado no OnPressOut)
  const handleImprimir = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setIconeImpressora('print-outline')
    setTituloModal('Imprimir')
    setConteudoModal('Deseja imprimir TODOS os itens?')
    setDialogNovoProdutoVisible(true)
  }

  // Esta é a ação real do botão de finalizar a comanda, junto com o feedback tátil (acionado no OnPressOut)
  const handleFinalizarComanda = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setIconeComanda('receipt-outline')
    setTituloModal('Finalizar')
    setConteudoModal('Deseja Fechar essa comanda?')
    setDialogNovoProdutoVisible(true)
  }

  // Este cancela a ação do dialogo
  const handleCancel = () => {
    setDialogNovoProdutoVisible(false)
  }

  // Esta função executa a ação do dialogo ****** ainda em desenvolvimento ******
  const handleConfirm = (buttonType: string) => {
    setDialogNovoProdutoVisible(false)

    if (buttonType === 'adicionarItemComanda') {
      
    }

    else if (buttonType === 'finaliza'){
    }

  };





  return (
    <View style={[styles.viewPrincipal, style]}>

    {/*Este é o dialogo dos botões, o conteudo muda de acordo com cada botão*/}
      <Dialog.Container visible={dialogActionVisible}>
        <Dialog.Title>{tituloModal}</Dialog.Title>
        <Dialog.Description>{conteudoModal}</Dialog.Description>
        <Dialog.Button onPress={handleCancel} label="Não" />
        <Dialog.Button onPress={() => handleConfirm('adicionarItemComanda')} label="Sim" />
      </Dialog.Container>

    {/*O "hideIcons traz se o icone deve ser ocultado ou não, então se ele for false, ele exibe os icones*/}
    {!hideIcons && (
      <Pressable onPress={() => router.replace('/(tabs)')}>
        <Ionicons style={styles.viewBtnSair} name="arrow-back-outline" size={32} color="white" />
      </Pressable>
    )}

    {!hideIcons && (
      <View style={styles.viewOperacoesComanda}>
        <Pressable onPressIn={() => handleFeedbackComanda()} onPressOut={() => handleFinalizarComanda()}>
          <Ionicons style={styles.btnFinalizarComanda} name={iconeComanda} size={32} color="red" />
        </Pressable>

        <Pressable onPressIn={() => handleFeedbackPrint()} onPressOut={() => handleImprimir()}>
          <Ionicons style={styles.btnImprimir} name={iconeImpressora} size={32} color="white" />
        </Pressable>

        <Pressable onPressIn={() => handleFeedbackAdd()} onPressOut={() => handleAddProduto()}>
          <Ionicons style={styles.btnAdicionarItens} name={iconeAdd} size={32} color="#00FF00" />
        </Pressable>
      </View>
      )}

    </View>  
  )
}

const styles = StyleSheet.create({
  viewPrincipal: {
    height: 60,
    bottom: 0,
    top: 0,
    right: 0,
    backgroundColor: '#151718',
    borderBottomColor: '#363636',
    borderBottomWidth: 0.2,
    flexDirection: 'row',
    zIndex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
  },

  viewBtnSair: {
    left: 10,
    flexDirection: 'row',
  },

  viewOperacoesComanda: {
    top: '50%',
    width: '50%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  btnFinalizarComanda: {},

  btnImprimir: {},

  btnAdicionarItens: {},
})