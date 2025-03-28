import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ComandaProvider } from './context/comandaContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ComandaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DarkTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="comandaDetalhe" options={{ headerShown: false }}/>
            <Stack.Screen name="novaComanda" options={{ headerShown: false }}/>
            <Stack.Screen name="produtoAdicionarComanda" options={{ headerShown: false }}/>
            <Stack.Screen name="login" options={{ headerShown: false }}/>
            <Stack.Screen name="finalizarComanda" options={{ headerShown: false }}/>
          </Stack>
      </ThemeProvider>
    </ComandaProvider>
  );
}
