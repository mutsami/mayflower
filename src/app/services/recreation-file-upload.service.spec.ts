import { TestBed } from '@angular/core/testing';

import { RecreationFileUploadService } from './recreation-file-upload.service';

describe('RecreationFileUploadService', () => {
  let service: RecreationFileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecreationFileUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
