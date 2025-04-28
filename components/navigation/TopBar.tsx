import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated, Pressable, Modal } from "react-native";
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from 'expo-router';
import { useComanda } from '@/app/context/comandaContext';

export function TopBar() {
  const [inputVisivel, setInputVisivel] = useState(true);
  const animacaoInput = useState(new Animated.Value(0))[0];

  const { usuarios, usuarioSelecionado, carregaUsuarios, setusuarioSelecionado } = useComanda();

  const router = useRouter();

  const [modalVisivel, setModalVisivel] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState<string>('todas');
  const [ordem, setOrdem] = useState<string>('data');

  const alternarPesquisa = () => {
    Animated.timing(animacaoInput, {
      toValue: inputVisivel ? 300 : 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
    setInputVisivel(!inputVisivel);
  };

  const logout = () => {
    setusuarioSelecionado(null);
    router.push('/login');
  };

  const abrirModalFiltro = () => {
    setModalVisivel(true);
  };

  const aplicarFiltro = () => {
    console.log("Filtro aplicado", { filtroStatus, ordem });
    setModalVisivel(false);
  };

  return (
    <View style={styles.viewPrincipal}>
      <View style={styles.containerOperador}>
        <TouchableOpacity style={styles.viewOperador} onPress={alternarPesquisa}>
          <Ionicons name="person-circle-outline" size={30} color={inputVisivel ? "gray" : "white"} />
          <Text style={styles.nomeOperador} numberOfLines={1} adjustsFontSizeToFit>
            {usuarioSelecionado?.usuario_nome.split(' ')[0]}
          </Text>
        </TouchableOpacity>

        {!inputVisivel && (
          <TouchableOpacity style={styles.btnRecolher} onPress={alternarPesquisa}>
            <Ionicons name="chevron-back-outline" size={30} color={"white"} />
          </TouchableOpacity>
        )}

        {!inputVisivel && (
          <TouchableOpacity style={styles.btnSair}>
            <Ionicons name="log-out-outline" size={30} color={"#e11d48"} onPress={logout} />
            <Text style={styles.textoSair}>Sair</Text>
          </TouchableOpacity>
        )}
      </View>

      <Animated.View style={[styles.inputContainer, { transform: [{ translateX: animacaoInput }] }]}>
        <View style={styles.containerPesquisar}>
          <View style={styles.containerPesquisar2}>
            <TextInput
              style={styles.inputPesquisar}
              placeholder="Procurar..."
              placeholderTextColor="gray"
            />
            <Pressable style={styles.viewBtnPesquisar}>
              <Ionicons style={styles.btnPesquisar} name="search-outline" size={20} color="white" />
            </Pressable>
          </View>

          <Pressable style={styles.viewBtnFiltro} onPress={abrirModalFiltro}>
            <Ionicons style={styles.btnFiltro} name="filter-outline" size={20} color="white" />
          </Pressable>
        </View>
      </Animated.View>

      <Modal
        transparent={true}
        visible={modalVisivel}
        animationType="slide"
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filtros</Text>

            {/* Filtro Status */}
            <Text style={styles.label}>Status</Text>
            <SelectDropdown
              data={['Todas', 'Aberta', 'Fechada']}
              onSelect={(selectedItem) => {
                if (selectedItem === 'Todas') setFiltroStatus('todas');
                if (selectedItem === 'Aberta') setFiltroStatus('aberta');
                if (selectedItem === 'Fechada') setFiltroStatus('fechada');
              }}
              defaultValue={'Todas'}
              renderButton={(selectedItem) => (
                <View style={styles.selectButton}>
                  <Text style={styles.selectButtonText}>{selectedItem || 'Todas'}</Text>
                </View>
              )}
              renderItem={(item, index, isSelected) => (
                <View style={[styles.selectItem, isSelected && { backgroundColor: '#333' }]}>
                  <Text style={styles.selectItemText}>{item}</Text>
                </View>
              )}
            />

            {/* Filtro Ordenar */}
            <Text style={styles.label}>Ordenar por</Text>
            <SelectDropdown
              data={['Data', 'Número', 'Status']}
              onSelect={(selectedItem) => {
                if (selectedItem === 'Data') setOrdem('data');
                if (selectedItem === 'Número') setOrdem('numero');
                if (selectedItem === 'Status') setOrdem('status');
              }}
              defaultValue={'Data'}
              renderButton={(selectedItem) => (
                <View style={styles.selectButton}>
                  <Text style={styles.selectButtonText}>{selectedItem || 'Data'}</Text>
                </View>
              )}
              renderItem={(item, index, isSelected) => (
                <View style={[styles.selectItem, isSelected && { backgroundColor: '#333' }]}>
                  <Text style={styles.selectItemText}>{item}</Text>
                </View>
              )}
            />

            {/* Filtro Ordem */}
            <Text style={styles.label}>Ordem</Text>
            <SelectDropdown
              data={['Crescente', 'Decrescente']}
              onSelect={(selectedItem) => {
                if (selectedItem === 'Crescente') setOrdem('crescente');
                if (selectedItem === 'Decrescente') setOrdem('decrescente');
    
              }}
              defaultValue={'Decrescente'}
              renderButton={(selectedItem) => (
                <View style={styles.selectButton}>
                  <Text style={styles.selectButtonText}>{selectedItem || 'Data'}</Text>
                </View>
              )}
              renderItem={(item, index, isSelected) => (
                <View style={[styles.selectItem, isSelected && { backgroundColor: '#333' }]}>
                  <Text style={styles.selectItemText}>{item}</Text>
                </View>
              )}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={aplicarFiltro}>
                <Text style={styles.modalButtonText}>Aplicar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisivel(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPrincipal: {
    height: '12%',
    position: 'fixed',
    backgroundColor: "#151718",
    borderBottomColor: "#363636",
    borderBottomWidth: 0.2,
    flexDirection: "row",
    zIndex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  containerOperador: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewOperador: {
    width: 60,
    alignItems: "center",
  },
  nomeOperador: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
  },
  btnSair: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  btnRecolher: {
    marginLeft: 20,
  },
  textoSair: {
    color: "white",
    fontWeight: "bold",
  },
  containerPesquisar: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  containerPesquisar2: {
    position: 'relative',
    width: '85%',
  },
  inputPesquisar: {
    height: 45,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    color: "white",
    paddingRight: 40,
    marginLeft: 10,
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  btnPesquisar:{

  },
  viewBtnPesquisar: {
    position: "absolute",
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    right: 0,
  },
  btnFiltro:{

  },
  viewBtnFiltro: {
    position: "absolute",
    height: '90%',
    flex: 1,
    justifyContent: 'center',
    right: 0,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#1C1C1C",
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: '#4F4F4F',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: 'white'
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
    alignSelf: 'flex-start',
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  selectButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    justifyContent: 'center',
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#4F4F4F',
    marginBottom: 20,
  },
  selectButtonText: {
    color: 'white',
  },
  selectItem: {
    padding: 10,
    backgroundColor: '#1C1C1C',
  },
  selectItemText: {
    color: 'white',
  },
});

export default TopBar;
