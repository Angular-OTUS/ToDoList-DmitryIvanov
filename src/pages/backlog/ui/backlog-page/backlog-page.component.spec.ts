import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogPageComponent } from './backlog-page.component';

describe('BacklogPageComponent', () => {
  let component: BacklogPageComponent;
  let fixture: ComponentFixture<BacklogPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BacklogPageComponent],
    });
    fixture = TestBed.createComponent(BacklogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
