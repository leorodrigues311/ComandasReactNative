import 'expo-router';

declare module 'expo-router' {
  export interface RouteParams {
    '/comandaDetalhe': {
      nomeComanda: string;
      numeroComanda: number;
      horaAbertura: string;
      statusComanda: string;
    };
  }
}