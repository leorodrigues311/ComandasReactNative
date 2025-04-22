// src/utils/AppConfig.ts
import AsyncStorage from '@react-native-async-storage/async-storage'

const CONFIG_KEY = 'APP_CONFIG'

export type AppConfig = {
  BASE_URL: string
  DATABASE_HOST: string
  DATABASE_BASE: string
  DATABASE_USER: string
  DATABASE_PASSWORD: string
  DATABASE_PORT: string
}

export const saveConfig = async (config: AppConfig) => {
  await AsyncStorage.setItem(CONFIG_KEY, JSON.stringify(config))
}

export const loadConfig = async (): Promise<AppConfig | null> => {
  const json = await AsyncStorage.getItem(CONFIG_KEY)
  return json ? JSON.parse(json) : null
}
