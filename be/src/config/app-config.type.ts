export type AppConfig = {
  nodeEnv: string;
  port: number;
  name: string;
  workingDirectory: string;
  frontendDomain?: string;
  backendDomain: string;
  apiPrefix: string;
};
