import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { RedisModule } from './redis/redis.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [TasksModule, RedisModule, KafkaModule],
})
export class AppModule {}

// controllers: [AppController],
// providers: [AppService],
