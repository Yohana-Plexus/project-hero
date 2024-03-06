import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApiRestService } from './api-rest.service';

describe('ApiRestService', () => {
  let service: ApiRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
