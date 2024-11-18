import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurhistoryComponent } from './ourhistory.component';

describe('OurhistoryComponent', () => {
  let component: OurhistoryComponent;
  let fixture: ComponentFixture<OurhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OurhistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
