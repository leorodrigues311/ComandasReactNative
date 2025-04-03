import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';

interface ItemConferenciaAddProps {
  id: string;
  item_nome: string;
  quantidade: number;
  onRemove: (id: string) => void;
  onIncrement: (id: string, tipo: 'soma' | 'subtrai') => void;
  onDecrement: (id: string, tipo: 'soma' | 'subtrai') => void;
}

export function ItemConferenciaAdd({
  id,
  item_nome,
  quantidade,
  onRemove,
  onIncrement,
  onDecrement,
}: ItemConferenciaAddProps) {
  const excluirItem = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    onRemove(id);
  };

  const incrementar = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onIncrement(id, 'soma');
  };

  const decrementar = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onDecrement(id, 'subtrai');
  };

  return (
    <View style={styles.viewPrincipal}>
      <TouchableOpacity onPress={excluirItem}>
        <Ionicons name="close-circle-outline" color={'red'} size={30} />
      </TouchableOpacity>

      <Text style={styles.textoItem}numberOfLines={1}>{item_nome}</Text>

      <View style={styles.botoesContainer}>
        <TouchableOpacity onPress={decrementar} style={styles.botao}>
          <Ionicons name="remove-circle-outline" color={'white'} size={30} />
        </TouchableOpacity>

      <Text style={styles.itemQtd}>{quantidade === 0 ? 1 : quantidade}</Text>

        <TouchableOpacity onPress={incrementar} style={styles.botao}>
          <Ionicons name="add-circle-outline" color={'white'} size={30} />
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPrincipal: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 0,
    justifyContent: 'space-between',
    maxHeight:50,
    flex: 1,
  },
  textoItem: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
    marginTop:3,
    flex: 1,
  },
  itemQtd: {
    color: 'white',
    fontSize: 18,
    marginHorizontal: 5,
  },
  botoesContainer: {
    flexDirection: 'row',
    alignItems:'center'
  },
  botao: {
    marginHorizontal: 2,
  },
});
