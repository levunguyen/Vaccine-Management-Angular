import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportAndExportComponent } from './import-and-export.component';

describe('ImportAndExportComponent', () => {
  let component: ImportAndExportComponent;
  let fixture: ComponentFixture<ImportAndExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportAndExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportAndExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
