import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitsUploadFormComponent } from './visits-upload-form.component';

describe('VisitsUploadFormComponent', () => {
  let component: VisitsUploadFormComponent;
  let fixture: ComponentFixture<VisitsUploadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitsUploadFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
