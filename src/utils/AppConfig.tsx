import AsyncStorage from '@react-native-async-storage/async-storage'

const CONFIG_KEY = 'comandaConfig'

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

export async function loadConfig() {
  try {
    const jsonValue = await AsyncStorage.getItem(CONFIG_KEY)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    console.error("Erro ao carregar do AsyncStorage:", e)
    return null
  }
}