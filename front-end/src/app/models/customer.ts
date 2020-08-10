import {Account} from './account';

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
  listOrder: any;
  total: any;

  constructor() {
  }
}

