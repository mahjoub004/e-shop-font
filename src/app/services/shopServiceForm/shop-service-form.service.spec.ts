import { TestBed } from '@angular/core/testing';

import { ShopServiceFormService } from './shop-service-form.service';

describe('ShopServiceFormService', () => {
  let service: ShopServiceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopServiceFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
