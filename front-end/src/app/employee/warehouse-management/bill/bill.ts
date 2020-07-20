import {TypeBill} from '../../../models/type-bill';
import {StorageLocation} from '../../../models/storage-location';
import {WareHouse} from '../../../models/ware-house';
import {Transportation} from '../../../models/transportation';
import {Pay} from '../../../models/pay';
import {Distributor} from '../../../models/distributor';
import {Employee} from '../../employee';

export class Bill {
  id: number;
  billName: string;
  createDate: Date;
  billStatus: string;
  processingStatus: string;
  shippingStatus: string;
  paymentStatus: string;
  idTypeBill: TypeBill;
  idStorageLocation: StorageLocation;
  idWareHouse: WareHouse;
  idTransportation: Transportation;
  idPay: Pay;
  idDistributor: Distributor;
  idEmployee: Employee;
  deleteFlag: boolean;

  constructor() {
  }
}
