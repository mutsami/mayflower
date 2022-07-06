import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramUploadFormComponent } from './program-upload-form.component';

describe('ProgramUploadFormComponent', () => {
  let component: ProgramUploadFormComponent;
  let fixture: ComponentFixture<ProgramUploadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramUploadFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
