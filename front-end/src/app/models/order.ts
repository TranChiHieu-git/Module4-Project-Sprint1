export class Order {
  orderId: number;
  orderDate: string;
  orderStatus: string;
  orderAddress: string;
  totalMoney: number;
  user: any;
  orderDetailList: any;


  constructor(orderId: number, orderDate: string, orderStatus: string, orderAddress: string,
              totalMoney: number, user: any, orderDetailList: any) {
    this.orderId = orderId;
    this.orderDate = orderDate;
    this.orderStatus = orderStatus;
    this.orderAddress = orderAddress;
    this.totalMoney = totalMoney;
    this.user = user;
    this.orderDetailList = orderDetailList;
  }
}
