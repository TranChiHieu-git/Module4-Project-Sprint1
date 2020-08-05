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

// constructor(orderId: number, orderDate: Date, orderStatus: string, receiver: string, deliveryPhoneNumber: string, orderAddress: string,
  //             expectedDeliveryDate: Date, typeOfPayment: string, typeOfShipping: TypeOfShipping,
  //             orderedSuccess: string, received: string,
  //             takingOrders: string, handOverShipping: string, transporting: string,
  //             successfulDelivery: string, totalMoney: number, user: any) {
  //   this.orderId = orderId;
  //   this.orderDate = orderDate;
  //   this.orderStatus = orderStatus;
  //   this.receiver = receiver;
  //   this.deliveryPhoneNumber = deliveryPhoneNumber;
  //   this.orderAddress = orderAddress;
  //   this.expectedDeliveryDate = expectedDeliveryDate;
  //   this.typeOfPayment = typeOfPayment;
  //   this.typeOfShipping = typeOfShipping;
  //   this.orderedSuccess = orderedSuccess;
  //   this.received = received;
  //   this.takingOrders = takingOrders;
  //   this.handOverShipping = handOverShipping;
  //   this.transporting = transporting;
  //   this.successfulDelivery = successfulDelivery;
  //   this.totalMoney = totalMoney;
  //   this.user = user;
  // }
}
