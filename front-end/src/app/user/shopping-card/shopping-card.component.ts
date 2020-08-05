import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../services/customer.service';
import {OrderService} from '../../services/order.service';
import {Customer} from '../../models/customer';
import {Cart} from '../../models/cart';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.scss']
})
export class ShoppingCardComponent implements OnInit {
  customer: Customer;
  orderNow: Cart[];
  tempMoney = 0;
  totalProduct = 0;

  constructor(private customerService: CustomerService,
              private orderService: OrderService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.orderService.currentCustomer.subscribe(message => {
        this.customer = message;
        console.log(this.customer);
        if (this.customer != null) {
        this.orderNow = this.customer.cartList;
        this.calTempMoney();
        }
      },
      error => {
        console.log(error);
        this.customer = null;
      });
  }

  calTempMoney() {
    this.orderNow.forEach(cart => {
      this.tempMoney += cart.id.product.price * cart.quantity;
      this.totalProduct += cart.quantity;
    });
  }

  buyLater(i: number) {
    this.tempMoney = 0;
    this.totalProduct = 0;
    this.orderNow.splice(i, 1);
    this.calTempMoney();
  }

  increase(i: number) {
    this.tempMoney = 0;
    this.totalProduct = 0;
    this.orderNow[i].quantity++;
    this.calTempMoney();
  }

  decrease(i: number) {
    this.tempMoney = 0;
    this.totalProduct = 0;
    this.orderNow[i].quantity--;
    this.calTempMoney();
  }

  toOrder() {
    this.router.navigate(['/checkout/shipping']);
  }
}
