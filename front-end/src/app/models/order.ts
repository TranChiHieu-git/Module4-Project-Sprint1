import {TypeOfShipping} from './type-of-shipping';
import {Customer} from './customer';
import {OrderDetail} from './order-detail';

export class Order {
  orderId: number;
  orderDate: Date;
  orderStatus: string;
  totalMoney: number;
  orderAddress: string;
  typeOfShipping: TypeOfShipping;
  receiver: string;
  deliveryPhoneNumber: string;
  expectedDeliveryDate: Date;
  typeOfPayment: string;
  orderedSuccess: Date;
  received: Date;
  takingOrders: Date;
  handOverShipping: Date;
  transporting: Date;
  successfulDelivery: Date;
  user: Customer;
  orderDetailList: OrderDetail[];


  constructor() {
  }
}

export class SendMomoRequest {
  accessKey: string;
  partnerCode: string;
  requestType: string;
  notifyUrl: string;
  returnUrl: string;
  orderId: string;
  amount: string;
  orderInfo: string;
  requestId: string;
  extraData: string;
  signature: string;

}

export class ReceiverMomoRequest {
  requestId: string;
  errorCode: string;
  orderId: string;
  message: string;
  localMessage: string;
  requestType: string;
  payUrl: string;
  signature: string;
}
