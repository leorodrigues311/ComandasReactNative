import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';

interface ItemConferenciaAddProps {
  id: string;
  item_nome: string;
  quantidade: number;
  onRemove: (id: string) => void;
}

export function ItemConferenciaAdd({ id, item_nome, quantidade, onRemove }: ItemConferenciaAddProps) {

  const excluirItem = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    onRemove(id);
  };

  return (
    <View style={styles.viewPrincipal}>
      <TouchableOpacity onPress={excluirItem}>
        <Ionicons name="close-circle-outline" color={'red'} size={30} />
      </TouchableOpacity>
      <Text style={styles.itemQtd}>{quantidade == 0 ? 1 : quantidade} -</Text>
      <Text style={styles.textoItem}>{item_nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPrincipal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textoItem: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  itemQtd:{
    color: 'white',
    fontSize: 18,
    marginLeft: 5,
  }
});
