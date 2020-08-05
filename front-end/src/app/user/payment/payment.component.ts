import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {Order} from '../../models/order';
import {Cart} from '../../models/cart';
import {Customer} from '../../models/customer';
import {TypeOfShipping} from '../../models/type-of-shipping';
import {IdOrderDetail, OrderDetail} from '../../models/order-detail';

declare var paypal;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  // @ViewChild('paypal', {static: true}) paypalElement: ElementRef;
  customer: Customer;
  typeOfShipping: TypeOfShipping = new TypeOfShipping(1, 'Giao ngay', 14000);
  shippingMethod = 'shipping-standard';
  tempMoney = 0;
  totalProduct = 0;
  totalMoney = 0;
  totalUSD = 0;
  order: Order = new Order();
  orderNow: Cart[];
  product = {
    price: 0,
    description: 'Thanh toán hóa đơn mua hàng'
  };

  paidFor = false;

  constructor(private router: Router,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.orderService.currentCustomer.subscribe(result => {
      this.customer = result;
      this.orderService.currentOrder.subscribe(message => {
        this.order = message;
        if (this.order === null) {
          this.order = new Order();
          if (this.customer != null) {
            this.order.deliveryPhoneNumber = this.customer.phone;
            this.order.receiver = this.customer.userName;
            this.order.orderAddress = this.customer.address;
            this.orderNow = this.customer.cartList;
            this.typeOfShipping.cost = 14000;
            this.calMoney();
          }
        } else {
          this.orderNow = this.customer.cartList;
          this.calMoney();
        }
      }, error => {
        console.log(error);

      });
    }, error => {
      console.log(error);
    });
    // tslint:disable-next-line:only-arrow-functions typedef
    $(document).ready(function() {
      // tslint:disable-next-line:typedef
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

      // tslint:disable-next-line:typedef
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

  // tslint:disable-next-line:typedef
  onChecked(typeShipping: string) {
    if (typeShipping === 'shipping-now') {
      this.typeOfShipping.cost = 25000;
      this.typeOfShipping.id = 1;
      this.typeOfShipping.name = 'Giao ngay';
    } else {
      this.typeOfShipping.cost = 14000;
      this.typeOfShipping.id = 2;
      this.typeOfShipping.name = 'Giao tiêu chuẩn';
    }
    this.totalMoney = this.tempMoney + this.typeOfShipping.cost;
    this.totalUSD = Number((this.totalMoney / 23000).toFixed(2));
  }

  // tslint:disable-next-line:typedef
  ordered() {
    // this.order.orderId = null;
    this.order.orderDate = new Date();
    this.order.orderStatus = 'Đang xử lý';
    // const today = new Date();
    // const tomorrow = new Date(today);
    // tomorrow.setDate(tomorrow.getDate() + 1);
    this.order.expectedDeliveryDate = null;
    // this.typeOfShipping.id === '1' ? this.order.expectedDeliveryDate.setDate(this.order.orderDate.getDate() + 1)
    //   : this.order.expectedDeliveryDate.setDate(this.order.orderDate.getDate() + 3);
    this.order.typeOfPayment = 'Thanh toán tiền mặt khi nhận hàng';
    this.order.typeOfShipping = this.typeOfShipping;
    this.order.orderedSuccess = null;
    this.order.received = null;
    this.order.takingOrders = null;
    this.order.handOverShipping = null;
    this.order.transporting = null;
    this.order.successfulDelivery = null;
    this.order.totalMoney = this.totalMoney;
    this.order.user = this.customer;
    console.log(this.order);
    this.order.user.cartList.forEach(cart => {
      const orderDetailPk = new IdOrderDetail(cart.id.product, this.order);
      const orderDetail = new OrderDetail(orderDetailPk, cart.quantity);
      console.log(orderDetail);
      this.orderService.createOrderDetail(orderDetail).subscribe(res => {

      }, error => {
        console.log(error);
      });
    });
    this.orderService.createOrder(this.order).subscribe(next => {
      this.router.navigate(['/checkout/payment-success']);

    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line:typedef
  calMoney() {

    this.orderNow.forEach(cart => {
      this.totalProduct += cart.quantity;

      this.tempMoney += cart.id.product.price * cart.quantity;
    });
    this.totalMoney = this.tempMoney + this.typeOfShipping.cost;
    this.totalUSD = Number((this.totalMoney / 23000).toFixed(2));
  }
}
