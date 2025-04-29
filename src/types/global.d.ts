export {};

declare global {
  interface AppConfig {
    ip: string;
  }

  interface Global {
    appConfig?: AppConfig;
  }

  var appConfig: AppConfig | undefined;
}