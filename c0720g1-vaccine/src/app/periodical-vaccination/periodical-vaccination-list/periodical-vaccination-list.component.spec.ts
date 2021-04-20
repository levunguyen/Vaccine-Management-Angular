import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicalVaccinationListComponent } from './periodical-vaccination-list.component';

describe('PeriodicalVaccinationListComponent', () => {
  let component: PeriodicalVaccinationListComponent;
  let fixture: ComponentFixture<PeriodicalVaccinationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodicalVaccinationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicalVaccinationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
