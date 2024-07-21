import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from '../redis/redis.service';
import { KafkaService } from '../kafka/kafka.service';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(
    private redisService: RedisService,
    private kafkaService: KafkaService,
  ) {}

  async findAll(): Promise<Task[]> {
    const cachedTasks = await this.redisService.get('tasks');
    if (cachedTasks) {
      return JSON.parse(cachedTasks);
    }
    await this.redisService.set('tasks', JSON.stringify(this.tasks));
    return this.tasks;
  }

  async findOne(id: string): Promise<Task> {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  async create(task: Omit<Task, 'id'>): Promise<Task> {
    const newTask = { ...task, id: uuidv4() };
    this.tasks.push(newTask);
    await this.redisService.set('tasks', JSON.stringify(this.tasks));
    await this.kafkaService.emit('task_created', newTask);
    return newTask;
  }

  async update(id: string, task: Partial<Task>): Promise<Task> {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...task };
    await this.redisService.set('tasks', JSON.stringify(this.tasks));
    await this.kafkaService.emit('task_updated', this.tasks[taskIndex]);
    return this.tasks[taskIndex];
  }

  async remove(id: string): Promise<void> {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    this.tasks.splice(taskIndex, 1);
    await this.redisService.set('tasks', JSON.stringify(this.tasks));
    await this.kafkaService.emit('task_deleted', id);
  }
}
