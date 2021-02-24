import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorMarketComponent } from './histor-market.component';

describe('HistorMarketComponent', () => {
  let component: HistorMarketComponent;
  let fixture: ComponentFixture<HistorMarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorMarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
