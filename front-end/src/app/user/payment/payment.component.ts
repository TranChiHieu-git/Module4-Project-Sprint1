import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {Order, ReceiverMomoRequest, SendMomoRequest} from '../../models/order';
import {Cart} from '../../models/cart';
import {Customer} from '../../models/customer';
import {TypeOfShipping} from '../../models/type-of-shipping';
import {IdOrderDetail, OrderDetail} from '../../models/order-detail';
import {NotificationService} from '../../services/notification.service';
import * as cryptoJS from '../../../assets/js/crypto-js.min.js';

declare var paypal;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  customer: Customer;
  typeOfShipping: TypeOfShipping = new TypeOfShipping(2, 'Giao tiêu chuẩn', 14000);
  paymentMethod = 'Thanh toán bằng tiền mặt khi nhận hàng';
  tempMoney = 0;
  totalProduct = 0;
  totalMoney = 0;
  totalUSD = 0;
  guestOrder: Order = new Order();
  orderNow: Cart[];
  product = {
    price: 0,
    description: 'Thanh toán hóa đơn mua hàng'
  };
  errorCode: string;
  paidFor = false;
  newOrderId: string;
  newOrderReceiverDate: string;

  constructor(private router: Router,
              private orderService: OrderService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.getData();


    this.renderRadioButton();
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
          this.spinnerOn();
          const order = await actions.order.capture();
          this.paidFor = true;
          this.paymentMethod = 'Đã thanh toán bằng PayPal';
          await this.createOrder();
          await this.createOrderDetails();
        },
        onError: err => {
          console.log(err);
        }
      })
      .render('#paypal-container');

  }

  checkMoMoPaid(): void {
    const urlString = window.location.href;
    const url = new URL(urlString);
    this.errorCode = url.searchParams.get('errorCode');
    if (this.errorCode === '0') {
      console.log(this.guestOrder.user);
      this.spinnerOn();
      this.paymentMethod = 'Đã thanh toán bằng ví MoMo';
      this.createOrder().then(next => {
        this.createOrderDetails().then();
      });
    } else if (this.errorCode !== null) {
      this.notificationService.config.horizontalPosition = 'center';
      this.notificationService.create('Thanh toán không thành công,vui lòng thử lại !');
    }
  }

  private renderRadioButton(): void {
    // tslint:disable-next-line:only-arrow-functions typedef
    $(document).ready(function() {
      // tslint:disable-next-line:typedef
      $('input:radio[name=Regarding]').change(function() {
        if (this.id === 'paypal') {
          $('#divPaypal').addClass('show');

        } else {
          $('#divPaypal').removeClass('show');
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
  }

  getData(): void {
    this.orderService.currentCustomer.subscribe(result => {
      this.customer = result;
      this.orderService.currentOrder.subscribe(message => {
        this.guestOrder = message;
        if (this.guestOrder === null) {
          this.guestOrder = new Order();
          if (this.customer != null) {
          this.guestOrder.deliveryPhoneNumber = this.customer.phone;
          this.guestOrder.receiver = this.customer.userName;
          this.guestOrder.orderAddress = this.customer.address;
          this.orderNow = this.customer.cartList;
          this.typeOfShipping.cost = 14000;
          this.guestOrder.user = this.customer;
          this.calMoney();
          this.checkMoMoPaid();
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
  }

  onChecked(typeShipping: string): void {
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

  ordered(): void {
    if (this.paymentMethod === 'Đã thanh toán bằng ví điện tử MoMo') {
      this.momo();
    } else if (this.paymentMethod === 'Thanh toán bằng tiền mặt khi nhận hàng') {
      this.spinnerOn();
      this.createOrder().then(res => {
        this.createOrderDetails().then(r => {
        });
      });

    } else {
      this.notificationService.config.horizontalPosition = 'center';
      this.notificationService.create('Thanh toán không thành công,vui lòng thử lại !');
    }
  }

  private async createOrderDetails(): Promise<void> {
    await this.orderService.createOrder(this.guestOrder).toPromise().then(result => {
      this.newOrderId = result.orderId;
      this.newOrderReceiverDate = result.expectedDeliveryDate;
      this.guestOrder.user.cartList.forEach(cart => {
        const orderDetailPk = new IdOrderDetail(cart.id.product, result);
        const orderDetail = new OrderDetail(orderDetailPk, cart.quantity);
        this.orderService.deleteCart(cart, this.customer).subscribe();
        this.orderService.createOrderDetail(orderDetail).subscribe(res => {
        }, error => {
          console.log(error);
        });
      });
    });
    this.spinnerOff();
    await this.router.navigate(['/checkout/payment-success', {
      newOrderId: this.newOrderId,
      newOrderReceiverDate: this.newOrderReceiverDate
    }]);

  }

  async createOrder(): Promise<void> {
    this.guestOrder.orderDate = new Date();
    this.guestOrder.expectedDeliveryDate = new Date();
    this.typeOfShipping.id === 1 ? this.guestOrder.expectedDeliveryDate.setDate(this.guestOrder.orderDate.getDate() + 1)
      : this.guestOrder.expectedDeliveryDate.setDate(this.guestOrder.orderDate.getDate() + 3);
    this.guestOrder.typeOfPayment = this.paymentMethod;
    this.guestOrder.orderStatus = (this.paymentMethod === 'Thanh toán bằng tiền mặt khi nhận hàng') ? 'Đang xử lý' : 'Đặt hàng thành công';
    this.guestOrder.typeOfShipping = this.typeOfShipping;
    this.guestOrder.orderedSuccess = (this.paymentMethod === 'Thanh toán bằng tiền mặt khi nhận hàng') ? null : new Date();
    this.guestOrder.received = null;
    this.guestOrder.takingOrders = null;
    this.guestOrder.handOverShipping = null;
    this.guestOrder.transporting = null;
    this.guestOrder.successfulDelivery = null;
    this.guestOrder.totalMoney = this.totalMoney;
    this.guestOrder.user = this.customer;
  }

  calMoney(): void {
    this.orderNow.forEach(cart => {
      this.totalProduct += cart.quantity;
      this.tempMoney += cart.id.product.price * cart.quantity;
    });
    this.totalMoney = this.tempMoney + this.typeOfShipping.cost;
    this.totalUSD = Number((this.totalMoney / 23000).toFixed(2));
  }

  spinnerOn(): void {
    document.getElementById('overlay').style.display = 'flex';
  }

  spinnerOff(): void {
    document.getElementById('overlay').style.display = 'none';
  }

  momo(): void {
    this.spinnerOn();
    const orderMomoId = new Date().getTime().toString();
    const signatureString = 'partnerCode=' + 'MOMODOW720200810' +
      '&accessKey=' + 'NNbGn5noGrZseuzL' +
      '&requestId=' + orderMomoId +
      '&amount=' + this.totalMoney +
      '&orderId=' + orderMomoId +
      '&orderInfo=' + 'Thanh toán đơn hàng' +
      '&returnUrl=' + 'http://localhost:4200/checkout/payment' +
      '&notifyUrl=' + 'https://momo.vn' +
      '&extraData=' + 'email=abc@gmail.com';
    const secret = 'Ryz4fRw1pukvVm2ZrnoWxSwGspMaH46f';
    const signatureHex = cryptoJS.HmacSHA256(signatureString, secret);
    let sendMomoRequest: SendMomoRequest;
    let receiverMomoRequest: ReceiverMomoRequest;
    sendMomoRequest = {
      accessKey: 'NNbGn5noGrZseuzL',
      partnerCode: 'MOMODOW720200810',
      requestType: 'captureMoMoWallet',
      notifyUrl: 'https://momo.vn',
      returnUrl: 'http://localhost:4200/checkout/payment',
      orderId: orderMomoId,
      amount: this.totalMoney.toString(),
      orderInfo: 'Thanh toán đơn hàng',
      requestId: orderMomoId,
      extraData: 'email=abc@gmail.com',
      signature: signatureHex.toString()
    };
    this.orderService.getReceiverMomoRequest(sendMomoRequest).toPromise().then(next => {
      receiverMomoRequest = next;
      console.log(receiverMomoRequest);
      if (receiverMomoRequest.errorCode.toString() === '0') {
        this.spinnerOff();
        window.location.href = receiverMomoRequest.payUrl;

      } else {
        this.notificationService.config.horizontalPosition = 'center';
        this.notificationService.create('Có lỗi khi liên kết với MoMo, vui lòng thử lại !');
        this.spinnerOff();
      }
    });
  }
}
