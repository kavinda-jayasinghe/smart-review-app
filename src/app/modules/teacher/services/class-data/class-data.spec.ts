import { TestBed } from '@angular/core/testing';

import { ClassData } from './class-data';

describe('ClassData', () => {
  let service: ClassData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
