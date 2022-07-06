import { TestBed } from '@angular/core/testing';

import { SchoolFileUploadService } from './school-file-upload.service';

describe('SchoolFileUploadService', () => {
  let service: SchoolFileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolFileUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
