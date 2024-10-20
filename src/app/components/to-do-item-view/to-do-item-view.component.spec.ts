import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoItemViewComponent } from './to-do-item-view.component';

describe('ToDoItemViewComponent', () => {
  let component: ToDoItemViewComponent;
  let fixture: ComponentFixture<ToDoItemViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToDoItemViewComponent],
    });
    fixture = TestBed.createComponent(ToDoItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
