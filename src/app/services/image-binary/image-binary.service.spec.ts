import { TestBed } from '@angular/core/testing';

import { ImageBinaryService } from './image-binary.service';

describe('ImageBinaryService', () => {
  let service: ImageBinaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageBinaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
