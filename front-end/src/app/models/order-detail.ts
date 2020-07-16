import {Product} from './product';

export class OrderDetail {
  private _id: IdOrderDetail;
  private _orderQuantity: number;
  private _temMoney: number;

  constructor(id: IdOrderDetail, orderQuantity: number, temMoney: number) {
    this._id = id;
    this._orderQuantity = orderQuantity;
    this._temMoney = temMoney;
  }

  get id(): IdOrderDetail {
    return this._id;
  }

  set id(value: IdOrderDetail) {
    this._id = value;
  }

  get orderQuantity(): number {
    return this._orderQuantity;
  }

  set orderQuantity(value: number) {
    this._orderQuantity = value;
  }

  get temMoney(): number {
    return this._temMoney;
  }

  set temMoney(value: number) {
    this._temMoney = value;
  }
}
export class IdOrderDetail {
  product: Product;
}
