import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    $(document).ready(function() {
      $('input:radio[name=Regarding]').change(function() {
        if (this.id === 'paypal') {

          $('#divPaypal').addClass('show');

        } else {
          $('#divPaypal').removeClass('show');
        }
        if (this.id === 'other2') {
          $('#divOther2').addClass('show');
        } else {
          $('#divOther2').removeClass('show');
        }
      });

      $('input:radio[name=shipping-method]').change(function() {
        if (this.id === 'shipping-now') {

          $('#divShippingNow').addClass('show');

        } else {
          $('#divShippingNow').removeClass('show');
        }
        if (this.id === 'shipping-standard') {
          $('#divShippingStandard').addClass('show');
        } else {
          $('#divShippingStandard').removeClass('show');
        }
      });
    });

  }

}
