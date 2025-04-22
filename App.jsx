import React, { useEffect, useState } from 'react'
import { loadConfig } from './src/utils/AppConfig'
import { Text } from 'react-native'
import { Routes }from './app/routes/Routes'
import { ComandaProvider } from '@/app/context/comandaContext'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function init() {
      const config = await loadConfig()
      if (config) {
        globalThis.appConfig = config
      }
      console.log("global", globalThis.appConfig)
      setLoaded(true)
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
