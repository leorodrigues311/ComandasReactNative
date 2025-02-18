import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from 'expo-router';

export function TopBar() {
  const [inputVisivel, setInputVisivel] = useState(true); // Estado para controlar visibilidade
  const animacaoInput = useState(new Animated.Value(0))[0]; // Inicializa a animação

  const alternarPesquisa = () => {
    Animated.timing(animacaoInput, {
      toValue: inputVisivel ? 300 : 0, // Move para fora (300px) ou volta para 0
      duration: 600,
      useNativeDriver: true,
    }).start();
    setInputVisivel(!inputVisivel);
  };


  return (
    <View style={styles.viewPrincipal}>
      {/* Container para ícone + botão "Sair" */}
      <View style={styles.containerOperador}>
        {/* Ícone do usuário */}
        <TouchableOpacity style={styles.viewOperador} onPress={alternarPesquisa}>
          <Ionicons name="person-circle-outline" size={30} color={inputVisivel == true ? "gray" : "white"} />
          <Text style={styles.nomeOperador}>Leonardo</Text>
        </TouchableOpacity>

        {!inputVisivel && (
          <TouchableOpacity style={styles.btnRecolher} onPress={alternarPesquisa}>
            <Ionicons name="chevron-back-outline" size={30} color={"white"} />
          </TouchableOpacity>
        )} 

        {/* Botão "Sair" (só aparece quando a pesquisa está oculta) */}
        {!inputVisivel && (
          <TouchableOpacity style={styles.btnSair} >
            <Ionicons name="log-out-outline" size={30} color={"red"} />
            <Text style={styles.textoSair}>Sair</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Campo de pesquisa animado */}
      <Animated.View style={[styles.inputContainer, { transform: [{ translateX: animacaoInput }] }]}>
        <TextInput
          style={styles.inputPesquisar}
          placeholder="Procurar..."
          placeholderTextColor="gray"
        />
        <Ionicons style={styles.btnPesquisar} name="search-outline" size={20} color="white" />
        <Ionicons style={styles.btnFiltro} name="filter-outline" size={20} color="white" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPrincipal: {
    height: 80,
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
    alignSelf:'flex-end',
  },

  btnRecolher:{
    marginLeft:20
  },

  textoSair: {
    color: "white",
    fontWeight: "bold",
  },

  inputPesquisar: {
    height: 45,
    width: "80%",
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
    flex: 1,
  },

  btnPesquisar: {
    position: "absolute",
    right: 60,
    top: "50%",
    transform: [{ translateY: -12.5 }],
  },

  btnFiltro: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12.5 }],
  },
});

export default TopBar;
