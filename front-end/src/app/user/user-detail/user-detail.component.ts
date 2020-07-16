import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../services/customer.service';
import {Customer} from '../../models/customer';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  customer: Customer;

  constructor(private customerService: CustomerService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      const idUser = Number(param.get('idUser'));
      this.customerService.getCustomerById(idUser).subscribe(next => {
          {
            this.customer = next;
          }
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
