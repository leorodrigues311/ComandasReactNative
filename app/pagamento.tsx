import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Animated,
  Easing,
} from 'react-native';
import Dialog from 'react-native-dialog';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useComanda } from '@/app/context/comandaContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Pagamento() {
  const router = useRouter();
  const { selectedItems, itensComanda, comandaSelecionada, removerItens, carregaItens, finalizaComanda } = useComanda();

  const [dialogActionVisible, setDialogPagamentoVisible] = useState(false);
  const [formaSelecionada, setFormaSelecionada] = useState('');
  const [showCheck, setShowCheck] = useState(false);

  const scaleAnim = useState(new Animated.Value(0))[0];
  const opacityAnim = useState(new Animated.Value(0))[0];

  const formasPagamento = [
    'Dinheiro',
    'Cartão de Crédito',
    'Cartão de Débito',
    'Pix',
    'Vale Refeição',
  ];

  const handleSelecionarForma = (forma: string) => {
    setFormaSelecionada(forma);
  };

  const handleCancel = () => {
    setDialogPagamentoVisible(false);
  };

  const exibirAnimacaoPagamento = () => {
    setShowCheck(true);

    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setShowCheck(false);
          router.push('/(tabs)')
        });
      }, 2000);
    });
  };

  const handleFinalizaComanda = () => {
    finalizaComanda(comandaSelecionada?.comanda_uuid ?? '')
    setDialogPagamentoVisible(false);
    exibirAnimacaoPagamento();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const renderItem = ({ item }: { item: string }) => (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        handleSelecionarForma(item);
        setDialogPagamentoVisible(true);
      }}
      style={({ pressed }) => [
        styles.botao,
        pressed && styles.botaoPressionado,
      ]}
    >
      <Text style={styles.textoBotao}>{item}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.viewPrincipal}>
        <Pressable style={styles.btnVoltar} onPress={() => {router.back()}}>
            <Ionicons name="arrow-back-outline" size={30} color="white" />
        </Pressable>
        <View style={styles.viewValor}>
          <Text style={styles.viewTotalAPagar}>Total a Pagar</Text>
          <Text style={styles.viewValorTotal}>R$ 136,28</Text>
        </View>

        <View style={styles.viewBtnFormaPagamento}>
          <FlatList
            data={formasPagamento}
            keyExtractor={(item, index) => `${item}_${index}`}
            renderItem={renderItem}
            contentContainerStyle={styles.lista}
            numColumns={3}
          />
        </View>

        <Dialog.Container visible={dialogActionVisible}>
          <Dialog.Title>Pagar</Dialog.Title>
          <Dialog.Description>
            Deseja pagar com {formaSelecionada}?
          </Dialog.Description>
          <Dialog.Button onPress={handleCancel} label="Não" />
          <Dialog.Button onPress={handleFinalizaComanda} label="Sim" />
        </Dialog.Container>

        {showCheck && (
          <Animated.View
            style={[
              styles.animatedCheck,
              {
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
              },
            ]}
          >
            <Ionicons name="checkmark-circle" size={120} color="#06d691" />
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewPrincipal: {
    flex: 1,
    backgroundColor: '#121212',
  },

  viewValor: {
    alignItems: 'center',
    marginTop: 30,
  },

  viewTotalAPagar: {
    color: 'white',
    fontSize: 22,
  },

  viewValorTotal: {
    color: '#06d691',
    fontSize: 36,
    fontWeight: '500',
  },

  viewBtnFormaPagamento: {
    marginTop: 60,
    alignItems: 'center',
  },

  lista: {
    paddingBottom: 20,
  },

  botao: {
    width: 100,
    height: 100,
    backgroundColor: '#383737',
    margin: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoBotao: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  botaoPressionado: {
    backgroundColor: '#2e2e2e',
    transform: [{ scale: 0.97 }],
  },

  animatedCheck: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -60,
    marginTop: -60,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 100,
    width: 120,
    height: 120,
  },
  btnVoltar:{
    padding:20,
    position:'absolute'
  }
});
