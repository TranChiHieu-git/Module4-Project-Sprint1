import {Product} from './product';

export class OrderDetail {
  id: IdOrderDetail;
  orderQuantity: number;
  temMoney: number;


  constructor(id: IdOrderDetail, orderQuantity: number, temMoney: number) {
    this.id = id;
    this.orderQuantity = orderQuantity;
    this.temMoney = temMoney;
  }
}

export class IdOrderDetail {
  product: Product;
}
