import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Dialog from "react-native-dialog";
import { ItemConferenciaAdd } from '@/components/ItemConferenciaAdd';
import * as Haptics from 'expo-haptics';
import Toast from 'react-native-toast-message';
import { ComandaProvider, useComanda } from '@/app/context/comandaContext'

export function BottomBarConferirItens() {

  const router = useRouter();
  
  const {itensCarrinho, comandaSelecionada, removerItemCarrinho, adicionarItens, limpaCarrinho, mudaQuantidade, carregaComandas } = useComanda()

  useEffect(() => {
    comandaSelecionada;
  }, [comandaSelecionada])

  const screenHeight = Dimensions.get('window').height
  const [isExpanded, setIsExpanded] = useState(false)
  const heightAnim = useState(new Animated.Value(60))[0]

  const [dialogActionVisible, setDialogNovoProdutoVisible] = useState(false)

  const handleCancel = () => {
    setDialogNovoProdutoVisible(false)
  }

  const handleFeedbackButton = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
  }

  const handleConfirmaInclusao = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
    setDialogNovoProdutoVisible(true)
  }

  const adicionaItensComanda = () => {
    setDialogNovoProdutoVisible(false);
    showSuccessMessage();
    itensCarrinho.map( (item) => {
      adicionarItens({
        item_uuid: item.item_uuid || '',
        item_id: item.item_id,
        comanda_uuid: comandaSelecionada?.comanda_uuid ?? '',
        comanda_id:comandaSelecionada?.comanda_id ?? 0,
        item_nome: item.item_nome,
        valor_unit: item.valor_unit,
        quantidade: (item.quantidade == 0 ? 1 : item.quantidade),
        item_status: true,
        hora_inclusao: item.hora_inclusao
      })
    })
    carregaComandas()
    setTimeout(() => {
      router.back();
    }, 1500);
    limpaCarrinho()
 
  };

  const handleToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);

    Animated.timing(heightAnim, {
      toValue: isExpanded ? 60 : screenHeight - 60,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setIsExpanded(!isExpanded);
  };

  const showSuccessMessage = () => {
    Toast.show({
      type: 'success',
      text1: 'Feito!',
      text2: 'Os itens Foram Adicionados à Comanda',
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  return (
    <Animated.View style={[styles.viewPrincipal, { height: heightAnim }]}>
      <Pressable onPress={handleToggle} style={styles.viewOperacoesComanda}>
        <Text style={styles.itensQtdCarrinho}>{itensCarrinho.length}</Text>
        <Ionicons style={styles.btnCarrinho} name="cart-outline" size={38} color="#04c78a" />
      </Pressable>

      {isExpanded && (
        <View style={styles.viewExtra}>
          {itensCarrinho.map(item => (
            <ItemConferenciaAdd
             key={item.item_uuid}
             id={item.item_uuid || ''}
             item_nome={item.item_nome}
             quantidade={item.quantidade} 
             onRemove={removerItemCarrinho}
             onIncrement={mudaQuantidade}
             onDecrement={mudaQuantidade} />
          ))}
        </View>
      )}

      <Pressable onPressIn={handleFeedbackButton} onPressOut={handleConfirmaInclusao} style={styles.btnIncluir}>
        <Text style={styles.textoBtnIncluir}>Incluir</Text>
        <Ionicons name="checkmark-circle-outline" size={38} color="white"/>
      </Pressable>

      <Dialog.Container visible={dialogActionVisible}>
        <Dialog.Title>Adicionar Itens</Dialog.Title>
        <Dialog.Description>Deseja Realmente Adicionar os itens à Comanda?</Dialog.Description>
        <Dialog.Button onPress={handleCancel} label="Não" />
        <Dialog.Button onPress={adicionaItensComanda} label="Sim" />
      </Dialog.Container>

      <Toast />
    </Animated.View>
  );
}


const styles = StyleSheet.create({
  viewPrincipal: {
    bottom: 15,
    width: '100%',
    backgroundColor: '#151718',
    borderTopColor: '#363636',
    borderTopWidth: 0.2,
    zIndex: 1,
    position: 'absolute',
    overflow: 'hidden',
  },
  viewOperacoesComanda: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    zIndex:1
  },
  itensQtdCarrinho: {
    paddingRight: 55,
    paddingBottom:20,
    color: 'white',
    fontSize: 18,
    position:'absolute',
  },
  viewExtra: {
    backgroundColor: '#202122',
    flex: 1,
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#363636',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  btnIncluir:{
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    zIndex:1,
    backgroundColor:'#04c78a',
    borderRadius:8
  },
  textoBtnIncluir:{
    color: 'white',
    fontSize: 28,
  },
  btnCarrinho:{}
});
