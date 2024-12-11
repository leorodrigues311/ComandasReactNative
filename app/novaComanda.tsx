import Ionicons from '@expo/vector-icons/Ionicons';
import { Modal, Text, TextInput, View, Button, Pressable, StyleSheet } from 'react-native';
import React, { useState, useEffect  } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Dialog from "react-native-dialog"
import { useRouter } from "expo-router";


export default function novaComanda (){

  const router = useRouter();

  // Estas instâncias servem para mudar o estado do modal do número da comanda, e para mudar o valor do input quando o usuario digita
  const [modalNumeroComandaVisivel, setModalNumeroComanda] = useState(false)
  const [inputNumeroComanda, setInputNumeroComanda] = useState('')

  // Estas instâncias servem para mudar o estado do modal do nome da comanda, e para mudar o valor do input quando o usuario digita
  const [modalNomeComandaVisivel, setModalNomeComanda] = useState(false)
  const [inputNomeComanda, setInputNomeComanda] = useState('')

  // Este serve para mudar o estado do "dialog", no caso aquele aviso para cancelar a abertura da comanda
  const [dialogVisible, setDialogVisible] = useState(false)

  const [text, setText] = useState('');

  // Essa função muda o estado do "dialog", é acionada pelo botão "cancelar" do "dialog"
  const handleCancel = () => {
    setDialogVisible(false);
  };

  // Essa função confirma o cancelamento, levando o usuário para a página inicial
  const handleConfirm = () => {
    router.back()
  };


  // aqui a função captura o clique do botão, e verifica se o botão retornou com os nomes correspondentes. E então executa a ação
  const handleButtonPress = (buttonType: string) => {
    if (buttonType === 'confirmaNumero') {
      setModalNumeroComanda(false);
      setTimeout(() => {setModalNomeComanda(true)}, 600);
    } 

    else if (buttonType === 'cancela') {
      setDialogVisible(true)
    }
    
    else if (buttonType === 'voltaEtapa'){
      setModalNomeComanda(false);
      setTimeout(() => {setModalNumeroComanda(true)}, 600);
    }

    else if (buttonType === 'finaliza'){
      router.push({
        pathname: '/comandaDetalhe',
        params: { nomeComanda: inputNomeComanda, numeroComanda: inputNumeroComanda, horaAbertura: '10:42', valorTotal: 0, statusComanda: 'ativo' },
      }),
      setModalNomeComanda(false);
    }

  };

  // Aqui ele abre o modal assim que o documento é carregado
  useEffect(() => { setTimeout(() => { setModalNumeroComanda(true) }, 500) }, []);

    return (
        <SafeAreaView style={styles.viewPrincipal} >
            <View style={styles.container}>

          {/*Este é o dialogo para cancelar a abertura da comanda*/}
            <Dialog.Container visible={dialogVisible}>
              <Dialog.Title>Cancelar</Dialog.Title>
              <Dialog.Description>
                Deseja Cancelar o Cadastro da Nova Comanda?
              </Dialog.Description>
              <Dialog.Button onPress={handleCancel} label="Não" />
              <Dialog.Button onPress={handleConfirm} label="Sim" />
            </Dialog.Container>
 
            {/*Este é o primeiro modal, que recebe o número da comanda*/}
            <Modal
              visible={modalNumeroComandaVisivel}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setModalNumeroComanda(false)}
            >

              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Número da comanda:</Text>


                  <TextInput
                    style={styles.input}
                    value={inputNumeroComanda}
                    onChangeText={setInputNumeroComanda}
                    placeholder="Número"
                    keyboardType='numeric'
                  />

                  <View style={styles.buttonsContainer}>
                    <Pressable onPress={() => handleButtonPress('cancela')}>
                      <Ionicons name="arrow-back-outline" size={40} color="white" ></Ionicons>
                    </Pressable>

                    <Pressable onPress={() => handleButtonPress('autoPreenche')}>
                      <Ionicons name="sync-outline" size={40} color="white" ></Ionicons>
                    </Pressable>

                    <Pressable onPress={() => handleButtonPress('confirmaNumero')}>
                      <Ionicons name="arrow-forward-outline" size={40} color="white" ></Ionicons>
                    </Pressable>

                  </View>
                </View>
              </View>
            </Modal>

          {/*Este é o segundo modal, que recebe o nome do cliente*/}
            <Modal
              visible={modalNomeComandaVisivel}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setModalNomeComanda(false)}
            >

              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Nome do cliente:</Text>


                  <TextInput
                    style={styles.input}
                    value={inputNomeComanda}
                    onChangeText={setInputNomeComanda}
                    placeholder="Nome"
                  />

                  <View style={styles.buttonsContainer}>
                    <Pressable onPress={() => handleButtonPress('voltaEtapa')}>
                      <Ionicons name="arrow-back-outline" size={40} color="white" ></Ionicons>
                    </Pressable>

                    <Pressable onPress={() => handleButtonPress('finaliza')}>
                      <Ionicons name="checkmark-done-outline" size={40} color="white" ></Ionicons>
                    </Pressable>

                  </View>
                </View>
              </View>
            </Modal>

          </View>
        </SafeAreaView>  
    );

}


const styles = StyleSheet.create({

  viewPrincipal: {
    margin: 12,
    marginTop:0,
    marginBottom:16,
    backgroundColor:'#1C1C1C',
    flexDirection: 'column',
    flex:1,
    borderRadius:5
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#363636',
    borderRadius: 10,
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    color:'white'
  },
  input: {
    height: 55,
    width: '100%',
    borderColor: '#4F4F4F',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color:'white',
    fontSize:28
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },


});