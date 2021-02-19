import { TestBed } from '@angular/core/testing';

import { AdminMakerService } from './admin-maker.service';

describe('AdminMakerService', () => {
  let service: AdminMakerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminMakerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
