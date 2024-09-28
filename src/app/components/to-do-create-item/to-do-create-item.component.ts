import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

export type NewTask = {
  text: string;
  description: string;
};

@Component({
  selector: 'app-to-do-create-item',
  templateUrl: './to-do-create-item.component.html',
  styleUrls: ['./to-do-create-item.component.scss'],
})
export class ToDoCreateItemComponent {
  public newTask: NewTask = { text: '', description: '' };

  @Output() addTaskEvent = new EventEmitter<NewTask>();

  public onSubmit(newTaskForm: NgForm): void {
    console.log(newTaskForm);
    const { text, description }: NewTask = newTaskForm.value;
    this.addTaskEvent.emit({ text, description });
    this.newTask.text = this.newTask.description = '';
  }
}
