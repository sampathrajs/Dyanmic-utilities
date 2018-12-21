import { TestBed, inject } from '@angular/core/testing';

import { DynamicroutesService } from './dynamicroutes.service';

describe('DynamicroutesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicroutesService]
    });
  });

  it('should be created', inject([DynamicroutesService], (service: DynamicroutesService) => {
    expect(service).toBeTruthy();
  }));
});
