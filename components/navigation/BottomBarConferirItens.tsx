import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';
import Dialog from "react-native-dialog"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics'

// Aqui tivemos que criar um type, para mudar o estado de cada icone ao clicar
type IconName = 
  | "cart-outline"
  | "cart"

export function BottomBarConferirItens({ selectedItemsLength, limparSelecao }: { selectedItemsLength: number, limparSelecao: () => void }) {

  const router = useRouter()

  // Aqui ficam os estados normais dos icones, que são todos 'outline', é através dessas funções que trocamos o tipo do icone
  const [iconeCarrinho, seticoneCarrinho] = useState<IconName>('cart-outline')

  // Este é o feedback tátil do icone de fechar a bottomBar (acionado no OnPressIn)
  const handleFeedbackFecharBottomBar = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
    seticoneCarrinho('cart')
  }


  // Aqui nós fechamos a bottomBar e removemos os itens que estão no array de seleção (acionado no OnPressOut)
  const handleFecharBottomBar = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
    limparSelecao()
  }


    return (
        <View style={styles.viewPrincipal}>

          

          <View style={styles.viewOperacoesComanda}>

            <Text style={styles.itensQtdCarrinho}>{selectedItemsLength}</Text>
            <Pressable onPressIn={() => handleFeedbackFecharBottomBar()} onPressOut={() => handleFecharBottomBar()}>
              <Ionicons style={styles.btnCarrinho} name={iconeCarrinho} size={36} color="#00FF00" />
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
    width:'100%',
    height:40,
    flexDirection:'row',
    justifyContent:'center',
    marginBottom:20
  },

  itensQtdCarrinho:{
    paddingRight:10,
    flexDirection: 'row',
    color:'white',
    fontSize:18
  },

  
  btnExcluirProduto:{

  },

  btnCarrinho:{

  },

  btnFecharBottomBar:{

  }


});
