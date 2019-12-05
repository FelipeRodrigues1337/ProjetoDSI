import { TestBed } from '@angular/core/testing';

import { SetorService } from './setor.service';

describe('SetorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetorService = TestBed.get(SetorService);
    expect(service).toBeTruthy();
  });
});
