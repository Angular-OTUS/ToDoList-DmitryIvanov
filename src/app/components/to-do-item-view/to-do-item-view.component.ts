import { Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TaskItem, TaskItems, ToDoListService } from '../../services';

@Component({
  selector: 'app-to-do-item-view',
  templateUrl: './to-do-item-view.component.html',
  styleUrls: ['./to-do-item-view.component.scss'],
})
export class ToDoItemViewComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  private taskId: string | null = null;
  private taskItems: TaskItems = [];

  constructor(
    private toDoListService: ToDoListService,
    private route: ActivatedRoute
  ) {}

  public getDescription(): string {
    const taskItem: TaskItem | undefined = this.taskItems.find((item: TaskItem) => item.id === this.taskId);
    return taskItem ? taskItem.description : '';
  }

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((paramMap: ParamMap) => (this.taskId = paramMap.get('taskId')));

    this.toDoListService
      .getTaskItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe((taskItems: TaskItems) => (this.taskItems = taskItems));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
