import { catchError, Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskItem, TaskItems, TaskItemStatus, ToDoListService } from '../../services/to-do-list';
import { ToastService } from '../../Shared/components/toast';
import { NewTask } from '../to-do-create-item/to-do-create-item.component';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private toDoListService: ToDoListService,
    private toastService: ToastService
  ) {}

  public taskItems: TaskItems = [];
  public filter: TaskItemStatus[] = ['InProgress', 'Completed'];
  public isLoading = false;
  public selectedItemId: string | null = null;
  public inlineEditItemId: string | null = null;

  public filterChange(event: TaskItemStatus[]): void {
    this.filter = event;
  }

  public filteredTaskItems(): TaskItems {
    return this.taskItems.filter(item => this.filter.includes(item.status));
  }

  public selectTask(id: string): void {
    this.selectedItemId = this.selectedItemId === id ? null : id;
  }

  public selectedDescription(): string {
    const selectedItem = this.filteredTaskItems().find(item => item.id === this.selectedItemId);
    return selectedItem ? selectedItem.description : '';
  }

  public fetchTaskItems(): void {
    this.isLoading = true;

    this.toDoListService
      .getTaskItems()
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          this.toastService.showToast({ text: 'Error loading task list.', type: 'warning' });
          throw new Error(error);
        })
      )
      .subscribe(taskItems => {
        this.taskItems = taskItems;
        this.isLoading = false;
      });
  }

  public addTask({ text, description }: NewTask): void {
    const nextId = 1 + Math.max(0, ...this.taskItems.map(item => Number(item.id)));
    const newTaskItem: TaskItem = { id: String(nextId), text, description, status: 'InProgress' };
    this.toDoListService
      .addTaskItem(newTaskItem)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          this.toastService.showToast({ text: 'Error adding task.', type: 'warning' });
          throw new Error(error);
        })
      )
      .subscribe(() => {
        this.toastService.showToast({ text: 'Task added', type: 'success' });
        this.fetchTaskItems();
      });
  }

  public delTask(id: string): void {
    if (this.selectedItemId === id) {
      this.selectedItemId = null;
    }

    this.toDoListService
      .deleteTaskItem(id)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          this.toastService.showToast({ text: 'Error deleting task.', type: 'warning' });
          throw new Error(error);
        })
      )
      .subscribe(() => {
        this.toastService.showToast({ text: 'Task removed', type: 'warning' });
        this.fetchTaskItems();
      });
  }

  // Возвращает -1 если задача с таким id не найдена
  private getTaskIdxById(id: string): number {
    return this.taskItems.findIndex(item => item.id === id);
  }

  public updateTaskStatus(id: string, status: TaskItemStatus): void {
    const idx = this.getTaskIdxById(id);
    if (idx < 0) {
      return;
    }

    const updatedTask = { ...this.taskItems[idx], status };
    this.toDoListService
      .updateTaskItem(updatedTask)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          this.toastService.showToast({ text: 'Error updating task status.', type: 'warning' });
          throw new Error(error);
        })
      )
      .subscribe(() => {
        if (status === 'Completed') {
          this.toastService.showToast({ text: 'Task completed', type: 'success' });
        } else {
          this.toastService.showToast({ text: 'Task in progress', type: 'warning' });
        }
        this.fetchTaskItems();
      });
  }

  public inlineEditEnter(id: string): void {
    this.inlineEditItemId = id;
  }

  public inlineEditorSave(id: string, text: string): void {
    if (this.inlineEditItemId !== id) {
      return;
    }
    const idx = this.getTaskIdxById(id);
    if (idx < 0) {
      return;
    }

    const updatedTask = { ...this.taskItems[idx], text };
    this.toDoListService
      .updateTaskItem(updatedTask)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          this.toastService.showToast({ text: 'Error updating task text.', type: 'warning' });
          throw new Error(error);
        })
      )
      .subscribe(() => {
        this.toastService.showToast({ text: 'The task has been changed', type: 'info' });
        this.fetchTaskItems();
      });
  }

  public inlineEditorCancel(id: string): void {
    if (this.inlineEditItemId === id) {
      this.inlineEditItemId = null;
    }
  }

  public ngOnInit(): void {
    this.fetchTaskItems();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
