import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineListComponent } from './vaccine-list.component';

describe('VaccineListComponent', () => {
  let component: VaccineListComponent;
  let fixture: ComponentFixture<VaccineListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaccineListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
