import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ) { }

    async createTask(title: string, description: string): Promise<Task> {
        const task = this.taskRepository.create({ title, description });
        return await this.taskRepository.save(task);
    }

    async getAllTasks(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    async getTaskById(id: number): Promise<Task> {
        return await this.taskRepository.findOne({ where: { id: id } });

    }

    async updateTask(id: number, status: string): Promise<Task> {
        const task = await this.taskRepository.findOne({ where: { id: id } });
        task.status = status;
        return await this.taskRepository.save(task);
    }

    async deleteTask(id: number): Promise<void> {
        const task = await this.taskRepository.delete(id);
    }
}
