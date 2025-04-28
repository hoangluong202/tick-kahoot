import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from './config/config.type';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService<AllConfigType>);
  
  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: ['/'],
    },
  );

  //Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Tick Kahoot API')
    .setDescription('Api docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  console.log(
    `Swagger docs available at ${configService.getOrThrow('app.backendDomain', { infer: true })}/docs`,
  );

  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
bootstrap()
