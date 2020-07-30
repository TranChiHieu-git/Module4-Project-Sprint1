import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

declare var paypal;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  // @ViewChild('paypal', {static: true}) paypalElement: ElementRef;
  shippingCost = 14000;
  shippingMethod = 'shipping-standard';
  tempMoney: number;
  totalMoney: number;
  totalUSD: number;
  product = {
    price: 0,
    description: 'Thanh toán hóa đơn mua hàng'
  };

  paidFor = false;

  constructor(private router: Router) {
    this.tempMoney = 122000;
    this.totalMoney = this.tempMoney + this.shippingCost;
    this.totalUSD = Number((this.totalMoney / 23000).toFixed(2));

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

      $('#divShippingStandard').addClass('show');

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

// Render paypal//
    this.product.price = this.totalUSD;
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.product.description,
                amount: {
                  currency_code: 'USD',
                  value: this.product.price
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.paidFor = true;
          console.log(order);
        },
        onError: err => {
          console.log(err);
        }
      })
      .render('#paypal-container');

  }

  oncheck(typeShipping: string) {
    if (typeShipping === 'shipping-now') {
      this.shippingCost = 25000;
    } else {
      this.shippingCost = 14000;
    }
    this.totalMoney = this.tempMoney + this.shippingCost;
    this.totalUSD = Number((this.totalMoney/ 23000).toFixed(2));
  }

  order() {
    this.router.navigate(['/checkout/payment-success']);
  }
}
