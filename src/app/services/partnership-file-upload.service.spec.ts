import { TestBed } from '@angular/core/testing';

import { PartnershipFileUploadService } from './partnership-file-upload.service';

describe('PartnershipFileUploadService', () => {
  let service: PartnershipFileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartnershipFileUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
