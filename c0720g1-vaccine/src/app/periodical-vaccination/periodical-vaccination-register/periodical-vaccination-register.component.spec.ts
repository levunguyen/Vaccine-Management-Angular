import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicalVaccinationRegisterComponent } from './periodical-vaccination-register.component';

describe('PeriodicalVaccinationRegisterComponent', () => {
  let component: PeriodicalVaccinationRegisterComponent;
  let fixture: ComponentFixture<PeriodicalVaccinationRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodicalVaccinationRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicalVaccinationRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
