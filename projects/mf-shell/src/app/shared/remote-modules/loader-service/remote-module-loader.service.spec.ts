import { TestBed } from '@angular/core/testing';

import { RemoteModuleLoader } from './remote-module-loader.service';

describe('RemoteModuleLoader', () => {
  let service: RemoteModuleLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoteModuleLoader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
