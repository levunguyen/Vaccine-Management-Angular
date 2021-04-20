import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelRegisterComponent } from './cancel-register.component';

describe('CancelRegisterComponent', () => {
  let component: CancelRegisterComponent;
  let fixture: ComponentFixture<CancelRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
