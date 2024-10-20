import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoItemViewComponent, ToDoListComponent } from './components';

export enum RouteTokens {
  Tasks = 'tasks',
}

export enum RouteParams {
  TaskId = 'taskId',
}

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: `${RouteTokens.Tasks}`,
    pathMatch: 'full',
  },
  {
    path: `${RouteTokens.Tasks}`,
    component: ToDoListComponent,
    children: [
      {
        path: `:${RouteParams.TaskId}`,
        component: ToDoItemViewComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: `/${RouteTokens.Tasks}`,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
