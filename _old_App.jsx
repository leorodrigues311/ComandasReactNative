import { registerRootComponent } from 'expo';
import Helper from '@/database/helper/helper';
import { loadConfig } from './src/utils/AppConfig';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { ExpoRoot } from 'expo-router';
import { AppContext } from './app/context/appContext'

export function App() {
  const [loaded, setLoaded] = useState(false);
  const [helper, setHelper] = useState<Helper | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const config = await loadConfig();
        if (config) {
          globalThis.appConfig = config;
          const instance = new Helper(config.BASE_URL);
          setHelper(instance);
        }
      } catch (error) {
        console.error("Erro ao carregar config:", error);
      } finally {
        setLoaded(true);
      }
    }

    init();
  }, []);

  if (!loaded || !helper) return <Text>Carregando config...</Text>;

  return (
    <AppContext.Provider value={{ helper }}>
      <ExpoRoot context={require.context("./app")} />
    </AppContext.Provider>
  );
}

registerRootComponent(App);
