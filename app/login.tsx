import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, FlatList, 
  ScrollView, Animated, Dimensions, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TextInputMask } from "react-native-masked-text";
import { useComanda } from '@/app/context/comandaContext';
import * as Haptics from 'expo-haptics'

const { width } = Dimensions.get('window');

export default function Login() {

  const {usuarios, usuarioSelecionado, carregaUsuarios, setusuarioSelecionado} = useComanda();
  const [cnpj, setCnpj] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();


  const handleLogin = async ()  => {
    await carregaUsuarios(cnpj.replace(/[.\-/]/g, ""))
  };

  useEffect(() => {
    if (Array.isArray(usuarios) && usuarios.length === 0) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      alert('Loja não encontrada ou usuários não cadastrados')
    } else if (usuarios.length > 0) {
      setModalVisible(true);
    }
  }, [usuarios])

  const submitLogin = (password: string) => {
    if (usuarioSelecionado?.usuario_senha == password){
      setModalVisible(false);
      router.push('/(tabs)')
    } 
    else {
      alert('Senha incorreta')
    }
  }

  const [mantenhaLogado, setMantenhaLogado] = useState(false);
  const toggleSwitch = () => setMantenhaLogado(previousState => !previousState);

  const fecharModal = () => {
    setModalVisible(false)
    animacaoModal("reverse");
    setPassword('')
  }

  const animacaoModal = (direction: "normal" | "reverse") => {
    const directionValue = direction === "normal" ? -width : 0;
  
    Animated.timing(scrollX, {
      toValue: directionValue,
      duration: 400,
      useNativeDriver: true,
    }).start();
  
    // Faz o ScrollView rolar para a posição correta
    scrollViewRef.current?.scrollTo({ x: direction === "normal" ? 0 : width, animated: true });
  };
  
  const selecionarUsuario = (usuario_id: number, usuario_nome: string, usuario_grupo_acesso: string, usuario_senha: string) => {
    setusuarioSelecionado({
      id: usuario_id || 0,
      cnpj_loja: cnpj,
      usuario_nome: usuario_nome,
      usuario_grupo_acesso: usuario_grupo_acesso,
      usuario_senha: usuario_senha
    })

    animacaoModal("normal")
  }

  return (
    <View style={styles.viewPrincipal}>
      <View style={styles.logoInova}>
        <Image 
          source={require('../assets/images/inova_comandas.png')}
          style={styles.imagemLogo} 
        />
      </View>

      <TextInputMask
        style={styles.inputCnpj}
        placeholder="CNPJ"
        type={"cnpj"}
        keyboardType="numeric"
        value={cnpj}
        onChangeText={setCnpj}
      />
      <View style ={styles.btnMantenhaConectado}>
        <Switch
          value={mantenhaLogado}
          onValueChange={toggleSwitch}
          style={{
            transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]  // Diminui o tamanho do switch
          }}
        />
        <Text style={styles.textoMantenhaConectado}>Mantenha-me conectado</Text>
      </View>
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
                <TouchableOpacity style={styles.closeModalButton} onPress={() => setModalVisible(false)}>
                  <Ionicons name="close-outline" size={30} color="white" />
                </TouchableOpacity>
                <FlatList
                  style={styles.flatList}
                  data={usuarios}
                  keyExtractor={(item) => String(item.id)}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.modalItem} onPress={() => selecionarUsuario(item.id, item.usuario_nome, item.usuario_grupo_acesso, item.usuario_senha)}>
                      <View style={styles.modalItemDadosLogin}>
                        <Text style={styles.modalItemNome}>{item.usuario_nome}</Text>
                        <Text style={styles.modalItemGrupoAcesso}>{(item.usuario_grupo_acesso == '1' ? 'Administrador' : 'Vendedor')}</Text>
                      </View>
                      <Ionicons style={styles.modalItemArrow} name="arrow-forward-outline" size={30} color={'#ccc8c8'} />
                    </TouchableOpacity>
                  )}
                />
              </View>
              {/* SEGUNDA PARTE */}
              <View style={styles.modalPage}>
                <TouchableOpacity style={styles.closeModalButton} onPress={() => fecharModal()}>
                  <Ionicons name="close-outline" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButtonBack} onPress={() => animacaoModal("reverse")}>
                  <Ionicons name="arrow-back-outline" size={30} color={'white'} />
                </TouchableOpacity>

                <View style={styles.modalItemSelecionado} >
                  {usuarioSelecionado && <Text style={styles.usuarioSelecionado}>{usuarioSelecionado.usuario_nome}</Text>}
                  {usuarioSelecionado && <Text style={styles.usuarioSelecionadoGrupoAcesso}>{(usuarioSelecionado.usuario_grupo_acesso == '1' ? 'Administrador' : 'Vendedor')}</Text>}
                  <TextInput
                    style={styles.inputPassword}
                    placeholder="Senha"
                    keyboardType="visible-password"
                    secureTextEntry={true}  // Isso torna o campo de texto uma senha
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
                
                <TouchableOpacity style={styles.buttonLogin} onPress={() => submitLogin(password)}>
                <Text style={styles.buttonText}>Entrar</Text>
              </TouchableOpacity>
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  viewPrincipal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    padding: 20,
  },
  inputCnpj: {
    width: '100%',
    height: 50,
    backgroundColor: '#696868',
    borderRadius: 50,
    paddingHorizontal: 15,
    marginBottom: 5,
    color:'white',
    fontSize:20
  },
  inputPassword: {
    width: '100%',
    height: 50,
    backgroundColor: '#878686',
    borderRadius: 50,
    paddingHorizontal: 15,
    marginBottom: 15,
    color:'white',
    fontSize:17
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  buttonLogin: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop:10,
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
    top: '5%',
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
    width: width * 2,
    height: 350,
    backgroundColor: '#454545',
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalPage: {
    width,
    flex: 1,
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
    width: '100%',
  },
  modalItem: {
    padding: 15,
    width: '100%',
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

  modalItemDadosLogin:{
    flexDirection:'column'
  },
  modalItemSelecionado:{
    padding: 15,
    width: '100%',
    height: 170,
    borderWidth: 1,
    borderColor: '#454545',
    backgroundColor: '#696868',
    borderRadius: 8,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginTop:15

  },
  modalItemNome: {
    fontSize: 20,
    fontWeight: '600',
    color: '#f0ebeb',
  },
  modalItemGrupoAcesso: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999797',
  },
  modalItemArrow: {
    position: 'absolute',
    right: 15,
  },
  modalButtonBack:{
    position: 'absolute',
    top:20,
    left:20,
  },
  closeModalButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  usuarioSelecionado: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginTop:8,
    marginLeft:5
  },
  usuarioSelecionadoGrupoAcesso: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#c7c3c3',
    marginBottom:10,
    marginLeft:5
  },

  textoMantenhaConectado:{
    color:'white',
    fontSize:13,
    fontWeight:400,
    alignSelf:'center'
  },
  btnMantenhaConectado:{
    width:210,
    flexDirection:'row',
    justifyContent:'space-between',
    alignSelf:'flex-start',
    marginLeft:10,
    marginBottom:25
  },
});
