import { TestBed } from '@angular/core/testing';

import { MarkeplaceService } from './markeplace.service';

describe('MarkeplaceService', () => {
  let service: MarkeplaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkeplaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
