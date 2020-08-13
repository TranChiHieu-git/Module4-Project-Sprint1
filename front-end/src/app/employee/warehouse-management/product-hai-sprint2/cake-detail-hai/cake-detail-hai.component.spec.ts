import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CakeDetailHaiComponent } from './cake-detail-hai.component';

describe('CakeDetailHaiComponent', () => {
  let component: CakeDetailHaiComponent;
  let fixture: ComponentFixture<CakeDetailHaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CakeDetailHaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CakeDetailHaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
