import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../../services/order.service';
import {Customer} from '../../../models/customer';
import {Cart} from '../../../models/cart';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  product;
  productId;
  customer: Customer;
  productQuantity = 1;
  cart: Cart;

  constructor(public productService: ProductService,
              public activatedRoute: ActivatedRoute,
              private orderService: OrderService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => this.productId = data.id);
    this.productService.getProductById(this.productId).subscribe(next => {
      this.product = next;
    });
    this.orderService.currentCustomer.subscribe(cus => {
      this.customer = cus;
    });
  }

  addToCarts(): void {
    this.spinnerOn();
    this.orderService.createCart(this.product, this.customer, this.productQuantity).toPromise().then(res => {
      this.spinnerOff();
      this.notificationService.config.horizontalPosition = 'center';
      this.notificationService.create('Thêm sản phẩm vào giỏ hàng thành công');
    });
  }

  spinnerOn(): void {
    document.getElementById('overlay').style.display = 'flex';
  }

  spinnerOff(): void {
    document.getElementById('overlay').style.display = 'none';
  }
}
