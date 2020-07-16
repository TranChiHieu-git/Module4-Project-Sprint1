import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {Order} from '../../models/order';

@Component({
  selector: 'app-user-oders',
  templateUrl: './user-oders.component.html',
  styleUrls: ['./user-oders.component.scss']
})
export class UserOdersComponent implements OnInit {
  orders: Order[];

  constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService) {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      const id = Number(param.get('id'));
      this.orderService.findAllOrderByUserId(id).subscribe((next: any) => {
          this.orders = next.content;
        },
        error => {
          console.log(error);
          this.orders = null;
        });
    });
  }

  ngOnInit(): void {
  }

}
