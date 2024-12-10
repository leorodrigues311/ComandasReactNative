import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ViewStyle } from 'react-native';
import Dialog from "react-native-dialog";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

type IconName = 
  | "receipt-outline"
  | "receipt"
  | "print-outline"
  | "print"
  | "add-circle-outline"
  | "add-circle";

interface EstiloMutavel {
  style?: ViewStyle;
  hideIcons: boolean;
}

export function TopBarDetalheComanda({ style, hideIcons  }: EstiloMutavel) {
  const router = useRouter();
  const [tituloModal, setTituloModal] = useState('');
  const [conteudoModal, setConteudoModal] = useState('');

  const [iconeImpressora, setIconeImpressora] = useState<IconName>('print-outline');
  const [iconeComanda, setIconeComanda] = useState<IconName>('receipt-outline');
  const [iconeAdd, setIconeAdd] = useState<IconName>('add-circle-outline');

  const [dialogActionVisible, setDialogNovoProdutoVisible] = useState(false);

  const handleFeedbackAdd = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setIconeAdd('add-circle');
  };

  const handleFeedbackPrint = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    setIconeImpressora('print');
  };

  const handleFeedbackComanda = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    setIconeComanda('receipt');
  };

  const handleAddProduto = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setIconeAdd('add-circle-outline');
    setDialogNovoProdutoVisible(true);
    setTituloModal('Adicionar Produto');
    setConteudoModal('Deseja adicionar um novo produto à comanda?');
  };

  const handleImprimir = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setIconeImpressora('print-outline');
    setTituloModal('Imprimir');
    setConteudoModal('Deseja imprimir TODOS os itens?');
    setDialogNovoProdutoVisible(true);
  };

  const handleFinalizarComanda = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setIconeComanda('receipt-outline');
    setTituloModal('Finalizar');
    setConteudoModal('Deseja Fechar essa comanda?');
    setDialogNovoProdutoVisible(true);
  };

  const handleCancel = () => {
    setDialogNovoProdutoVisible(false);
  };

  const handleConfirm = () => {
    router.back();
  };

  return (
    <View style={[styles.viewPrincipal, style]}>

      <Dialog.Container visible={dialogActionVisible}>
        <Dialog.Title>{tituloModal}</Dialog.Title>
        <Dialog.Description>{conteudoModal}</Dialog.Description>
        <Dialog.Button onPress={handleCancel} label="Não" />
        <Dialog.Button onPress={handleConfirm} label="Sim" />
      </Dialog.Container>
    {!hideIcons && (
      <Pressable onPress={() => router.back()}>
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
  );
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
});
