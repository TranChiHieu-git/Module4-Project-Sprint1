import {Position} from './position';
import {Account} from './account';
import {Department} from './department';

export class Employee {
  id: number;
  image: string;
  name: string;
  gender: string;
  birthday: string;
  address: string;
  department: Department = new Department();
  position: Position = new Position();
  phoneNumber: string;
  email: string;
  account: Account;

  constructor() {
  }
}
