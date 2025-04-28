import { registerAs } from '@nestjs/config';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { AppConfig } from './app-config.type';
import validateConfig from 'src/utils/vallidate-config';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariablesValidator {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment;

  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(65535)
  APP_PORT: number;

  @IsUrl({ require_tld: false })
  @IsOptional()
  FRONTEND_DOMAIN: string;

  @IsUrl({ require_tld: false })
  @IsOptional()
  BACKEND_DOMAIN: string;

  @IsString()
  @IsOptional()
  API_PREFIX: string;
}

export default registerAs<AppConfig>('app', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);
  return {
    nodeEnv: process.env.NODE_ENV ?? Environment.Development,
    port: parseInt(process.env.APP_PORT ?? '3000'),
    name: process.env.APP_NAME ?? 'NestJS App',
    workingDirectory: process.env.PWD ?? process.cwd(),
    frontendDomain: process.env.FRONTEND_DOMAIN,
    backendDomain: process.env.BACKEND_DOMAIN ?? 'http://localhost:3000',
    apiPrefix: process.env.API_PREFIX ?? '/api/v1',
  };
});
