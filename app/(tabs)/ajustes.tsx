import { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Pressable, Switch, TextInput, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Haptics from 'expo-haptics'
import { Keyboard } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ComandaProvider, useComanda } from '@/app/context/comandaContext'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Ajustes() {

  const {selectedOption, taxValue, taxState, tipoTaxa, ip, porta, host, database, caixa_id, setSelectedOption, setTaxValue, setTaxState, setTipoTaxa, setIp, setPorta, setHost, setDatabase, setCaixaId } = useComanda()

  const [modalConexao, setModalConexao] = useState(false)
  const [configConexao, setConfigConexao] = useState(false)
  const [expandedSection, setExpandedSection] = useState<'none' | 'conexao' | 'taxa' | 'caixa'>('none')

  const toggleSection = (section: 'conexao' | 'taxa'| 'caixa') => {
    setExpandedSection((prev) => (prev === section ? 'none' : section))
  }



  const handleSwitch = (option: 'local' | 'cloud') => {
    setSelectedOption(option)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
    option === 'local' ? setConfigConexao(false) : setConfigConexao(true)
  }

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
          <TouchableOpacity disabled={configConexao} style={styles.option} onPress = {() => setModalConexao(true)}>
            <Text style={[styles.optionText, configConexao && { color: '#808080' }]}>   Configurar conexão</Text>
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
                  placeholder="IP (Ex: 192.168.0.113:4000)"
                  placeholderTextColor="#808080"
                  style={styles.modalInput}
                  value={ip}
                  onChangeText={setIp}
                  autoCapitalize="none"
                />

                <TextInput
                  placeholder="Porta (Ex: 5432)"
                  placeholderTextColor="#808080"
                  style={styles.modalInput}
                  value={porta}
                  onChangeText={setPorta}
                  autoCapitalize="none"
                />
                <TextInput
                  placeholder="Host (Ex: localhost)"
                  placeholderTextColor="#808080"
                  style={styles.modalInput}
                  value={host}
                  onChangeText={setHost}
                  autoCapitalize="none"
                />
                <TextInput
                  placeholder="Database (Ex: inova)"
                  placeholderTextColor="#808080"
                  style={styles.modalInput}
                  value={database}
                  onChangeText={setDatabase}
                  autoCapitalize="none"
                />

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={async () => {
                    try {
                      const settings = {
                        ip,
                        porta,
                        host,
                        database,
                      };
                      await AsyncStorage.setItem('appSettings', JSON.stringify(settings));
                      setModalConexao(false);
                    } catch (e) {
                      console.error('Erro ao salvar configurações:', e);
                    }
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
          <Text style={styles.optionText}>Valor da taxa ({tipoTaxa ? 'R$' : '%'})</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={() => {
              Keyboard.dismiss();
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            blurOnSubmit={true}
            value={taxValue}
            onChangeText={(text) => {
              const onlyNumbers = text.replace(/\D/g, '');
              const number = parseFloat(onlyNumbers) / 100;
              const formatted = number.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              });
              setTaxValue(formatted);
            }}
            maxLength={6} // limite ajustado por segurança
            placeholder={tipoTaxa ? 'Ex: 5,00' : 'Ex: 10'}
            placeholderTextColor="#808080"
          />

        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Usar valor fixo (R$)</Text>
          <Switch
            value={tipoTaxa}
            onValueChange={(value) => {
              setTipoTaxa(value)
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
              setTaxValue('')
            }}
            thumbColor="#ffffff"
            trackColor={{ false: '#4F4F4F', true: '#00CED1' }}
          />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Taxa sempre marcada</Text>
          <Switch
            value={taxState}
            onValueChange={(value) => {
              setTaxState(value)
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            }}
            thumbColor="#ffffff"
            trackColor={{ false: '#4F4F4F', true: '#00CED1' }}
          />
        </View>
      </View>
    )}

    <Pressable onPress={() => toggleSection('caixa')} style={styles.collapsibleButton}>
      <Text style={styles.buttonText}>Caixa</Text>
    </Pressable>

    {expandedSection === 'caixa' && (
      <View style={styles.optionsContainer}>
        <View style={styles.option}>
          <Text style={styles.optionText}>Id do caixa a utilizar</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={() => {
              Keyboard.dismiss();
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            value={String(caixa_id)}
            onChangeText={(text) => setCaixaId(text)}
            maxLength={4}
            placeholder={'id do caixa'}
            placeholderTextColor="#808080"
          />
        </View>
      </View>
    )}

    </SafeAreaView>
  )
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
  
})
