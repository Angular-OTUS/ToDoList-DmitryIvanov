import { Subject, Subscription, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RouteTokens } from '../../app-routing.module';
import { TaskItem, TaskItems, TaskItemStatus, ToDoListService } from '../../services';
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
  private changeSelectedItem?: Subscription;

  constructor(
    private toDoListService: ToDoListService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public goToTask(id: string): void {
    if (this.selectedItemId === id) {
      return this.clearSelectedItem();
    }

    void this.router.navigate([id], { relativeTo: this.route }).then(() => this.subscribeToChangeSelectedItem());
  }

  public filterChange(event: TaskItemStatus[]): void {
    this.filter = event;
  }

  public filteredTaskItems(): TaskItems {
    return this.taskItems.filter((item: TaskItem) => this.filter.includes(item.status));
  }

  public fetchTaskItems(): void {
    this.isLoading = true;

    this.toDoListService
      .getTaskItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe((taskItems: TaskItems) => {
        this.taskItems = taskItems;
        this.isLoading = false;
      });

    this.toDoListService.fetchTaskItems();
  }

  public addTask({ text, description }: NewTask): void {
    const newTaskItem: TaskItem = { id: String(this.getNextId()), text, description, status: 'InProgress' };
    this.toDoListService.addTaskItem(newTaskItem);
  }

  public delTask(id: string): void {
    this.toDoListService.deleteTaskItem(id);
    if (this.selectedItemId === id) {
      this.clearSelectedItem();
    }
  }

  public updateTaskStatus(id: string, status: TaskItemStatus): void {
    const idx: number = this.getTaskIdxById(id);
    if (idx < 0) {
      return;
    }

    const updatedTask: TaskItem = { ...this.taskItems[idx], status };
    this.toDoListService.updateTaskItem(updatedTask);
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
    this.toDoListService.updateTaskItem(updatedTask);
    this.inlineEditItemId = null;
  }

  public inlineEditorCancel(id: string): void {
    if (this.inlineEditItemId === id) {
      this.inlineEditItemId = null;
    }
  }

  public ngOnInit(): void {
    this.subscribeToChangeSelectedItem();
    this.fetchTaskItems();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private clearSelectedItem(): void {
    this.unSubscribeToChangeSelectedItem();
    this.selectedItemId = null;
    void this.router.navigateByUrl(`/${RouteTokens.Tasks}`);
  }

  private unSubscribeToChangeSelectedItem(): void {
    if (this.changeSelectedItem) {
      this.changeSelectedItem.unsubscribe();
      this.changeSelectedItem = undefined;
    }
  }

  private subscribeToChangeSelectedItem(): void {
    if (this.route.firstChild && !this.changeSelectedItem) {
      this.changeSelectedItem = this.route.firstChild.paramMap
        .pipe(takeUntil(this.destroy$))
        .subscribe((paramMap: ParamMap) => (this.selectedItemId = paramMap.get('taskId')));
    }
  }

  private getNextId(): number {
    return Math.max(0, ...this.taskItems.map((item: TaskItem) => Number(item.id))) + 1;
  }

  // Возвращает -1 если задача с таким id не найдена
  private getTaskIdxById(id: string): number {
    return this.taskItems.findIndex((item: TaskItem) => item.id === id);
  }
}
