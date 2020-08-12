import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductHaiComponent } from './create-product-hai.component';

describe('CreateProductHaiComponent', () => {
  let component: CreateProductHaiComponent;
  let fixture: ComponentFixture<CreateProductHaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProductHaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductHaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
