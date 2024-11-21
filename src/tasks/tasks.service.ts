import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

export interface User {
  name: string;
  age: number;
}

@Injectable()
export class TasksService {
  private tasks = [];
  getTasks() {
    return this.tasks;
  }

  getTask(id: number) {
    const taskFound= this.tasks.find((task) => task.id === id);

    if(!taskFound){
      return new NotFoundException(`¡La tarea con id=${id} no fué encontrada!`)
    }

    return taskFound;
  }

  createTask(task: CreateTaskDto) {
    this.tasks.push({
      ...task,
      id: this.tasks.length + 1,
    });
    return task;
  }

  updateTask() {
    return 'Actualizando la tarea';
  }

  deleteTask() {
    return 'Eliminando la tarea';
  }
}
