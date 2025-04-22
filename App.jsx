import React, { useEffect, useState } from 'react'
import { loadConfig } from './src/utils/AppConfig'
import { Text } from 'react-native'
import { Routes }from './app/routes/Routes'
import { ComandaProvider } from '@/app/context/comandaContext'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  console.log("Entrou no app")

  useEffect(() => {
    async function init() {
      try {
        const config = await loadConfig()
        if (config) {
          globalThis.appConfig = config
        }
        console.log("global", globalThis.appConfig)
      } catch (error) {
        console.error("Erro ao carregar config:", error)
      } finally {
        setLoaded(true)
      }
    }
  
    init()
  }, [])
  

  if (!loaded) return <Text>Carregando config...</Text>

  return (
    <ComandaProvider>
     <Routes/>
    </ComandaProvider>
  )
}
