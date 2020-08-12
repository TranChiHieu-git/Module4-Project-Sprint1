import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGeneralHaiComponent } from './list-general-hai.component';

describe('ListGeneralHaiComponent', () => {
  let component: ListGeneralHaiComponent;
  let fixture: ComponentFixture<ListGeneralHaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGeneralHaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGeneralHaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
