import {Role} from './role';
export class Account {
  accountId: number;
  accountName: string;
  accountPassword: string;
  deleteFlag: boolean;
  role: Role;
}
