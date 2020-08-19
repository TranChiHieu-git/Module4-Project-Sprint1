import {Department} from './department';
import {Position} from './position';

export class Employees {
  id: number;
  image: string;
  name: string;
  gender: string;
  birthday: string;
  address: string;
  phoneNumber: string;
  email: string;
  deleteFlag: boolean;
  department: Department = new Department();
  position: Position = new Position();
}
