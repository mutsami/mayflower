import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramUploadListComponent } from './program-upload-list.component';

describe('ProgramUploadListComponent', () => {
  let component: ProgramUploadListComponent;
  let fixture: ComponentFixture<ProgramUploadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramUploadListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramUploadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
