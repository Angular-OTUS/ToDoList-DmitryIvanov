import { catchError, Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskItem, TaskItems, TaskItemStatus, ToDoListService } from '../../services';
import { ToastService } from '../../Shared/components';
import { NewTask } from '../to-do-create-item';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit, OnDestroy {
  public taskItems: TaskItems = [];
  public filter: TaskItemStatus[] = ['InProgress', 'Completed'];
  public isLoading: boolean = false;
  public selectedItemId: string | null = null;
  public inlineEditItemId: string | null = null;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private toDoListService: ToDoListService,
    private toastService: ToastService
  ) {}

  public filterChange(event: TaskItemStatus[]): void {
    this.filter = event;
  }

  public filteredTaskItems(): TaskItems {
    return this.taskItems.filter((item: TaskItem) => this.filter.includes(item.status));
  }

  public selectTask(id: string): void {
    this.selectedItemId = this.selectedItemId === id ? null : id;
  }

  public selectedDescription(): string {
    const selectedItem: TaskItem | undefined = this.filteredTaskItems().find(
      (item: TaskItem) => item.id === this.selectedItemId
    );
    return selectedItem ? selectedItem.description : '';
  }

  public fetchTaskItems(): void {
    this.isLoading = true;

    this.toDoListService
      .getTaskItems()
      .pipe(catchError(this.handleError<TaskItems>('Error loading task list.', [])), takeUntil(this.destroy$))
      .subscribe((taskItems: TaskItems) => {
        this.taskItems = taskItems;
        this.isLoading = false;
      });
  }

  public addTask({ text, description }: NewTask): void {
    const newTaskItem: TaskItem = { id: String(this.getNextId()), text, description, status: 'InProgress' };
    this.toDoListService
      .addTaskItem(newTaskItem)
      .pipe(
        tap(() => this.toastService.showToast({ text: 'Task added', type: 'success' })),
        catchError(this.handleError('Error adding task.')),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
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
        tap(() => this.toastService.showToast({ text: 'Task removed', type: 'warning' })),
        catchError(this.handleError('Error deleting task.')),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.fetchTaskItems();
      });
  }

  public updateTaskStatus(id: string, status: TaskItemStatus): void {
    const idx: number = this.getTaskIdxById(id);
    if (idx < 0) {
      return;
    }

    const updatedTask: TaskItem = { ...this.taskItems[idx], status };
    this.toDoListService
      .updateTaskItem(updatedTask)
      .pipe(
        tap(() => this.showTaskStatus(status)),
        catchError(this.handleError('Error updating task status.')),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
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
    const idx: number = this.getTaskIdxById(id);
    if (idx < 0) {
      return;
    }

    const updatedTask: TaskItem = { ...this.taskItems[idx], text };
    this.toDoListService
      .updateTaskItem(updatedTask)
      .pipe(
        tap(() => this.toastService.showToast({ text: 'The task has been changed', type: 'info' })),
        catchError(this.handleError('Error updating task text.')),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.inlineEditItemId = null;
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

  private handleError<T>(errMsg: string, result?: T) {
    return (): Observable<T> => {
      this.toastService.showToast({ text: errMsg, type: 'warning' });
      return of(result as T);
    };
  }

  private getNextId(): number {
    return Math.max(0, ...this.taskItems.map((item: TaskItem) => Number(item.id))) + 1;
  }

  // Возвращает -1 если задача с таким id не найдена
  private getTaskIdxById(id: string): number {
    return this.taskItems.findIndex((item: TaskItem) => item.id === id);
  }

  private showTaskStatus(status: TaskItemStatus): void {
    if (status === 'Completed') {
      this.toastService.showToast({ text: 'Task completed', type: 'success' });
    } else {
      this.toastService.showToast({ text: 'Task in progress', type: 'warning' });
    }
  }
}
