export {};

declare global {
  interface AppConfig {
    BASE_URL: string;
  }

  interface Global {
    appConfig?: AppConfig;
  }

  var appConfig: AppConfig | undefined;
}