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
  orders: Order[];
  idUser: number;
  isCurrentOrder = false;
  orderDetails: OrderDetail[];
  totalMoney = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private orderService: OrderService,
              private router: Router
  ) {
      }

  ngOnInit(): void {
    this.orderService.currentIdUser.subscribe(message => {
      this.idUser = message;
      this.orderService.findAllOrderByUserId(this.idUser).subscribe((next: any) => {
          this.orders = next.content;
          console.log(this.orders);
          this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
            const idOrder = Number(param.get('idOrder'));
            this.orders.forEach(order => {
              if (order.orderId === idOrder) {
                this.isCurrentOrder = true;
                return;
              }
            });
            if (this.isCurrentOrder) {
              this.orderService.findOrderById(idOrder).subscribe(res => {
                  this.order = res;
                  console.log(this.order);
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
            }
          });
        },
        error => {
          console.log(error);
          this.orders = null;
        });
    });
  }

  // tslint:disable-next-line:typedef
  cancelOrder(orderId: number) {
    this.orderService.cancelOrder(orderId).subscribe(
      res => {
        alert('Hủy đơn hàng thành công');
        this.ngOnInit();
      },
      error => {
        console.log(error);
      }
    );
  }
}
