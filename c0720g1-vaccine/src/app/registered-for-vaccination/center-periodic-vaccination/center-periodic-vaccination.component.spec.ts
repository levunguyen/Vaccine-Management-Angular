import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterPeriodicVaccinationComponent } from './center-periodic-vaccination.component';

describe('CenterPeriodicVaccinationComponent', () => {
  let component: CenterPeriodicVaccinationComponent;
  let fixture: ComponentFixture<CenterPeriodicVaccinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterPeriodicVaccinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterPeriodicVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
