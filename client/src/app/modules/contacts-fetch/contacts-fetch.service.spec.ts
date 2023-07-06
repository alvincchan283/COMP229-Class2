import { TestBed } from '@angular/core/testing';

import { ContactsFetchService } from './contacts-fetch.service';

describe('ContactsFetchService', () => {
  let service: ContactsFetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsFetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
