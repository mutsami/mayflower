import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolUploadListComponent } from './school-upload-list.component';

describe('SchoolUploadListComponent', () => {
  let component: SchoolUploadListComponent;
  let fixture: ComponentFixture<SchoolUploadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolUploadListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolUploadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
