import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const [cnpj, setCnpj] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  // Lista de usuários fictícia
  const usuarios = [
    { id: '1', nome: 'Usuário 1' },
    { id: '2', nome: 'Usuário 2' },
    { id: '3', nome: 'Usuário 3' },
    { id: '4', nome: 'Usuário 4' },
  ];

  const handleLogin = () => {
    console.log('CNPJ:', cnpj, 'Senha:', password);
    setModalVisible(true); // Exibe o modal ao clicar no botão
  };

  const selecionarUsuario = (usuario) => {
    console.log('Usuário selecionado:', usuario.nome);
    setModalVisible(false);
    router.push('/(tabs)'); // Redireciona após a seleção
  };

  return (
    <View style={styles.viewPrincipal}>
      <View style={styles.logoInova}>
        <Image 
          source={require('../assets/images/inova_comandas.png')}
          style={styles.imagemLogo} 
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="CPF / CNPJ"
        keyboardType="email-address"
        value={cnpj}
        onChangeText={setCnpj}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Modal para exibir a lista de usuários */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Olá "Inova Sistemas"</Text>
            <FlatList
              data={usuarios}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => selecionarUsuario(item)}>
                  <Text style={styles.modalItemText}>{item.nome}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPrincipal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#696868',
    borderRadius: 50,
    paddingHorizontal: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoInova: {
    width: '55%',
    height: '55%',
    position: 'absolute',
    top: '10%',
    left: '30%',
    resizeMode: 'contain',
  },
  imagemLogo: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'contain',
  },
  // Estilos do Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#696868',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color:'white'
  },
  modalItem: {
    padding: 15,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  modalItemText: {
    fontSize: 16,
  },
  modalCloseButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#dc3545',
    borderRadius: 5,
  },
  modalCloseText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

