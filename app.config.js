const BASE_URL = `http://`+globalThis.appConfig?.BASE_URL || "http://192.168.0.113:4000";
// const DATABASE_HOST = globalThis.appConfig?.DATABASE_HOST || "inovasistemas.postgresql.dbaas.com.br";
// const DATABASE_BASE = globalThis.appConfig?.DATABASE_BASE || "inovasistemas";
// const DATABASE_USER = globalThis.appConfig?.DATABASE_USER || "inovasistemas";
// const DATABASE_PASSWORD = globalThis.appConfig?.DATABASE_PASSWORD || "Inova@123";
// const DATABASE_PORT = globalThis.appConfig?.DATABASE_PORT || "5432";

//const BASE_URL = "http://192.168.0.113:4000";
const DATABASE_HOST = "inovasistemas.postgresql.dbaas.com.br";
const DATABASE_BASE = "inovasistemas";
const DATABASE_USER = "inovasistemas";
const DATABASE_PASSWORD = "Inova@123";
const DATABASE_PORT = "5432";

export default {
  expo: {
    name: "Inova Comandas",
    slug: "Inova Comandas",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "dark",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      "expo-font"
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      BASE_URL,
      DATABASE_HOST,
      DATABASE_BASE,
      DATABASE_USER,
      DATABASE_PASSWORD,
      DATABASE_PORT
    }
  }
}
