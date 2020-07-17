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
  idOrder: number;

  constructor(private activatedRoute: ActivatedRoute,
              private orderService: OrderService,
              private router: Router
  ) {
    this.orderService.curentIdOrder.subscribe(message => {
      this.idOrder = message;
      this.orderService.findOrderById(this.idOrder).subscribe(next => {
          this.order = next;
          // lấy id user từ service
          this.orderService.chanceIdUser(this.order.user.id);
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
        this.router.navigate(['/user-manage/user-order']);
        alert("Hủy đơn hàng thành công");
      },
      error => {
        console.log(error);
      }
    );
  }
}
