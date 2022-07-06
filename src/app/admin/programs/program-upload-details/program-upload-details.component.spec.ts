import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramUploadDetailsComponent } from './program-upload-details.component';

describe('ProgramUploadDetailsComponent', () => {
  let component: ProgramUploadDetailsComponent;
  let fixture: ComponentFixture<ProgramUploadDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramUploadDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramUploadDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
