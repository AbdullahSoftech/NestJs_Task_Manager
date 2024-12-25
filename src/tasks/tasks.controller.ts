import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
    constructor(private tasksService: TasksService) { }


    @Post()
    async createTask(
        @Body('title') title: string,
        @Body('description') description: string
    ) {
        return this.tasksService.createTask(title, description);
    }

    @Get()
    async getAllTasks() {
        return this.tasksService.getAllTasks();
    }

    @Get(':id')
    async getTaskById(@Param('id', ParseIntPipe) id: number) {
        return this.tasksService.getTaskById(id);
    }

    @Patch(':id')
    async updateTask(@Param('id', ParseIntPipe) id: number, @Body('status') status: string ){
        return this.tasksService.updateTask(id, status);
    }

    @Delete(':id')
    async deleteTask(@Param('id', ParseIntPipe) id: number){
        return this.tasksService.deleteTask(id);
    }
}
