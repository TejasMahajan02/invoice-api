import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,            // strips any properties not defined in the DTO
    forbidNonWhitelisted: true, // throws an error if extra properties are present
    transform: true
  }));

  const config = new DocumentBuilder()
    .setTitle('Invoice Application')
    .setDescription('The Invoice Application Description')
    .setVersion('1.0')
    .addTag('Invoice')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Use the JWT token provided after login for authentication.'
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(+process.env.NODE_PORT || 3000);
  console.log(`Application is running on : ${await app.getUrl()}/swagger`);
}
bootstrap();
