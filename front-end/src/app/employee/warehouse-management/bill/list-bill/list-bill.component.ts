import {ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Bill} from '../bill';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ServiceBillService} from '../service-bill.service';
import {WareHouse} from '../ware-house';
import {Transportation} from '../../../../models/transportation';
import {TypeBill} from '../../../../models/type-bill';
import {StorageLocation} from '../../../../models/storage-location';
import {Pay} from '../../../../models/pay';

@Component({
  selector: 'app-list-bill',
  templateUrl: './list-bill.component.html',
  styleUrls: ['./list-bill.component.scss']
})
export class ListBillComponent implements OnInit, OnChanges {
  // infoAccountById: wareHouses = new WareHouse();
  public wareHouseList: WareHouse[];
  public transportation: Transportation[];
  public typeBills: TypeBill[];
  public storageLocations: StorageLocation[];
  public pays: Pay[];
  bill2 = new Bill();
  public bill: Bill;
  isCollapsed = true;
  @Input() groupFilters: Bill;
  @Input() searchByKeyword: string;

  users: Bill[] = [];
  filteredUsers: any[] = [];
  key = 'name'; // set default
  reverse = false;
  myForm: FormGroup;
  p = 1;

  sort(key): void{
    this.key = key;
    this.reverse = !this.reverse;
  }

  constructor(private userService: ServiceBillService,
              private ref: ChangeDetectorRef,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadUsers();
    this.myForm = this.fb.group({
      id: [''],
      billName: [''],
      createDate: [''],
      billStatus: [''],
      processingStatus: [''],
      shippingStatus: [''],
      paymentStatus: [''],
      idTypeBill: [this.fb.group({
        id: [''],
        nameTypeBill: ['']
      })],
      idStorageLocation: [this.fb.group({
        id: [''],
        nameStorageLocation: ['']
      })],
      idWareHouse: [this.fb.group({
        id: [''],
        nameWarehouse: ['']
      })],
      idTransportation: [this.fb.group({
        id: [''],
        nameTransportation: ['']
      })],
      idPay: [this.fb.group({
        id: [''],
        namePay: ['']
      })],
      idDistributor: [''],
      idEmployee: [''],
      deleteFlag: ['']
    });
  }


  ngOnChanges(): void {
    if (this.groupFilters) { this.filterUserList(this.groupFilters, this.users); }
  }

  filterUserList(filters: any, users: Bill[]): void {
    this.filteredUsers = this.users;     // Reset User List

    const keys = Object.keys(filters);
    const filterUser = user => keys.every(key => user[key] === filters[key]);

    this.filteredUsers = this.users.filter(filterUser);

    this.ref.detectChanges();
  }

  loadUsers(): void {
    this.userService.findAllUser()
      .subscribe(users => this.users = users);

    this.filteredUsers = this.filteredUsers.length > 0 ? this.filteredUsers : this.users;
  }
  editBill(id: number): void{
    this.userService.findByIdBill(id).subscribe(
      next => {
        this.bill = next;
        this.userService.findAllWarehouse().subscribe(data => {
          this.wareHouseList = data;
        });
        this.userService.findAllTransportation().subscribe(data => {
          this.transportation = data;
        });
        this.userService.findAllStorageLocation().subscribe(data => {
          this.storageLocations = data;
        });
        this.userService.findAllPay().subscribe(data => {
          this.pays = data;
        });
        this.userService.findAllTypeBill().subscribe(data => {
          this.typeBills = data;
          console.log(this.typeBills);
        });
        this.myForm.patchValue(next);
      },
      error =>
        console.log('error')
    );
    // this.userService.findByIdBill(id).subscribe(next => {
    //   this.myForm.patchValue({
    //     id: next.id,
    //     billName: next.billName,
    //     createDate: next.createDate,
    //     billStatus: next.billStatus,
    //     processingStatus: next.processingStatus,
    //     shippingStatus: next.shippingStatus,
    //     paymentStatus: next.paymentStatus,
    //     idTypeBill: next.idTypeBill,
    //     idStorageLocation: next.idStorageLocation,
    //     idWareHouse: next.idWareHouse.nameWarehouse,
    //     this.userService.findByIdWareHouse(id).subscribe(next => {
    //       this.id = next;
    //     }, error => {
    //       console.log(error);
    //     }),
    //     idTransportation: next.idTransportation,
    //     idPay: next.idPay,
    //     idDistributor: next.idDistributor,
    //     idEmployee: next.idEmployee,
    //     deleteFlag: next.deleteFlag,
    //   });
    // }, error => {
    //   console.log(error);
    // });
    // this.userService.findByIdWareHouse(id).subscribe(next => {
    //   this.id = next;
    // }, error => {
    //   console.log(error);
    // });
    // this.userService.findAllWarehouse().subscribe(next => {
    //   this.wareHouseList = next;
    // }, error => {
    //   console.log(error);
    // });
  }
  detailBill(isCollapsed: boolean, id: number): void{
    this.userService.findByIdBill(id).subscribe(
      next => this.bill2 = next,
      error => console.log(error)
    );
  }
  onSubmit(): void {
    // this.bill = new Bill();
    // this.bill.id = this.myForm.value.id;
    // this.bill.billName = this.myForm.value.billName;
    // this.bill.createDate = this.myForm.value.createDate;
    // this.bill.billStatus = this.myForm.value.billStatus;
    // this.bill.processingStatus = this.myForm.value.processingStatus;
    // this.bill.shippingStatus = this.myForm.value.shippingStatus;
    // this.bill.paymentStatus = this.myForm.value.paymentStatus;
    // this.bill.idTypeBill = this.myForm.value.idTypeBill;
    // this.bill.idStorageLocation = this.myForm.value.idStorageLocation;
    // this.bill.idWareHouse = this.myForm.value.idWareHouse;
    // this.bill.idTransportation = this.myForm.value.idTransportation;
    // this.bill.idPay = this.myForm.value.idPay;
    // this.bill.idDistributor = this.myForm.value.idDistributor;
    // this.bill.idEmployee = this.myForm.value.idEmployee;
    // this.bill.deleteFlag = this.myForm.value.deleteFlag;
    //
    //
    // this.userService.findByIdWareHouse(this.myForm.value.role).subscribe(next => {
    //   this.bill.idWareHouse = next;
    //   this.userService.updateBill(this.bill).subscribe(next2 => {
    //     window.location.reload();
    //   }, error => {
    //     console.log(error);
    //   });
    // }, error => {
    //   console.log(error);
    // });
  }

}
