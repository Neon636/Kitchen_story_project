import { TestBed } from '@angular/core/testing';

import { NehaService } from './neha.service';

describe('NehaService', () => {
  let service: NehaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NehaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
