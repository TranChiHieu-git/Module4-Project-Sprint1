import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {Customer} from '../../models/customer';
import {Order} from '../../models/order';
@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  shippingForm: FormGroup;
  customer: Customer;
  order: Order = new Order();

  constructor(private fb: FormBuilder,
              private router: Router,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.orderService.currentCustomer.subscribe(message => {
      this.customer = message;
    }, error => {
      console.log(error);
      this.customer = null;
    });
    this.shippingForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]]

    });
    $(document).ready(function() {
      $('#other-address').click(function() {
        $('#other-address-form').addClass('show');
        $('#name').focus();
        $('select').selectize({
          sortField: 'text'
        });
      });
      $('#cancel').click(function() {
        $('#other-address-form').removeClass('show');
      });
    });
  }

  onSubmit(): void {
    this.order.orderAddress = this.customer.address;
    this.order.receiver = (this.customer.userName);
    this.order.deliveryPhoneNumber = (this.customer.phone);
    this.orderService.chanceOrder(this.order);
    this.router.navigate(['checkout/payment']);
  }

  onSubmitOther(): void {
    this.router.navigate(['checkout/payment']);

  }
}
