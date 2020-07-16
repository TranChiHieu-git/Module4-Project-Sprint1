import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {Order} from '../../models/order';
import {OrderDetail} from '../../models/order-detail';

@Component({
  selector: 'app-user-oder-detail',
  templateUrl: './user-oder-detail.component.html',
  styleUrls: ['./user-oder-detail.component.scss']
})
export class UserOderDetailComponent implements OnInit {
  order: Order;
  orderDetails: OrderDetail[];
  totalMoney = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private orderService: OrderService,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      const idOrder = Number(param.get('idOrder'));
      this.orderService.findOrderById(idOrder).subscribe(next => {
          this.order = next;
          this.orderDetails = this.order.orderDetailList;
          this.orderDetails.forEach(product => {
            product.temMoney = product.orderQuantity * product.id.product.price;
            this.totalMoney += product.temMoney;
          });
        },
        error => {
          console.log(error);
          this.order = null;
        });
    });
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  cancelOrder(orderId: number) {
    this.orderService.cancelOrder(orderId).subscribe(
      res => {
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }
}
