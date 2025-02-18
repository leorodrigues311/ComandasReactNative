import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView
import { useRouter } from 'expo-router'
import Dialog from "react-native-dialog"
import { ItemConferenciaAdd } from '@/components/ItemConferenciaAdd'
import * as Haptics from 'expo-haptics';
import Toast from 'react-native-toast-message';

export function BottomBarConferirItens({ selectedItemsLength, limparSelecao }: { selectedItemsLength: number, limparSelecao: () => void }) {

  const router = useRouter()
  const screenHeight = Dimensions.get('window').height; // Altura total da tela
  const [isExpanded, setIsExpanded] = useState(false);
  const heightAnim = useState(new Animated.Value(60))[0]; // Animação para a altura

  // Aqui nós exibimos o 'dialog'
  const [dialogActionVisible, setDialogNovoProdutoVisible] = useState(false)

  // Este cancela a ação do dialogo
  const handleCancel = () => {
    setDialogNovoProdutoVisible(false)
  }

  const handleFeedbackButton = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  }

  const handleConfirmaInclusao = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setDialogNovoProdutoVisible(true)
  }

  const adicionaItensComanda = () => {
    setDialogNovoProdutoVisible(false)
    showSuccessMessage()
    setTimeout(() => {
      router.back()
    }, 2500)


  }

  const handleToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);

    if (isExpanded) {
      // Recolher
      Animated.timing(heightAnim, {
        toValue: 60, // Altura original da BottomBar
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      // Expandir para a altura total da tela
      Animated.timing(heightAnim, {
        toValue: (screenHeight - 60), // Altura da tela
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

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
        {/* Conteúdo principal da BottomBar */}
        <Pressable onPress={handleToggle} style={styles.viewOperacoesComanda}>
          <Text style={styles.itensQtdCarrinho}>{selectedItemsLength}</Text>
          <Ionicons style={styles.btnCarrinho} name="cart-outline" size={38} color="#00FF00" />
        </Pressable>

        {/* View extra que aparece ao expandir */}
        {isExpanded && (
          <View style={styles.viewExtra}>
            <ItemConferenciaAdd/>
            <ItemConferenciaAdd/>
            <ItemConferenciaAdd/>
            <ItemConferenciaAdd/>
            <ItemConferenciaAdd/>
            <ItemConferenciaAdd/>
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
          <Dialog.Button onPress={() => adicionaItensComanda()} label="Sim" />
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

  btnCarrinho: {},

  viewExtra: {
    backgroundColor: '#202122',
    flex: 1, // Preenche o restante do espaço disponível
    padding: 30,
    borderTopWidth: 1,
    borderTopColor: '#363636',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  textoViewExtra: {
    color: 'white',
    fontSize: 16,
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

  }
});
