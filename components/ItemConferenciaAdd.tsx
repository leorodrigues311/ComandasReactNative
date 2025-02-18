import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';

interface ItemConferenciaAddProps {
  id: number;
  name: string;
  onRemove: (id: number) => void;
}

export function ItemConferenciaAdd({ id, name, onRemove }: ItemConferenciaAddProps) {

  const excluirItem = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    onRemove(id);
  };

  return (
    <View style={styles.viewPrincipal}>
      <TouchableOpacity onPress={excluirItem}>
        <Ionicons name="close-circle-outline" color={'red'} size={30} />
      </TouchableOpacity>
      <Text style={styles.textoItem}>{name}</Text>
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
    marginLeft: 5,
  },
});
