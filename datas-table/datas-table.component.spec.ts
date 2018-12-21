import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasTableComponent } from './datas-table.component';

describe('DatasTableComponent', () => {
  let component: DatasTableComponent;
  let fixture: ComponentFixture<DatasTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
