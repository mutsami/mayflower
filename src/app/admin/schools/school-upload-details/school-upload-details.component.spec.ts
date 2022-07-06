import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolUploadDetailsComponent } from './school-upload-details.component';

describe('SchoolUploadDetailsComponent', () => {
  let component: SchoolUploadDetailsComponent;
  let fixture: ComponentFixture<SchoolUploadDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolUploadDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolUploadDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
