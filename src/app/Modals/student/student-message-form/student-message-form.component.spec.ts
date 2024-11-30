import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMessageFormComponent } from './student-message-form.component';

describe('StudentMessageFormComponent', () => {
  let component: StudentMessageFormComponent;
  let fixture: ComponentFixture<StudentMessageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentMessageFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentMessageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
