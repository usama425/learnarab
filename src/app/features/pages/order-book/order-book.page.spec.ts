import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderBookPage } from './order-book.page';

describe('OrderBookPage', () => {
  let component: OrderBookPage;
  let fixture: ComponentFixture<OrderBookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBookPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
