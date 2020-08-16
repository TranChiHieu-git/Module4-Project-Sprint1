import {Account} from './account';
import {Order} from './order';

export class Customer {
  id: number;
  userName: string;
  birthday: Date;
  address: string;
  email: string;
  phone: string;
  gender: string;
  imageUrl: string;
  deleteFlag: boolean;
  account: Account;
  listOrder: Order[];
  total: any;

  constructor() {
  }
}

