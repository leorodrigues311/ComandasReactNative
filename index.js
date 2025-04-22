import { registerRootComponent } from "expo"
import { ExpoRoot } from "expo-router"
import { loadConfig } from './src/utils/AppConfig'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'

export function App() {

    const [loaded, setLoaded] = useState(false)
  
    useEffect(() => {
      async function init() {
        try {
          const config = await loadConfig()
          if (config) {
            globalThis.appConfig = config
            console.log('entrou no if do loadConfig')
          }
        } catch (error) {
          console.error("Erro ao carregar config:", error)
        } finally {
          setLoaded(true)
        }
      }
    
      init()
    }, [])
    
  
    if (!loaded) return <Text>Carregando config...</Text>

  const ctx = require.context("./app")
  return <ExpoRoot context={ctx} />
}

registerRootComponent(App)
