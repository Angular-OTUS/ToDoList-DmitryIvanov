import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskItemStatus } from '../../services';

@Component({
  selector: 'app-to-do-list-item',
  templateUrl: './to-do-list-item.component.html',
  styleUrls: ['./to-do-list-item.component.scss'],
})
export class ToDoListItemComponent {
  @Input({ required: true }) public text?: string;
  @Input({ required: true }) public status: TaskItemStatus = 'InProgress';
  @Input() public inlineEdit: boolean = false;

  @Output() public changeStatusEvent: EventEmitter<TaskItemStatus> = new EventEmitter<TaskItemStatus>();

  @Output() public deleteEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() public selectEvent: EventEmitter<void> = new EventEmitter<void>();

  @Output() public inlineEditEnterEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() public inlineEditSaveEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() public inlineEditCancelEvent: EventEmitter<void> = new EventEmitter<void>();

  public taskInput: string = '';

  public isStatusCompleted(): boolean {
    return this.status === 'Completed';
  }

  public onStatusClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.changeStatusEvent.emit(this.isStatusCompleted() ? 'InProgress' : 'Completed');
  }

  public onDelete(): void {
    this.deleteEvent.emit();
  }

  public onSelect(): void {
    this.selectEvent.emit();
  }

  public onDblClick(event: MouseEvent): void {
    event.stopPropagation();

    this.taskInput = this.text ?? '';
    this.inlineEditEnterEvent.emit();
  }

  public onSave(): void {
    this.inlineEditSaveEvent.emit(this.taskInput);
  }

  public onCancel(): void {
    this.inlineEditCancelEvent.emit();
  }
}
