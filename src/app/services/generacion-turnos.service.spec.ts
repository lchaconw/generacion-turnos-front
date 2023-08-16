import { TestBed } from '@angular/core/testing';

import { GeneracionTurnosService } from './generacion-turnos.service';

describe('GeneracionTurnosService', () => {
  let service: GeneracionTurnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneracionTurnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
