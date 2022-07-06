import { TestBed } from '@angular/core/testing';

import { ProgramFileUploadService } from './program-file-upload.service';

describe('ProgramFileUploadService', () => {
  let service: ProgramFileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramFileUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
