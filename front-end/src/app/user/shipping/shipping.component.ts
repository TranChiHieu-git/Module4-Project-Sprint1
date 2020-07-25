import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
shippingForm: FormGroup;
  constructor( private fb: FormBuilder,
               private router: Router) { }

  ngOnInit(): void {
    this.shippingForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]]

    });
  }

  onSubmit() {
this.router.navigate(['checkout/payment']);
  }
}
