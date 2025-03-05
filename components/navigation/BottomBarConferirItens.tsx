import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Dialog from "react-native-dialog";
import { ItemConferenciaAdd } from '@/components/ItemConferenciaAdd';
import * as Haptics from 'expo-haptics';
import Toast from 'react-native-toast-message';
import { ComandaProvider, useComanda } from '@/app/context/comandaContext'

export function BottomBarConferirItens({ items, limparSelecao, removeItem }: { items: { id: number; itemNome: string; itemQtd: number }[], limparSelecao: () => void,  removeItem: (id: number) => void; }) {

  const router = useRouter();
  const { adicionarItens, itensComanda } = useComanda()

  const screenHeight = Dimensions.get('window').height;
  const [isExpanded, setIsExpanded] = useState(false);
  const heightAnim = useState(new Animated.Value(60))[0];

  const [dialogActionVisible, setDialogNovoProdutoVisible] = useState(false);

  const handleCancel = () => {
    setDialogNovoProdutoVisible(false);
  };

  const handleFeedbackButton = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  };

  const handleConfirmaInclusao = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setDialogNovoProdutoVisible(true);
  };

  const adicionaItensComanda = () => {
    setDialogNovoProdutoVisible(false);
    showSuccessMessage();
    setTimeout(() => {
      adicionarItens(
        { numeroComanda: 3, nomeItem: 'Feijão Tropeiro', valorUnit: 15.0, quantidade: 2 }
      );
      console.log(itensComanda)
      router.back();
    }, 1500);
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
        <Text style={styles.itensQtdCarrinho}>{items.length}</Text>
        <Ionicons style={styles.btnCarrinho} name="cart-outline" size={38} color="#00FF00" />
      </Pressable>

      {isExpanded && (
        <View style={styles.viewExtra}>
          {items.map(item => (
            <ItemConferenciaAdd key={item.id} id={item.id} itemNome={item.itemNome} itemQtd={item.itemQtd} onRemove={removeItem} />
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
    padding: 30,
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
    backgroundColor:'#02bf02',
    borderRadius:8
  },
  textoBtnIncluir:{
    color: 'white',
    fontSize: 28,
  },
  btnCarrinho:{}
});
