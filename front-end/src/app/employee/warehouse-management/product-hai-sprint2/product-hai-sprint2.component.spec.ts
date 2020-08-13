import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHaiSprint2Component } from './product-hai-sprint2.component';

describe('ProductHaiSprint2Component', () => {
  let component: ProductHaiSprint2Component;
  let fixture: ComponentFixture<ProductHaiSprint2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductHaiSprint2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductHaiSprint2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
