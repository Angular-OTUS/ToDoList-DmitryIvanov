import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskNameDirective } from './components/to-do-create-item/task-name.directive';
import { ToDoCreateItemComponent } from './components/to-do-create-item/to-do-create-item.component';
import { ToDoFilterComponent } from './components/to-do-filter/to-do-filter.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { ToDoListItemComponent } from './components/to-do-list-item/to-do-list-item.component';
import { ButtonComponent } from './Shared/components/button';
import { SpinnerComponent } from './Shared/components/spinner';
import { ToastModule } from './Shared/components/toast';
import { TooltipDirective } from './Shared/directives/tooltip/tooltip.directive';

@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    ToDoListItemComponent,
    ToDoFilterComponent,
    ToDoCreateItemComponent,
    TaskNameDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ButtonComponent,
    MatTooltipModule,
    TooltipDirective,
    MatIconModule,
    ToastModule.forRoot(),
    SpinnerComponent,
    MatCheckboxModule,
    MatButtonToggleModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
