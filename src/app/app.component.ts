import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Task } from '../models/task';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todoapp';

  // task input
  taskInput = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  // list of tasks
  listTask = signal<Task[]>([
    { id: 1, title: 'Crear el Html 🏠', done: true },
    { id: 2, title: 'Crear la parte Lógica ⚙️', done: false },
    { id: 3, title: 'Añadir estilos 🎨', done: false },
    { id: 4, title: 'Chequear el código 🔎', done: false },
    { id: 5, title: 'Subir a GitHub 🚀', done: false}
  ]);

  // Method to add the task
  addTask() {
    if (this.taskInput.invalid) {
      return;
    } else {
      this.listTask.set([...this.listTask(), this.createTask()]);
      this.taskInput.reset();
    }
  }

  // Method to create the task
  createTask(): Task {
    return {
      id: this.listTask().length + 1,
      title: this.taskInput.value as string,
      done: false,
    };
  }

  // Method to delete the task
  deleteTask(id: number): void {
    this.listTask.update(prev => {
      return prev.filter(task => task.id !== id);
    });
  }

  // Method to update the task
  doneTask(id: number) {
    this.listTask.update(prev => {
      return prev.map(task => {
        if (task.id === id) {
          task.done = !task.done;
        }
        return task;
      });
    });
  }
}
