import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCakeHaiComponent } from './list-cake-hai.component';

describe('ListCakeHaiComponent', () => {
  let component: ListCakeHaiComponent;
  let fixture: ComponentFixture<ListCakeHaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCakeHaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCakeHaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
