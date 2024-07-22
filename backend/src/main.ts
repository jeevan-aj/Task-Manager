import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_BROKER || 'kafka:29092'], // Change this to 29092
      },
      consumer: {
        groupId: 'task-management-consumer',
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
