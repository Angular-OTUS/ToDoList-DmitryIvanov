import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { TaskItemStatus } from '../../services/to-do-list';

type TaskStatusFilter = TaskItemStatus[];

@Component({
  selector: 'app-to-do-filter',
  templateUrl: './to-do-filter.component.html',
  styleUrls: ['./to-do-filter.component.scss'],
})
export class ToDoFilterComponent {
  @Input() value: TaskStatusFilter = [];
  @Output() valueChange = new EventEmitter<TaskStatusFilter>();

  public onChange(event: MatButtonToggleChange): void {
    this.valueChange.emit(event.value as TaskStatusFilter);
  }
}
