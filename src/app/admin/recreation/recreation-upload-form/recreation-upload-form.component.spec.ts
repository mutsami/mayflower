import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecreationUploadFormComponent } from './recreation-upload-form.component';

describe('RecreationUploadFormComponent', () => {
  let component: RecreationUploadFormComponent;
  let fixture: ComponentFixture<RecreationUploadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecreationUploadFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecreationUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
