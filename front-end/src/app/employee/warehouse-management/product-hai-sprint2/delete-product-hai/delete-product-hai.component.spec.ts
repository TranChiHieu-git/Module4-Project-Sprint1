import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductHaiComponent } from './delete-product-hai.component';

describe('DeleteProductHaiComponent', () => {
  let component: DeleteProductHaiComponent;
  let fixture: ComponentFixture<DeleteProductHaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteProductHaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProductHaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
