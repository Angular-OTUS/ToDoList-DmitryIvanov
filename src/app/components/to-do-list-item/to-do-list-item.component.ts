import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskItemStatus } from '../../services/to-do-list';

@Component({
  selector: 'app-to-do-list-item',
  templateUrl: './to-do-list-item.component.html',
  styleUrls: ['./to-do-list-item.component.scss'],
})
export class ToDoListItemComponent {
  @Input({ required: true }) text!: string;
  @Input({ required: true }) status!: TaskItemStatus;
  @Input() inlineEdit = false;

  @Output() changeStatusEvent = new EventEmitter<TaskItemStatus>();

  @Output() deleteEvent = new EventEmitter();
  @Output() selectEvent = new EventEmitter();

  @Output() inlineEditEnterEvent = new EventEmitter();
  @Output() inlineEditSaveEvent = new EventEmitter<string>();
  @Output() inlineEditCancelEvent = new EventEmitter();

  public taskInput = '';

  public isStatusCompleted(): boolean {
    return this.status === 'Completed';
  }

  public onStatusClick(event: MouseEvent): void {
    event.preventDefault();
    this.changeStatusEvent.emit(this.isStatusCompleted() ? 'InProgress' : 'Completed');
  }

  public onDelete(): void {
    this.deleteEvent.emit();
  }

  public onSelect(): void {
    this.selectEvent.emit();
  }

  public onDblClick(): void {
    this.taskInput = this.text;
    this.inlineEditEnterEvent.emit();
  }

  public onSave(): void {
    this.inlineEditSaveEvent.emit(this.taskInput);
  }

  public onCancel(): void {
    this.inlineEditCancelEvent.emit();
  }
}
