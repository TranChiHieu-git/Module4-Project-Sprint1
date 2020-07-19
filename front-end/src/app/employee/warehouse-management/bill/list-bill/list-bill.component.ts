import {ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Bill} from '../bill';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServiceBillService} from '../service-bill.service';
import {WareHouse} from '../../../../models/ware-house';
import {Transportation} from '../../../../models/transportation';
import {TypeBill} from '../../../../models/type-bill';
import {Employee} from '../../../employee';
import {StorageLocation} from '../../../../models/storage-location';
import {Distributor} from '../../../../models/distributor';
import {Pay} from '../../../../models/pay';

@Component({
  selector: 'app-list-bill',
  templateUrl: './list-bill.component.html',
  styleUrls: ['./list-bill.component.scss']
})
export class ListBillComponent implements OnInit, OnChanges {

  public wareHouses: WareHouse[];
  public transportation: Transportation[];
  public typeBills: TypeBill[];
  public storageLocations: StorageLocation[];
  public employees: Employee[];
  public distributors: Distributor[];
  public pays: Pay[];
  bill2 = new Bill();
  public bill: Bill;
  isCollapsed = true;
  @Input() groupFilters: Bill;
  @Input() searchByKeyword: string;

  users: any[] = [];
  filteredUsers: any[] = [];
  key = 'name'; // set default
  reverse = false;
  myForm: FormGroup;
  createForm: FormGroup;
  p = 1;

  sort(key): void{
    this.key = key;
    this.reverse = !this.reverse;
  }

  constructor(private userService: ServiceBillService,
              private ref: ChangeDetectorRef,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      billName: ['', Validators.required],
      createDate: ['', Validators.required],
      billStatus: ['', Validators.required],
      processingStatus: ['', Validators.required],
      shippingStatus: ['', Validators.required],
      paymentStatus: ['', Validators.required],
      idTypeBill: this.fb.group({
        id: [''],
        nameTypeBill: ['']
      }),
      idStorageLocation: this.fb.group({
        id: [''],
        nameStorageLocation: ['']
      }),
      idWareHouse: this.fb.group({
        id: [''],
        nameWarehouse: ['']
      }),
      idTransportation: this.fb.group({
        id: [''],
        nameTransportation: ['']
      }),
      idPay: this.fb.group({
        id: [''],
        namePay: ['']
      }),
      idDistributor: this.fb.group({
        id: [''],
        name: ['']
      }),
      idEmployee: this.fb.group({
        id: [''],
        name: ['']
      }),
      deleteFlag: [0]
    });
    this.userService.findAllTypeBill().subscribe(
      next => this.typeBills = next,
      error => {
        this.typeBills = [];
        console.log(error);
      });
    this.userService.findAllPay().subscribe(
      next => this.pays = next,
      error => {
        this.pays = [];
        console.log(error);
      });
    this.userService.findAllEmployee().subscribe(
      next => this.employees = next,
      error => {
        this.employees = [];
        console.log(error);
      });
    this.userService.findAllDistributors().subscribe(
      next => this.distributors = next,
      error => {
        this.distributors = [];
        console.log(error);
      });
    this.userService.findAllStorageLocation().subscribe(
      next => this.storageLocations = next,
      error => {
        this.storageLocations = [];
        console.log(error);
      });
    this.userService.findAllTransportation().subscribe(
      next => this.transportation = next,
      error => {
        this.transportation = [];
        console.log(error);
      });
    this.userService.findAllWarehouse().subscribe(
      next => this.wareHouses = next,
      error => {
        this.wareHouses = [];
        console.log(error);
      });
    this.loadUsers();
    this.myForm = this.fb.group({
      id: [''],
      billName: ['', Validators.required],
      createDate: ['', Validators.required],
      billStatus: ['', Validators.required],
      processingStatus: ['', Validators.required],
      shippingStatus: ['', Validators.required],
      paymentStatus: ['', Validators.required],
      idTypeBill: this.fb.group({
        id: ['', Validators.required],
        nameTypeBill: ['']
      }),
      idStorageLocation: this.fb.group({
        id: [''],
        nameStorageLocation: ['']
      }),
      idWareHouse: this.fb.group({
        id: [''],
        nameWarehouse: ['']
      }),
      idTransportation: this.fb.group({
        id: [''],
        nameTransportation: ['']
      }),
      idPay: this.fb.group({
        id: [''],
        namePay: ['']
      }),
      idDistributor: this.fb.group({
        id: [''],
        name: ['']
      }),
      idEmployee: this.fb.group({
        id: [''],
        name: ['']
      }),
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
          this.wareHouses = data;
        });
        this.userService.findAllTransportation().subscribe(data => {
          this.transportation = data;
        });
        this.userService.findAllStorageLocation().subscribe(data => {
          this.storageLocations = data;
        });
        this.userService.findAllDistributors().subscribe(data => {
          this.distributors = data;
        });
        this.userService.findAllEmployee().subscribe(data => {
          this.employees = data;
        });
        this.userService.findAllPay().subscribe(data => {
          this.pays = data;
        });
        this.userService.findAllTypeBill().subscribe(data => {
          this.typeBills = data;
        });
        this.myForm.patchValue(next);
      },
      error =>
        console.log('error')
    );
  }
  detailBill(isCollapsed: boolean, id: number): void{
    this.userService.findByIdBill(id).subscribe(
      next => this.bill2 = next,
      error => console.log(error)
    );
  }
  deleteBill(id: number): void{
    this.userService.deleteById(id).subscribe(next => {
      window.location.reload();
    }, error => {
      console.log(error);
    });
  }
  onSubmit(): void {
    if (this.myForm.valid) {
      const {value} = this.myForm;
      const data = {
        ...this.bill,
        ...value
      };
      this.userService.updateBill(data).subscribe(
        next => {
          window.location.reload();
        },
        error => console.log(error)
      );
    }

  }

  createBill(): void{
    if (this.createForm.valid) {
      const {value} = this.createForm;
      const data = {
        ...this.bill,
        ...value
      };
      this.userService.create(data).subscribe(
        next => {
          window.location.reload();
        },
        error => console.log(error)
      );
    }
  }

}
