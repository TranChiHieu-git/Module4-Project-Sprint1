import {WareHouse} from './ware-house';

export class Bill {
  // id: number;
  // name: string;
  // prefix: string;
  // email: string;
  // position: string;
  // gender: string;

  id: number;
  billName: string;
  createDate: Date;
  billStatus: string;
  processingStatus: string;
  shippingStatus: string;
  paymentStatus: string;
  idTypeBill: number;
  idStorageLocation: number;
  idWareHouse: string;
  idTransportation: string;
  idPay: number;
  idDistributor: number;
  idEmployee: number;
  deleteFlag: boolean;

  constructor() {
  }
}
