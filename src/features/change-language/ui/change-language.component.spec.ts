import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLanguageComponent } from './change-language.component';

describe('ChangeLanguageComponent', () => {
  let component: ChangeLanguageComponent;
  let fixture: ComponentFixture<ChangeLanguageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChangeLanguageComponent],
    });
    fixture = TestBed.createComponent(ChangeLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
