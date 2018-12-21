import { TestBed } from '@angular/core/testing';

import { ProductcategoryService } from './productcategory.service';

describe('ProductcategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductcategoryService = TestBed.get(ProductcategoryService);
    expect(service).toBeTruthy();
  });
});
