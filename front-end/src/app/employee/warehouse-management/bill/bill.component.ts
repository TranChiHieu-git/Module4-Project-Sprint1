import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ServiceBillService} from '../../../services/service-bill.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Bill} from '../../../models/bill';
import {WareHouse} from '../../../models/ware-house';
import {Transportation} from '../../../models/transportation';
import {StorageLocation} from '../../../models/storage-location';
import {Distributor} from '../../../models/distributor';
import {Employees} from '../../../models/employees';
import {Pay} from '../../../models/pay';
import {TypeBill} from '../../../models/type-bill';
import {NotificationService} from '../../../services/notification.service';
import {Product} from '../../../models/product';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  @ViewChild('closeEditModal') closeEditModal;
  @ViewChild('closeDeleteModal') closeDeleteModal;
  @ViewChild('closeCreateModal') closeCreateModal;
  billList: Bill[];
  wareHouseList: WareHouse[];
  transportationList: Transportation[];
  storageLocationList: StorageLocation[];
  distributorList: Distributor[];
  employeeList: Employees[];
  payList: Pay[];
  typeBillList: TypeBill[];
  bill: Bill;
  public billName: string;
  public createDate: Date;
  createForm: FormGroup;
  editForm: FormGroup;
  p = 1;
  filter: any;

  constructor(private billService: ServiceBillService,
              private ref: ChangeDetectorRef,
              private fb: FormBuilder,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getAllBills();
    this.buildEditForm();
    this.initCreateForm();
  }
  buildEditForm(): void{
    this.editForm = this.fb.group({
      id: [''],
      billName: ['', Validators.required],
      createDate: ['', Validators.required],
      editLatestDate: ['', Validators.required],
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
        nameWareHouse: ['']
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
    this.getAllWareHouse();
    this.getAllStorageLocation();
    this.getAllTransportation();
    this.getAllDistributors();
    this.getAllEmployee();
    this.getAllPay();
    this.getAllTypeBill();
  }
  private getAllWareHouse(): void {
    this.billService.findAllWarehouse().subscribe(data => {
      this.wareHouseList = data;
    });
  }
  private getAllTransportation(): void {
    this.billService.findAllTransportation().subscribe(data => {
      this.transportationList = data;
    });
  }
  private getAllStorageLocation(): void {
    this.billService.findAllStorageLocation().subscribe(data => {
      this.storageLocationList = data;
    });
  }
  private getAllDistributors(): void {
    this.billService.findAllDistributors().subscribe(data => {
      this.distributorList = data;
    });
  }
  private getAllEmployee(): void {
    this.billService.findAllEmployee().subscribe(data => {
      this.employeeList = data;
    });
  }
  private getAllPay(): void {
    this.billService.findAllPay().subscribe(data => {
      this.payList = data;
    });
  }
  private getAllTypeBill(): void {
    this.billService.findAllTypeBill().subscribe(data => {
      this.typeBillList = data;
    });
  }
  getAllBills(): void{
    this.billService.findAllBill().subscribe(
      next => this.billList = next,
      error => {
        this.billList = [];
        console.log(error);
      });
  }

  editBill(id: number): void {
    this.billService.findByIdBill(id).subscribe(next => {
      this.editForm.patchValue(next);
      },
      error => console.log('error'));
  }
  onSubmitEdit(): void {
    if (this.editForm.valid) {
      const {value} = this.editForm;
      const data = {
        ...this.bill,
        ...value
      };
      this.billService.updateBill(data).subscribe(
        next => {
          this.closeEditModal.nativeElement.click();
          this.notificationService.edit('Chỉnh sửa thành công');
        },
        error => console.log(error));
    }
    else {
      this.notificationService.edit('Xin lỗi! Bạn chưa chỉnh sửa xong');
    }
  }

  deleteBill(id: number): void {
    this.billService.findByIdBill(id).subscribe(next => {
      this.billName = next.billName;
      this.createDate = next.createDate;
      this.bill = next;
    });
  }

  OnDelete(id: number): void {
    this.billService.deleteById(id).subscribe(
      next => {
        this.closeDeleteModal.nativeElement.click();
        this.notificationService.delete('Xóa thành công');
        this.billList = this.billList.filter(bill => bill.id !== id);
      },
      error => console.log(error)
    );
  }

  onCreate(): void {
    if (this.createForm.valid) {
      const {value} = this.createForm;
      const data = {
        ...this.bill,
        ...value
      };
      this.billService.create(data).subscribe(
        next => {
          this.closeCreateModal.nativeElement.click();
          this.notificationService.create('Tạo mới thành công');
          window.location.reload();
        },
        error => console.log(error)
      );
    }
    else {
      this.notificationService.create('Xin lỗi! Bạn chưa thể thêm phiếu. Xin hãy xem lại!!');
    }
  }

  initCreateForm(): void {
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
        nameWareHouse: ['']
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
  }
}
