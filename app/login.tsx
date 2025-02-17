import React, { useState, useRef } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, FlatList, 
  ScrollView, Animated, Dimensions 
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window'); // Pega a largura da tela

export default function Login() {
  const [cnpj, setCnpj] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const router = useRouter();

  const usuarios = [
    { id: '1', nome: 'Leonardo Rodrigues' },
    { id: '2', nome: 'José Roberto' },
    { id: '3', nome: 'Luis Henrique' },
    { id: '4', nome: 'João Felipe' },
  ];

  const handleLogin = () => {
    setModalVisible(true);
  };

  const selecionarUsuario = (usuario) => {
    setSelectedUser(usuario);
    Animated.timing(scrollX, {
      toValue: -width, // Move para a esquerda
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Faz o ScrollView rolar para a esquerda
    scrollViewRef.current?.scrollTo({ x: width, animated: true });
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

      {/* Modal */}
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <Animated.View style={[styles.modalContent, { transform: [{ translateX: scrollX }] }]}>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              scrollEnabled={false} // Impede rolagem manual
              showsHorizontalScrollIndicator={false}
            >

              {/* PRIMEIRA PARTE */}
              <View style={styles.modalPage}>
                <Text style={styles.modalTitle}>Escolha um usuário</Text>
                <FlatList
                  style={styles.flatList}
                  data={usuarios}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.modalItem} onPress={() => selecionarUsuario(item)}>
                      <Text style={styles.modalItemText}>{item.nome}</Text>
                      <Ionicons style={styles.modalItemArrow} name="arrow-forward-outline" size={30} color={'#ccc8c8'} />
                    </TouchableOpacity>
                  )}
                />
              </View>
              {/* SEGUNDA PARTE */}
              <View style={styles.modalPage}>
                <TouchableOpacity style={styles.closeModalButton} onPress={() => setModalVisible(false)}>
                  <Ionicons name="close-outline" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Usuário Selecionado</Text>
                {selectedUser && <Text style={styles.selectedUser}>{selectedUser.nome}</Text>}
              </View>


            </ScrollView>
          </Animated.View>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    flexDirection: 'row',
    width: width * 2, // Largura do modal: 2x a tela
    height: 350,
    backgroundColor: '#454545',
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalPage: {
    width, // Ocupa exatamente 1 tela
    flex: 1, // Para garantir que ocupe o espaço vertical
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  flatList: {
    width: '100%', // Garante que ocupe a largura toda
    left:5
  },
  modalItem: {
    padding: 15,
    width: '100%', // Ajustado para não ocupar a tela toda
    height: 80,
    borderWidth: 1,
    borderColor: '#454545',
    backgroundColor: '#696868',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  modalItemText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#f0ebeb',
  },
  modalItemArrow: {
    position: 'absolute',
    right: 15,
  },
  closeModalButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    borderRadius: 50,
  },
  selectedUser: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
  },
});
