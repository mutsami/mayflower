import { TestBed } from '@angular/core/testing';

import { VisitsFileUploadService } from './visits-file-upload.service';

describe('VisitsFileUploadService', () => {
  let service: VisitsFileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitsFileUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
