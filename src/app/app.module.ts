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
import {
  TaskNameDirective,
  ToDoCreateItemComponent,
  ToDoFilterComponent,
  ToDoItemViewComponent,
  ToDoListComponent,
  ToDoListItemComponent,
} from './components';
import { ButtonComponent, SpinnerComponent, ToastModule } from './Shared/components';
import { TooltipDirective } from './Shared/directives';

@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    ToDoListItemComponent,
    ToDoFilterComponent,
    ToDoCreateItemComponent,
    TaskNameDirective,
    ToDoItemViewComponent,
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
