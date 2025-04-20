import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Pressable, Switch, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Keyboard } from 'react-native';

export default function TabTwoScreen() {
  const [selectedOption, setSelectedOption] = useState<'local' | 'cloud'>('local');
  const [expandedSection, setExpandedSection] = useState<'none' | 'conexao' | 'taxa'>('none');
  const [taxValue, setTaxValue] = useState('');
  const [isFixed, setIsFixed] = useState(false);

  const toggleSection = (section: 'conexao' | 'taxa') => {
    setExpandedSection((prev) => (prev === section ? 'none' : section));
  };

  const handleSwitch = (option: 'local' | 'cloud') => {
    setSelectedOption(option);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Botão Conexão */}
      <Pressable onPress={() => toggleSection('conexao')} style={styles.collapsibleButton}>
        <Text style={styles.buttonText}>Conexão</Text>
      </Pressable>

      {expandedSection === 'conexao' && (
        <View style={styles.optionsContainer}>
          <View style={styles.option}>
            <Text style={styles.optionText}>Utilizar conexão local</Text>
            <Switch
              value={selectedOption === 'local'}
              onValueChange={() => handleSwitch('local')}
              thumbColor="#ffffff"
              trackColor={{ false: '#4F4F4F', true: '#00CED1' }}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>Utilizar servidores em nuvem</Text>
            <Switch
              value={selectedOption === 'cloud'}
              onValueChange={() => handleSwitch('cloud')}
              thumbColor="#ffffff"
              trackColor={{ false: '#4F4F4F', true: '#00CED1' }}
            />
          </View>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Configurar conexão</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Botão Taxa de serviço */}
      <Pressable onPress={() => toggleSection('taxa')} style={styles.collapsibleButton}>
        <Text style={styles.buttonText}>Taxa de serviço</Text>
      </Pressable>

      {expandedSection === 'taxa' && (
      <View style={styles.optionsContainer}>
        <View style={styles.option}>
          <Text style={styles.optionText}>Valor da taxa ({isFixed ? 'R$' : '%'})</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            returnKeyType="done" // mostra "Concluído" no iOS ou ícone de check/enter no Android
            onSubmitEditing={() => {
              Keyboard.dismiss(); // Fecha o teclado ao pressionar
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // opcional
            }}
            blurOnSubmit={true} // garante que o teclado feche após submit
            value={taxValue}
            onChangeText={setTaxValue}
            placeholder={isFixed ? 'Ex: 5,00' : 'Ex: 10'}
            placeholderTextColor="#808080"
          />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Usar valor fixo (R$)</Text>
          <Switch
            value={isFixed}
            onValueChange={(value) => {
              setIsFixed(value);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              setTaxValue('')
            }}
            thumbColor="#ffffff"
            trackColor={{ false: '#4F4F4F', true: '#00CED1' }}
          />
        </View>
      </View>
    )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  input: {
    color: 'white',
    fontSize: 16,
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#4F4F4F',
    minWidth: 80,
    textAlign: 'center',
  },
  collapsibleButton: {
    padding: 12,
    alignItems: 'flex-start',
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: '#4F4F4F',
  },
  buttonText: {
    fontWeight: '300',
    color: 'white',
    fontSize: 20,
  },
  optionsContainer: {
    backgroundColor: '#1C1C1C',
    padding: 10,
    borderRadius: 6,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#4F4F4F',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
});
