import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRestFormComponent } from './password-rest-form.component';

describe('PasswordRestFormComponent', () => {
  let component: PasswordRestFormComponent;
  let fixture: ComponentFixture<PasswordRestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordRestFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordRestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
