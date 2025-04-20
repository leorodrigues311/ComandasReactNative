import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Pressable, Switch, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Keyboard } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabTwoScreen() {
  const [selectedOption, setSelectedOption] = useState<'local' | 'cloud'>('local');
  const [expandedSection, setExpandedSection] = useState<'none' | 'conexao' | 'taxa'>('none');
  const [taxValue, setTaxValue] = useState('');
  const [isFixed, setIsFixed] = useState(false);
  const [modalConexao, setModalConexao] = useState(false);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');

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
          <TouchableOpacity style={styles.option} onPress = {() => setModalConexao(true)}>
            <Text style={styles.optionText}>Configurar conexão</Text>
          </TouchableOpacity>
          <Modal
            visible={modalConexao}
            animationType="slide"
            transparent
            onRequestClose={() => setModalConexao(false)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>

                {/* Botão de fechar */}
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalConexao(false)}>
                  <Ionicons name="close-outline" size={30} color="white" />
                </TouchableOpacity>

                <TextInput
                  placeholder="IP"
                  placeholderTextColor="#808080"
                  style={styles.modalInput}
                  value={input1}
                  onChangeText={setInput1}
                />
                <TextInput
                  placeholder="Porta"
                  placeholderTextColor="#808080"
                  style={styles.modalInput}
                  value={input2}
                  onChangeText={setInput2}
                />
                <TextInput
                  placeholder="Host"
                  placeholderTextColor="#808080"
                  style={styles.modalInput}
                  value={input3}
                  onChangeText={setInput3}
                />
                <TextInput
                  placeholder="Database"
                  placeholderTextColor="#808080"
                  style={styles.modalInput}
                  value={input4}
                  onChangeText={setInput4}
                />

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => {
                    // Aqui você pode salvar os dados ou fazer algo com eles
                    setModalConexao(false);
                  }}
                >
                  <Text style={styles.saveButtonText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContainer: {
    backgroundColor: '#1C1C1C',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  modalInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#4F4F4F',
    paddingVertical: 8,
    marginBottom: 15,
    color: 'white',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#00CED1',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 0,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  
});
