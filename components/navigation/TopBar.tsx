import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from 'expo-router';
import { ComandaProvider, useComanda } from '@/app/context/comandaContext'

export function TopBar() {
  const [inputVisivel, setInputVisivel] = useState(true); // Estado para controlar visibilidade
  const animacaoInput = useState(new Animated.Value(0))[0]; // Inicializa a animação

  const {usuarios, usuarioSelecionado, carregaUsuarios, setusuarioSelecionado} = useComanda();

  const router = useRouter()

  const alternarPesquisa = () => {
    Animated.timing(animacaoInput, {
      toValue: inputVisivel ? 300 : 0, // Move para fora (300px) ou volta para 0
      duration: 600,
      useNativeDriver: true,
    }).start();
    setInputVisivel(!inputVisivel);
  };

  const logout = () => {
    setusuarioSelecionado(null)
    router.push('/login')
  }

  return (
    <View style={styles.viewPrincipal}>
      {/* Container para ícone + botão "Sair" */}
      <View style={styles.containerOperador}>
        {/* Ícone do usuário */}
        <TouchableOpacity style={styles.viewOperador} onPress={alternarPesquisa}>
          <Ionicons name="person-circle-outline" size={30} color={inputVisivel == true ? "gray" : "white"} />
          <Text style={styles.nomeOperador}
            numberOfLines={1}
            adjustsFontSizeToFit>{usuarioSelecionado?.usuario_nome.split(' ')[0]}</Text>
        </TouchableOpacity>

        {!inputVisivel && (
          <TouchableOpacity style={styles.btnRecolher} onPress={alternarPesquisa}>
            <Ionicons name="chevron-back-outline" size={30} color={"white"} />
          </TouchableOpacity>
        )} 

        {/* Botão "Sair" (só aparece quando a pesquisa está oculta) */}
        {!inputVisivel && (
          <TouchableOpacity style={styles.btnSair} >
            <Ionicons name="log-out-outline" size={30} color={"#e11d48"} onPress={logout} />
            <Text style={styles.textoSair}>Sair</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Campo de pesquisa animado */}
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

          <Pressable style={styles.viewBtnFiltro}>
            <Ionicons style={styles.btnFiltro} name="filter-outline" size={20} color="white" />
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPrincipal: {
    height: '12%', // usar rem aqui
    position:'fixed',
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
    width:60,
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
  containerPesquisar: {
    flex:1,
    flexDirection:'row',
    width:'100%',
  },

  containerPesquisar2: {
    position:'relative',
    width:'85%'

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

  viewBtnPesquisar:{
    position: "absolute",
    height:'100%',
    flex:1,
    justifyContent:'center',
    right:0,
  },

  btnPesquisar: {

    //transform: [{ translateY: -12.5 }],
  },

  viewBtnFiltro:{
    position: "absolute",
    height:'90%',
    flex:1,
    justifyContent:'center',
    right:0,
  },

  btnFiltro: {
   // transform: [{ translateY: -12.5 }],
  },
});

export default TopBar;
