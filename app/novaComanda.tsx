import Ionicons from '@expo/vector-icons/Ionicons';
import { Modal, Text, TextInput, View, Button, Pressable, StyleSheet } from 'react-native';
import React, { useState, useEffect  } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Dialog from "react-native-dialog"
import { useRouter } from "expo-router";


export default function novaComanda (){

  const router = useRouter();

  const [modalNumeroComandaVisivel, setModalNumeroComanda] = useState(false)
  const [inputNumeroComanda, setInputNumeroComanda] = useState('')

  const [modalNomeComandaVisivel, setModalNomeComanda] = useState(false)
  const [inputNomeComanda, setInputNomeComanda] = useState('')

  const [dialogVisible, setDialogVisible] = useState(false)

  const [text, setText] = useState('');

  const handleCancel = () => {
    setDialogVisible(false);
  };

  const handleConfirm = () => {
    router.back()
  };


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

  useEffect(() => { 
    setTimeout(() => {
      setModalNumeroComanda(true)
    }, 500);
   }, []);

    return (
        <SafeAreaView style={styles.viewPrincipal} >
            <View style={styles.container}>


            <Dialog.Container visible={dialogVisible}>
              <Dialog.Title>Cancelar</Dialog.Title>
              <Dialog.Description>
                Deseja Cancelar o Cadastro da Nova Comanda?
              </Dialog.Description>
              <Dialog.Button onPress={handleCancel} label="Não" />
              <Dialog.Button onPress={handleConfirm} label="Sim" />
            </Dialog.Container>
 
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