import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';
import Dialog from "react-native-dialog"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics'

type IconName = 
  | "trash-outline"
  | "trash"
  | "print-outline"
  | "print"
  | "arrow-down-outline"
  | "arrow-down"


export function BottomBarDetalheComanda(){

  const router = useRouter();

  const [tituloModal, setTituloModal] = useState('');
  const [conteudoModal, setConteudoModal] = useState('');

  const [iconeImpressora, setIconeImpressora] = useState<IconName>('print-outline');
  const [iconeLixo, setIconeLixo] = useState<IconName>('trash-outline');
  const [iconeFecharBottomBar, setIconeFecharBottomBar] = useState<IconName>('arrow-down-outline');

  const [dialogActionVisible, setDialogNovoProdutoVisible] = useState(false)

  const handleFeedbackFecharBottomBar = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setIconeFecharBottomBar('arrow-down');
  }

  const handleFeedbackPrint = () => {
    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Warning
    )
    setIconeImpressora('print');
  }

  const handleFeedbackExcluirProduto = () => {
    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Error
    )
    setIconeLixo('trash');
  }

  const handleFecharBottomBar = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setIconeFecharBottomBar('arrow-down-outline');
  }

  const handleImprimir = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setIconeImpressora('print-outline');
    setTituloModal('Imprimir')
    setConteudoModal('Deseja imprimir os itens selecionados?')
    setDialogNovoProdutoVisible(true);
  }

  const handleExcluirProduto = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setIconeLixo('trash-outline');
    setTituloModal('Excluir')
    setConteudoModal('Deseja excluir os itens selecionados?')
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

          <Text style={styles.viewBtnSair}>1</Text>


          <View style={styles.viewOperacoesComanda}>
            <Pressable onPressIn={() => handleFeedbackExcluirProduto()} onPressOut={() => handleExcluirProduto()}>
              <Ionicons style={styles.btnExcluirProduto} name={iconeLixo} size={32} color="red" ></Ionicons>
            </Pressable>

            <Pressable onPressIn={() => handleFeedbackPrint()} onPressOut={() => handleImprimir()}>
              <Ionicons style={styles.btnImprimir} name={iconeImpressora} size={32} color="white" />
            </Pressable>

            <Pressable onPressIn={() => handleFeedbackFecharBottomBar()} onPressOut={() => handleFecharBottomBar()}>
              <Ionicons style={styles.btnFecharBottomBar} name={iconeFecharBottomBar} size={32} color="white" ></Ionicons>
            </Pressable>
          </View>
    
        </View>  
    );

}


const styles = StyleSheet.create({

  viewPrincipal: {
    height:60,
    bottom: 0,
    width:'100%',
    backgroundColor:'#151718',
    borderBottomColor:'#363636',
    borderBottomWidth: 0.2,
    flexDirection: 'row',
    zIndex:1,
    justifyContent: 'space-between',
    alignItems: 'center',
    position:'absolute',
    padding: 15,
    marginBottom:10,
  },


  viewOperacoesComanda:{
    top:'50%',
    width:'50%',
    height:40,
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:20
  },

  viewBtnSair:{
    left:10,
    flexDirection: 'row',
    color:'white',
    fontSize:25

  },

  
  btnExcluirProduto:{

  },

  btnImprimir:{

  },

  btnFecharBottomBar:{

  }


});
