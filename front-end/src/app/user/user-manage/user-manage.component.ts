import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {
  idUser = 0;
  idOrder = 0;

  constructor(private orderService: OrderService) {
    this.orderService.curentIdUser.subscribe(message => this.idUser = message);
    // this.orderService.curentIdOrder.subscribe(message => this.idOrder = message);

  }

  ngOnInit(): void {
  }


}
