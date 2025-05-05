import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';
import Dialog from "react-native-dialog"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics'
import { useComanda } from '@/app/context/comandaContext';


// Aqui tivemos que criar um type, para mudar o estado de cada icone ao clicar
type IconName = 
  | "trash-outline"
  | "trash"
  | "print-outline"
  | "print"
  | "arrow-down-outline"
  | "arrow-down"


export function BottomBarDetalheComanda({ selectedItemsLength, limparSelecao }: { selectedItemsLength: number, limparSelecao: () => void }) {

  const router = useRouter()

  const {selectedItems, itensComanda,comandaSelecionada, removerItens, carregaItens, carregaComandas} = useComanda();


  // Aqui foi criado um estado para o conteudo dos 'dialog', pois temos vários botões, então cada um usa o 'dialog' com um conteudo diferente
  const [tituloModal, setTituloModal] = useState('')
  const [conteudoModal, setConteudoModal] = useState('')

  // Aqui ficam os estados normais dos icones, que são todos 'outline', é através dessas funções que trocamos o tipo do icone
  const [iconeImpressora, setIconeImpressora] = useState<IconName>('print-outline')
  const [iconeLixo, setIconeLixo] = useState<IconName>('trash-outline')
  const [iconeFecharBottomBar, setIconeFecharBottomBar] = useState<IconName>('arrow-down-outline')

  // Aqui nós exibimos o 'dialog'
  const [dialogActionVisible, setDialogBottomBarVisible] = useState(false)

  // Este é o feedback tátil do icone de fechar a bottomBar (acionado no OnPressIn)
  const handleFeedbackFecharBottomBar = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
    setIconeFecharBottomBar('arrow-down')
  }

  // Este é o feedback tátil do icone de impressora (acionado no OnPressIn)
  const handleFeedbackPrint = () => {
    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Warning
    )
    setIconeImpressora('print')
  }

  // Este é o feedback tátil do icone de excluir o produto (acionado no OnPressIn)
  const handleFeedbackExcluirProduto = () => {
    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Error
    )
    setIconeLixo('trash')
  }

  // Aqui nós fechamos a bottomBar e removemos os itens que estão no array de seleção (acionado no OnPressOut)
  const handleFecharBottomBar = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
    setIconeFecharBottomBar('arrow-down-outline')
    limparSelecao()
  }

  // Aqui fica a função real do botão de imprimir (acionado no OnPressOut)
  const handleImprimir = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
    setIconeImpressora('print-outline')
    setTituloModal('Imprimir')
    setConteudoModal('Deseja imprimir os itens selecionados?')
    setDialogBottomBarVisible(true)
  }

  // Aqui fica a função real do botão de Excluir produto (acionado no OnPressOut)
  const handleExcluirProduto = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setIconeLixo('trash-outline')
    setTituloModal('Excluir')
    setConteudoModal('Deseja excluir os itens selecionados?')
    setDialogBottomBarVisible(true)
    
  }

  // Este cancela a ação do dialogo
  const handleCancel = () => {
    setDialogBottomBarVisible(false)
  }

  // Esta função executa a ação do dialogo ****** ainda em desenvolvimento ******
  const handleConfirm = () => {
    try{
      const itensParaRemover = itensComanda.filter(item =>
        selectedItems?.includes(item.item_uuid??'')
      );
      removerItens(itensParaRemover);
      carregaItens()
      carregaComandas()

    } catch{
      console.log('Erro ao excluir produtos da comanda')
    }
  
    setDialogBottomBarVisible(false)
    limparSelecao()
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    carregaItens()
  };

    return (
        <View style={styles.viewPrincipal}>

        {/*Este é o dialogo dos botões, o conteudo muda de acordo com cada botão*/}
          <Dialog.Container 
          visible={dialogActionVisible}
          contentStyle={{ backgroundColor: '#1e1e1e' }}>
            <Dialog.Title>{tituloModal}</Dialog.Title>
            <Dialog.Description>
              {conteudoModal}
            </Dialog.Description>
            <Dialog.Button onPress={handleCancel} label="Não" />
            <Dialog.Button onPress={handleConfirm} label="Sim" />
          </Dialog.Container>

          <Text style={styles.viewBtnSair}>{selectedItemsLength}</Text>


          <View style={styles.viewOperacoesComanda}>
            <Pressable onPressIn={() => handleFeedbackExcluirProduto()} onPressOut={() => handleExcluirProduto()}>
              <Ionicons style={styles.btnExcluirProduto} name={iconeLixo} size={32} color="red" ></Ionicons>
            </Pressable>

            <Pressable disabled={true} onPressIn={() => handleFeedbackPrint()} onPressOut={() => handleImprimir()}>
              <Ionicons style={styles.btnImprimir} name={iconeImpressora} size={32} color="#454444" />
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
