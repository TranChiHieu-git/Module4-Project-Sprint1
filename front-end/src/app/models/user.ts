import {Order} from './order';
export class OrderFake {
  orderId: string;
  orderDate: string;
  orderStatus: string;
  orderAddress: string;
  totalMoney: number;
}
export class User {
  id: number;
  userName: string;
  birthday: Date;
  address: string;
  email: string;
  phone: string;
  gender: string;
  imageUrl: string;
  deleteFlag: boolean;
  listOrder: Order[];
  account: null;
  constructor() {
  }
}

