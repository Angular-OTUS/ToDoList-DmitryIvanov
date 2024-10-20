import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { ToastService } from '../../Shared/components';
import { TaskItem, TaskItems } from './to-do-list.types';

@Injectable({
  providedIn: 'root',
})
export class ToDoListService {
  private apiUrl: string = environment.apiUrl;
  private taskItemsSubject: BehaviorSubject<TaskItems>;

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) {
    this.taskItemsSubject = new BehaviorSubject<TaskItems>([]);
  }

  public getTaskItems(): Observable<TaskItems> {
    return this.taskItemsSubject.asObservable();
  }

  public fetchTaskItems(): void {
    this.http
      .get<TaskItems>(this.apiUrl)
      .pipe(catchError(this.handleError<TaskItems>('Error loading task list.', [])))
      .subscribe((taskItems: TaskItems) => this.taskItemsSubject.next(taskItems));
  }

  private handleError<T>(errMsg: string, result?: T) {
    return (): Observable<T> => {
      this.toastService.showToast({ text: errMsg, type: 'warning' });
      return of(result as T);
    };
  }

  public addTaskItem(taskItem: TaskItem): void {
    this.http
      .post<TaskItem>(this.apiUrl, taskItem)
      .pipe(
        tap(() => this.toastService.showToast({ text: 'Task added', type: 'success' })),
        catchError(this.handleError('Error adding task.'))
      )
      .subscribe(() => this.fetchTaskItems());
  }

  public updateTaskItem(taskItem: TaskItem): void {
    this.http
      .put<TaskItem>(`${this.apiUrl}/${taskItem.id}`, taskItem)
      .pipe(
        tap(() => this.toastService.showToast({ text: 'Task updated', type: 'success' })),
        catchError(this.handleError('Error updating task status.'))
      )
      .subscribe(() => this.fetchTaskItems());
  }

  public deleteTaskItem(id: string): void {
    this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => this.toastService.showToast({ text: 'Task removed', type: 'warning' })),
        catchError(this.handleError('Error deleting task.'))
      )
      .subscribe(() => this.fetchTaskItems());
  }
}
