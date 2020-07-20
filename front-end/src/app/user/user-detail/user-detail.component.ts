import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  customer: User;
  idUser: number;

  constructor(private customerService: UserService,
              private activatedRoute: ActivatedRoute, private orderService: OrderService) {
    this.orderService.curentIdUser.subscribe(message => {
      this.idUser = message;
      console.log(this.idUser);
      this.customerService.getUserById(this.idUser).subscribe(next => {
          this.customer = next;
                  },
        error => {
          console.log(error);
          this.customer = null;
        });
    });

  }

  ngOnInit(): void {
  }

}
