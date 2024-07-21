import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { RedisModule } from '../redis/redis.module';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [RedisModule, KafkaModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
