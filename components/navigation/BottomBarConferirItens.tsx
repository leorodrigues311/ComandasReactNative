import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView
import * as Haptics from 'expo-haptics';

export function BottomBarConferirItens({ selectedItemsLength, limparSelecao }: { selectedItemsLength: number, limparSelecao: () => void }) {
  const screenHeight = Dimensions.get('window').height; // Altura total da tela
  const [isExpanded, setIsExpanded] = useState(false);
  const heightAnim = useState(new Animated.Value(60))[0]; // Animação para a altura

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
            <Text style={styles.textoViewExtra}>Detalhes da seleção ou outras informações</Text>
          </View>
        )}
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
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#363636',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoViewExtra: {
    color: 'white',
    fontSize: 16,
  },
});
