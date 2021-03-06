import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ServiceBillService} from '../../../services/service-bill.service';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Bill} from '../../../models/bill';
import {WareHouse} from '../../../models/ware-house';
import {Transportation} from '../../../models/transportation';
import {StorageLocation} from '../../../models/storage-location';
import {Distributor} from '../../../models/distributor';
import {Employees} from '../../../models/employees';
import {Pay} from '../../../models/pay';
import {TypeBill} from '../../../models/type-bill';
import {NotificationService} from '../../../services/notification.service';
import {CustomPaginationService} from '../../../services/pagination/custom-pagination.service';
import {Page} from '../../../models/pagination/page';

function whiteSpaceValidator(control: AbstractControl): ValidationErrors | null {
  if ((control.value as string).indexOf(' ') >= 1){
    return {whiteSpaceValidator: true};
  }
  return null;
}
function whiteAllSpaceValidator(control: AbstractControl): ValidationErrors | null {
  const isWhitespace = (control.value as string).trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}
function removeSpace(control: AbstractControl): ValidationErrors | null {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
    console.log(control.value);
    return { removeSpace: true };
  }
  else {
    return null;
  }
}

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})


export class BillComponent implements OnInit {
  @ViewChild('closeEditModal') closeEditModal;
  @ViewChild('closeDeleteModal') closeDeleteModal;
  @ViewChild('closeCreateModal') closeCreateModal;
  page: Page<Bill> = new Page();
  billList: Bill[];
  wareHouseList: WareHouse[];
  transportationList: Transportation[];
  storageLocationList: StorageLocation[];
  distributorList: Distributor[];
  employeeList: Employees[];
  payList: Pay[];
  typeBillList: TypeBill[];
  bill: Bill;
  billSubmit: Bill;
  public billName: string;
  public createDate: Date;
  createForm: FormGroup;
  editForm: FormGroup;
  form: FormGroup;
  formArray: FormArray = new FormArray([]);
  p = 1;
  today: string;
  filter: any;

  constructor(private billService: ServiceBillService,
              private ref: ChangeDetectorRef,
              private fb: FormBuilder,
              private paginationService: CustomPaginationService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.today = new Date().toISOString().split('T')[0];
    this.getData();
    this.buildEditForm();
    this.initCreateForm();
    this.createAddLiveForm();
    this.form = this.fb.group({rows: new FormArray([])});
  }

  buildEditForm(): void {
    this.editForm = this.fb.group({
      id: [''],
      billName: ['', [Validators.required, Validators.pattern(/^[^~!@#$%^&*()_+]+$/), whiteSpaceValidator, removeSpace]],
      createDate: [''],
      editLatestDate: [''],
      billStatus: ['', [Validators.required, Validators.pattern(/^[^~!@#$%^&*()_+]+$/), removeSpace]],
      processingStatus: ['', [Validators.required, Validators.pattern(/^[^~!@#$%^&*()_+]+$/), removeSpace]],
      shippingStatus: ['', [Validators.required, Validators.pattern(/^[^~!@#$%^&*()_+]+$/), removeSpace]],
      paymentStatus: ['', [Validators.required, Validators.pattern(/^[^~!@#$%^&*()_+]+$/), removeSpace]],
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

  getAllBills(): void {
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
          this.getData();
        },
        error => console.log(error));
      this.switchEdit(this.billSubmit);
    } else {
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
        this.getData();
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
          this.getData();
        },
        error => console.log(error)
      );
    } else {
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

  private getData(): void {
    this.billService.getPage(this.page.pageable)
      .subscribe(page => {
        this.page = page;
      });
  }

  public getNextPage(): void {
    this.page.pageable = this.paginationService.getNextPage(this.page);
    this.getData();
  }

  public getPreviousPage(): void {
    this.page.pageable = this.paginationService.getPreviousPage(this.page);
    this.getData();
  }

  public getPageInNewSize(pageSize: number): void {
    this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
    this.getData();
  }
  switchEdit(bill1: Bill): void {
    bill1.isEditable = !bill1.isEditable;
    // $('#submit' + bill1.id).click();
  }
  switchEdit2(bill1: Bill): void {
    $('#submit' + bill1.id).click();
  }

  cancelEdit(bill1: Bill): void {
    bill1.isEditable = !bill1.isEditable;
    this.getData();
  }
  get rows(): FormArray {
    return this.form.get('rows') as FormArray;
  }
  addRow(): void {
    this.formArray.push(this.createAddLiveForm());
  }

  removeRow(index: number): void {
    this.formArray.removeAt(index);
  }
  onSubmitSingleRow(formArray, index): void {
    if (this.formArray.valid) {
      const {value} = this.formArray.at(index);
      const data = {
        ...this.bill,
        ...value
      };
      this.billService.create(data).subscribe(
        () => {
          this.removeRow(index);
          this.notificationService.create('Tạo mới thành công');
          this.getData();
        },
        error => console.log(error));
    } else {
      this.notificationService.create('Xin lỗi! Bạn chưa thể thêm phiếu. Xin hãy xem lại!!');
    }
  }
  createAddLiveForm(): FormGroup {
    return this.fb.group({
      billName: ['', [Validators.required, Validators.pattern(/^[^~!@#$%^&*()_+]+$/), whiteSpaceValidator, removeSpace]],
      createDate: [''],
      editLatestDate: [''],
      billStatus: ['', [Validators.required, Validators.pattern(/^[^~!@#$%^&*()_+]+$/), removeSpace]],
      processingStatus: ['', [Validators.required, Validators.pattern(/^[^~!@#$%^&*()_+]+$/), removeSpace]],
      shippingStatus: ['', [Validators.required, Validators.pattern(/^[^~!@#$%^&*()_+]+$/), removeSpace]],
      paymentStatus: ['', [Validators.required, Validators.pattern(/^[^~!@#$%^&*()_+]+$/), removeSpace]],
      idTypeBill: this.fb.group({
        id: ['', Validators.required],
        nameTypeBill: ['']
      }),
      idStorageLocation: this.fb.group({
        id: ['', Validators.required],
        nameStorageLocation: ['']
      }),
      idWareHouse: this.fb.group({
        id: ['', Validators.required],
        nameWareHouse: ['']
      }),
      idTransportation: this.fb.group({
        id: ['', Validators.required],
        nameTransportation: ['']
      }),
      idPay: this.fb.group({
        id: ['', Validators.required],
        namePay: ['']
      }),
      idDistributor: this.fb.group({
        id: ['', Validators.required],
        name: ['']
      }),
      idEmployee: this.fb.group({
        id: ['', Validators.required],
        name: ['']
      }),
      deleteFlag: [0]
    });
  }
}
