import { TestBed } from '@angular/core/testing';

import { ServiceSentoolService } from './service-sentool.service';

describe('ServiceSentoolService', () => {
  let service: ServiceSentoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceSentoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
