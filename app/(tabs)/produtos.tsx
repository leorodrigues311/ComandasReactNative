import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native'
import { ItemProduto } from '@/components/ItemProduto'
import { TopBarProdutos } from '@/components/navigation/TopBarProdutos'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ValorTotalComanda } from '@/components/valorTotalComanda'
import { useLocalSearchParams, useRouter } from 'expo-router'

interface ComandaProps {
  nomeComanda: string;
  numeroComanda: number;
  valorTotal: number;
  horaAbertura: string;
  statusComanda: string
}

export default function Produto({nomeComanda, numeroComanda, valorTotal, horaAbertura, statusComanda}: ComandaProps){


  const produtos = [
    { nomeComanda: 'João da Silva', numeroComanda: 1, horaAbertura: '10:42', valorTotal: 134.21, statusComanda: 'ativo' },
    { nomeComanda: 'Roberto', numeroComanda: 2, horaAbertura: '10:42', valorTotal: 14.11, statusComanda: 'ativo' },
    { nomeComanda: 'Lucas', numeroComanda: 3, horaAbertura: '11:28', valorTotal: 1874.33, statusComanda: 'ativo' },
    { nomeComanda: 'Maria', numeroComanda: 4, horaAbertura: '09:52', valorTotal: 5.32, statusComanda: 'ativo' },
    { nomeComanda: 'Ana Clara', numeroComanda: 5, horaAbertura: '15:30', valorTotal: 87.50, statusComanda: 'inativo' },
    { nomeComanda: 'Pedro Henrique', numeroComanda: 6, horaAbertura: '17:00', valorTotal: 220.25, statusComanda: 'ativo' },
    { nomeComanda: 'Sofia', numeroComanda: 7, horaAbertura: '18:45', valorTotal: 65.99, statusComanda: 'inativo' },
    { nomeComanda: 'Lucas Oliveira', numeroComanda: 8, horaAbertura: '19:20', valorTotal: 110.00, statusComanda: 'ativo' },
    { nomeComanda: 'Camila Souza', numeroComanda: 9, horaAbertura: '20:05', valorTotal: 35.75, statusComanda: 'ativo' }
];



const router = useRouter();


  return (
    <SafeAreaView>
      <TopBarProdutos/>
      <ScrollView>

        <View  style={styles.viewPrincipal}>
            <View style= {styles.viewStatus}>

            </View>

            <View style={styles.viewNumero}>
                <Text style={styles.viewNumeroTexto}>{numeroComanda}</Text>
            </View>

            <View style={styles.viewInfo}>
              <Text style={styles.viewInfoNome}>Pão com pão</Text>
              <Text style={styles.viewInfoValorTotal}>R$ 36,90</Text>
              <View style={styles.viewValorUnitItem}>
                <Text style={styles.quantidadeItem}>Estoque: 10</Text>
              </View>
            </View>
        </View>  

        <View  style={styles.viewPrincipal}>
            <View style= {styles.viewStatus}>

            </View>

            <View style={styles.viewNumero}>
                <Text style={styles.viewNumeroTexto}>{numeroComanda}</Text>
            </View>

            <View style={styles.viewInfo}>
              <Text style={styles.viewInfoNome}>Pão com pão</Text>
              <Text style={styles.viewInfoValorTotal}>R$ 36,90</Text>
              <View style={styles.viewValorUnitItem}>
                <Text style={styles.quantidadeItem}>Estoque: 10</Text>
              </View>
            </View>
        </View>

        <View  style={styles.viewPrincipal}>
            <View style= {styles.viewStatus}>

            </View>

            <View style={styles.viewNumero}>
                <Text style={styles.viewNumeroTexto}>{numeroComanda}</Text>
            </View>

            <View style={styles.viewInfo}>
              <Text style={styles.viewInfoNome}>Suco</Text>
              <Text style={styles.viewInfoValorTotal}>R$ 10,00</Text>
              <View style={styles.viewValorUnitItem}>
                <Text style={styles.quantidadeItem}>Estoque: 10</Text>
              </View>
            </View>
        </View>

        <View  style={styles.viewPrincipal}>
            <View style= {styles.viewStatus}>

            </View>

            <View style={styles.viewNumero}>
                <Text style={styles.viewNumeroTexto}>{numeroComanda}</Text>
            </View>

            <View style={styles.viewInfo}>
              <Text style={styles.viewInfoNome}>Sopa de pedra</Text>
              <Text style={styles.viewInfoValorTotal}>R$ 96,55</Text>
              <View style={styles.viewValorUnitItem}>
                <Text style={styles.quantidadeItem}>Estoque: 10</Text>
              </View>
            </View>
        </View>

        <View  style={styles.viewPrincipal}>
            <View style= {styles.viewStatus}>

            </View>

            <View style={styles.viewNumero}>
                <Text style={styles.viewNumeroTexto}>{numeroComanda}</Text>
            </View>

            <View style={styles.viewInfo}>
              <Text style={styles.viewInfoNome}>Galinha Caipira</Text>
              <Text style={styles.viewInfoValorTotal}>R$ 1,00</Text>
              <View style={styles.viewValorUnitItem}>
                <Text style={styles.quantidadeItem}>Estoque: 10</Text>
              </View>
            </View>
        </View>

        <View  style={styles.viewPrincipal}>
            <View style= {styles.viewStatus}>

            </View>

            <View style={styles.viewNumero}>
                <Text style={styles.viewNumeroTexto}>{numeroComanda}</Text>
            </View>

            <View style={styles.viewInfo}>
              <Text style={styles.viewInfoNome}>Miojo com Caldo Knor</Text>
              <Text style={styles.viewInfoValorTotal}>R$ 5,90</Text>
              <View style={styles.viewValorUnitItem}>
                <Text style={styles.quantidadeItem}>Estoque: 10</Text>
              </View>
            </View>
        </View>

        <View  style={styles.viewPrincipal}>
            <View style= {styles.viewStatus}>

            </View>

            <View style={styles.viewNumero}>
                <Text style={styles.viewNumeroTexto}>{numeroComanda}</Text>
            </View>

            <View style={styles.viewInfo}>
              <Text style={styles.viewInfoNome}>Casca de ovo</Text>
              <Text style={styles.viewInfoValorTotal}>R$ 56,30</Text>
              <View style={styles.viewValorUnitItem}>
                <Text style={styles.quantidadeItem}>Estoque: 10</Text>
              </View>
            </View>
        </View>

        <View  style={styles.viewPrincipal}>
            <View style= {styles.viewStatus}>

            </View>

            <View style={styles.viewNumero}>
                <Text style={styles.viewNumeroTexto}>{numeroComanda}</Text>
            </View>

            <View style={styles.viewInfo}>
              <Text style={styles.viewInfoNome}>Feijão</Text>
              <Text style={styles.viewInfoValorTotal}>R$ 10,40</Text>
              <View style={styles.viewValorUnitItem}>
                <Text style={styles.quantidadeItem}>Estoque: 10</Text>
              </View>
            </View>
        </View>

        <View  style={styles.viewPrincipal}>
            <View style= {styles.viewStatus}>

            </View>

            <View style={styles.viewNumero}>
                <Text style={styles.viewNumeroTexto}>{numeroComanda}</Text>
            </View>

            <View style={styles.viewInfo}>
              <Text style={styles.viewInfoNome}>Carne assada</Text>
              <Text style={styles.viewInfoValorTotal}>R$ 21,99</Text>
              <View style={styles.viewValorUnitItem}>
                <Text style={styles.quantidadeItem}>Estoque: 10</Text>
              </View>
            </View>
        </View>

        <View  style={styles.viewPrincipal}>
            <View style= {styles.viewStatus}>

            </View>

            <View style={styles.viewNumero}>
                <Text style={styles.viewNumeroTexto}>{numeroComanda}</Text>
            </View>

            <View style={styles.viewInfo}>
              <Text style={styles.viewInfoNome}>Pão de queijo</Text>
              <Text style={styles.viewInfoValorTotal}>R$ 12,90</Text>
              <View style={styles.viewValorUnitItem}>
                <Text style={styles.quantidadeItem}>Estoque: 10</Text>
              </View>
            </View>
        </View>

        <View  style={styles.viewPrincipal}>
            <View style= {styles.viewStatus}>

            </View>

            <View style={styles.viewNumero}>
                <Text style={styles.viewNumeroTexto}>{numeroComanda}</Text>
            </View>

            <View style={styles.viewInfo}>
              <Text style={styles.viewInfoNome}>Chafé</Text>
              <Text style={styles.viewInfoValorTotal}>R$ 410,30</Text>
              <View style={styles.viewValorUnitItem}>
                <Text style={styles.quantidadeItem}>Estoque: 10</Text>
              </View>
            </View>
        </View>

        <View  style={styles.viewPrincipal}>
            <View style= {styles.viewStatus}>

            </View>

            <View style={styles.viewNumero}>
                <Text style={styles.viewNumeroTexto}>{numeroComanda}</Text>
            </View>

            <View style={styles.viewInfo}>
              <Text style={styles.viewInfoNome}>Suco de Tamarindo</Text>
              <Text style={styles.viewInfoValorTotal}>R$ 2,50</Text>
              <View style={styles.viewValorUnitItem}>
                <Text style={styles.quantidadeItem}>Estoque: 10</Text>
              </View>
            </View>
        </View>

        <View  style={styles.viewPrincipal}>
            <View style= {styles.viewStatus}>

            </View>

            <View style={styles.viewNumero}>
                <Text style={styles.viewNumeroTexto}>{numeroComanda}</Text>
            </View>

            <View style={styles.viewInfo}>
              <Text style={styles.viewInfoNome}>Suco tang</Text>
              <Text style={styles.viewInfoValorTotal}>R$ 3,49</Text>
              <View style={styles.viewValorUnitItem}>
                <Text style={styles.quantidadeItem}>Estoque: 10</Text>
              </View>
            </View>
        </View>

        <View  style={styles.viewPrincipal}>
            <View style= {styles.viewStatus}>

            </View>

            <View style={styles.viewNumero}>
                <Text style={styles.viewNumeroTexto}>{numeroComanda}</Text>
            </View>

            <View style={styles.viewInfo}>
              <Text style={styles.viewInfoNome}>Chocotone</Text>
              <Text style={styles.viewInfoValorTotal}>R$ 0,59</Text>
              <View style={styles.viewValorUnitItem}>
                <Text style={styles.quantidadeItem}>Estoque: 10</Text>
              </View>
            </View>
        </View>

        <View  style={styles.viewPrincipal}>
            <View style= {styles.viewStatus}>

            </View>

            <View style={styles.viewNumero}>
                <Text style={styles.viewNumeroTexto}>{numeroComanda}</Text>
            </View>

            <View style={styles.viewInfo}>
              <Text style={styles.viewInfoNome}>Washarma (arabe)</Text>
              <Text style={styles.viewInfoValorTotal}>R$ 100,99</Text>
              <View style={styles.viewValorUnitItem}>
                <Text style={styles.quantidadeItem}>Estoque: 10</Text>
              </View>
            </View>
        </View>

        <View  style={styles.viewPrincipal}>
            <View style= {styles.viewStatus}>

            </View>

            <View style={styles.viewNumero}>
                <Text style={styles.viewNumeroTexto}>{numeroComanda}</Text>
            </View>

            <View style={styles.viewInfo}>
              <Text style={styles.viewInfoNome}>Frango Parmeggiana</Text>
              <Text style={styles.viewInfoValorTotal}>R$ 36,90</Text>
              <View style={styles.viewValorUnitItem}>
                <Text style={styles.quantidadeItem}>Estoque: 10</Text>
              </View>
            </View>
        </View>

        <View  style={styles.viewPrincipal}>
            <View style= {styles.viewStatus}>

            </View>

            <View style={styles.viewNumero}>
                <Text style={styles.viewNumeroTexto}>{numeroComanda}</Text>
            </View>

            <View style={styles.viewInfo}>
              <Text style={styles.viewInfoNome}>Ovo cozido</Text>
              <Text style={styles.viewInfoValorTotal}>R$ 5,99</Text>
              <View style={styles.viewValorUnitItem}>
                <Text style={styles.quantidadeItem}>Estoque: 10</Text>
              </View>
            </View>
        </View>

        <View  style={styles.viewPrincipal}>
            <View style= {styles.viewStatus}>

            </View>

            <View style={styles.viewNumero}>
                <Text style={styles.viewNumeroTexto}>{numeroComanda}</Text>
            </View>

            <View style={styles.viewInfo}>
              <Text style={styles.viewInfoNome}>Pão de batata</Text>
              <Text style={styles.viewInfoValorTotal}>R$ 1,90</Text>
              <View style={styles.viewValorUnitItem}>
                <Text style={styles.quantidadeItem}>Estoque: 10</Text>
              </View>
            </View>
        </View>


      </ScrollView>
    </SafeAreaView>
  );

}


const styles = StyleSheet.create({

  viewPrincipal: {
    height:100,
    borderWidth: 0.5,
    borderRadius:5,
    borderColor: '#4F4F4F',
    margin: 12,
    marginBottom:1,
    backgroundColor:'#1C1C1C',
    flexDirection: 'row'
  },

  viewStatus: {
    height:99,
    width:5,
    backgroundColor:'#696969',
    borderWidth: 0.2,
    borderRadius:5,
    borderTopRightRadius:0,
    borderBottomRightRadius:0,
    borderColor: '#696969',
    marginLeft: 0,
  },

  viewNumero: {
    height:99,
    width:99,
    alignItems: 'center',
    backgroundColor:'#696969',
    borderTopRightRadius:5,
    borderBottomRightRadius:5,
  },

  viewNumeroTexto: {
    alignItems: 'center',
    margin:20,
    gap: 6,
    color:'white',
    fontSize:50
  },

  viewInfo: {
    alignItems: 'flex-start',
    margin:3,
  },

  viewInfoNome: {
    alignItems: 'center',
    marginLeft:10,
    marginTop:5,
    color:'white',
    fontSize:20
  },

  viewInfoValorTotal: {
    marginLeft:10,
    marginTop:8,
    color:'#00FF00',
    fontSize:23
  },

  viewInfoHora: {
    marginLeft:10,
    marginTop:10,
    color:'white',
    fontSize:12
  },

  quantidadeItem: {
    fontSize: 13,
    color: '#C0C0C0',
    left: 10,
    margin: 5,
    marginTop: 0,
    fontWeight: '300',
  },

  viewNomeItem: {
    width: '66%',
    height: 30,
  },

  nomeItem: {
    width: '100%',
    fontSize: 18,
    color: 'white',
    left: 0,
    marginLeft: 10,
    margin: 5,
  },

  viewValorUnitItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },

  valorUnitItem: {
    fontSize: 13,
    fontWeight: '300',
    color: '#C0C0C0',
    left: '30%',
    margin: 5,
    marginTop: 0,
    position: 'absolute',
  },

  valorTotalItem: {
    fontSize: 16,
    color: '#00CC00',
    fontWeight: '800',
    right: '2%',
    top: '30%',
    margin: 5,
    position: 'absolute',
  },

});

