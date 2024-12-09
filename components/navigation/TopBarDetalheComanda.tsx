import React, { useState } from 'react';
import { View, StyleSheet, Pressable} from 'react-native';
import Dialog from "react-native-dialog"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics'


export function TopBarDetalheComanda(){

  const router = useRouter();
  const [tituloModal, setTituloModal] = useState('');
  const [conteudoModal, setConteudoModal] = useState('');

  const [dialogActionVisible, setDialogNovoProdutoVisible] = useState(false)

  const handleFeedbackButton = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  }

  const handleAddProduto = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setDialogNovoProdutoVisible(true);
    setTituloModal('Adicionar Produto')
    setConteudoModal('Deseja adicionar um novo produto à comanda?')
  }

  const handleImprimir = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setTituloModal('Imprimir')
    setConteudoModal('Deseja imprimir TODOS os itens?')
    setDialogNovoProdutoVisible(true);
  }

  const handleFinalizarComanda = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setTituloModal('Finalizar')
    setConteudoModal('Deseja Fechar essa comanda?')
    setDialogNovoProdutoVisible(true);
    
  }

  const handleCancel = () => {
    setDialogNovoProdutoVisible(false);
  };

  const handleConfirm = () => {
    router.back()
  };


    return (
        <View style={styles.viewPrincipal}>

          <Dialog.Container visible={dialogActionVisible}>
            <Dialog.Title>{tituloModal}</Dialog.Title>
            <Dialog.Description>
              {conteudoModal}
            </Dialog.Description>
            <Dialog.Button onPress={handleCancel} label="Não" />
            <Dialog.Button onPress={handleConfirm} label="Sim" />
          </Dialog.Container>


          <Pressable onPress={() => router.back()}>
            <Ionicons style={styles.viewBtnSair} name="arrow-back-outline" size={32} color="white" />
          </Pressable>

          <View style={styles.viewOperacoesComanda}>

            <Pressable onPressIn={() => handleFeedbackButton()} onPressOut={() => handleFinalizarComanda()}>
              <Ionicons style={styles.btnFinalizarComanda} name="receipt-outline" size={32} color="red" ></Ionicons>
            </Pressable>

            <Pressable onPressIn={() => handleFeedbackButton()} onPressOut={() => handleImprimir()}>
              <Ionicons style={styles.btnImprimir} name="print-outline" size={32} color="white" />
            </Pressable>

            <Pressable onPressIn={() => handleFeedbackButton()} onPressOut={() => handleAddProduto()}>
              <Ionicons style={styles.btnAdicionarItens} name="add-circle-outline" size={32} color="#00FF00" ></Ionicons>
            </Pressable>

          </View>
    
        </View>  
    );

}


const styles = StyleSheet.create({

  viewPrincipal: {
    height:60,
    bottom: 0,
    top: 0,
    right: 0,
    backgroundColor:'#151718',
    borderBottomColor:'#363636',
    borderBottomWidth: 0.2,
    flexDirection: 'row',
    zIndex:1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom:10
  },

  viewBtnSair:{
    left:10,
    flexDirection: 'row',

  },

  viewOperacoesComanda:{
    top:'50%',
    width:'50%',
    height:40,
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:20
  },

  
  btnFinalizarComanda:{

  },

  btnImprimir:{

  },

  btnAdicionarItens:{

  }


});
