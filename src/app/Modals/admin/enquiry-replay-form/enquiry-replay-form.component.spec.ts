import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryReplayFormComponent } from './enquiry-replay-form.component';

describe('EnquiryReplayFormComponent', () => {
  let component: EnquiryReplayFormComponent;
  let fixture: ComponentFixture<EnquiryReplayFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnquiryReplayFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryReplayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
