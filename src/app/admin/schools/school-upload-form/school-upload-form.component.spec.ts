import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolUploadFormComponent } from './school-upload-form.component';

describe('SchoolUploadFormComponent', () => {
  let component: SchoolUploadFormComponent;
  let fixture: ComponentFixture<SchoolUploadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolUploadFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
