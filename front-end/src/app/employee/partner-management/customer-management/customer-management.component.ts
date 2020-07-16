import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnChanges, OnInit} from '@angular/core';
import {CustomerService} from '../../../services/customer.service';
import {Customer} from '../../../models/customer';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';

declare var $: any;

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent implements OnInit {
  p = 1;
  customers: Customer[];
  tempCustomer: Customer = new Customer();
  addUser: FormGroup;
  customer = new Customer();
  // customerForm: FormGroup;
  reverse = false;
  filter;
  date: any;
  deleteList = new Array();

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private customerService: CustomerService) {
    this.customerService.getAllCustomer().subscribe(data => {
        this.customers = data;
      }, error => {
        console.log(error);
      }, () => {

      }
    );
  }

  validatingForm: FormGroup;

  ngOnInit(): void {
    $('#checkAll').click(function() {
      $('input:checkbox').not(this).prop('checked', this.checked);
    });

    this.addUser = this.formBuilder.group({
      id: [''],
      userName: [''],
      address: [''],
      phone: [''],
      email: [''],
      birthday: [''],
      gender: [''],
      imageUrl: ['']
    });
    // tslint:disable-next-line:only-arrow-functions
    (function ($) {
      // tslint:disable-next-line:only-arrow-functions
      $(document).ready(function () {
        // tslint:disable-next-line:only-arrow-functions typedef
        const readURL = function (input) {
          if (input.files && input.files[0]) {
            const reader = new FileReader();

            // tslint:disable-next-line:only-arrow-functions
            reader.onload = function (e) {
              // @ts-ignore
              $('.profile-pic').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
          }
        };

        $('#custom-file-input').on('change', function () {
          readURL(this);
        });

        // tslint:disable-next-line:only-arrow-functions
        $('#upload-button').on('click', function () {
          $('#file-upload').click();
        });
      });
    })(jQuery);
    $('.icon-upload-alt').css('opacity', '-1');
    $('.button').click(function () {
      const buttonId = $(this).attr('id');
      $('#modal-container').removeAttr('class').addClass(buttonId);
      $('body').addClass('modal-active');
    });

    $('#modal-container').click(function () {
      $(this).addClass('out');
      $('body').removeClass('modal-active');
    });

  }


  editModel(element: Customer): void {
    this.tempCustomer = element;
    this.change();
    $('#editModal').modal('show');
  }

  deleteModel(element: Customer): void {
    // this.tempStudent = element;
    // this.change();
    $('#deleteModal').modal('show');
  }

  editcheckModel(element: Customer): void {
    $('#editcheckModal').modal('show');
  }

  deletecheckModel(element: Customer): void {
    $('#deletecheckModal').modal('show');
  }


  backMenu(): void {
    $('#addModal').modal('hide');
    $('#addCheckModal').modal('hide');
    $('#editModal').modal('hide');
    $('#DeleteModal').modal('hide');
    $('#editcheckModal').modal('hide');
    $('#deletecheckModal').modal('hide');
  }

  backCheckMenu(): void {
    $('#addcheckModal').modal('hide');
    $('#editcheckModal').modal('hide');
    $('#deletecheckModal').modal('hide');
  }


  addModel(): void {
    $('#addModal').modal('show');
  }


  addCheckModel(element: Customer): void {
    $('#addCheckModal').modal('show');
  }


  onSubmit() {
    const editConfirm = confirm('Bạn có chắc chắn cập nhật thông tin của khách mua hàng này ?');
    if (editConfirm) {
      if (this.date !== undefined) {
        this.addUser.patchValue({
          birthday: this.date,
        });
      }
      this.customerService.editCustomer(this.addUser.value).subscribe(
        next => window.location.reload(),
        error => console.log(error)
      );
    }
  }

  deleteSubmit(id): void {
    const deleteConfirm = confirm('Bạn có chắc chắn muốn xóa khách mua hàng này không?');
    if (deleteConfirm) {
      this.customerService.deleteCustomerById(id).subscribe(
        next => {window.location.reload()
        },
        error => console.log(error)
      );
    }
  }

  change(): void {
    this.addUser.patchValue({
      id: this.tempCustomer.id,
      userName: this.tempCustomer.userName,
      birthday: this.tempCustomer.birthday,
      address: this.tempCustomer.address,
      email: this.tempCustomer.email,
      phone: this.tempCustomer.phone,
      gender: this.tempCustomer.gender,
      imageUrl: this.tempCustomer.imageUrl,
      deleteFlag: this.tempCustomer.deleteFlag,
    });
  }

  addEvent(event): void {
    this.date = event.value;
  }

  quayLaiDanhSach(): void {
    this.router.navigate(['employee/partner-management/customer-management']);
  }

  deleteCheckbox(event, id): void {
    const indexOfId = this.deleteList.indexOf(id);

    if (event.target.checked) {
      if (indexOfId < 0) {
        this.deleteList.push(id);
      }
    } else {
      this.deleteList.splice(indexOfId, 1);
    }
  }

  deleteAllCheckbox(event): void {
    if (event.target.checked) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.customers.length; i++) {
        this.deleteList.push(this.customers[i].id);
      }
    } else {
      this.deleteList.splice(0, this.deleteList.length);
    }
  }

  delete(): void {
    let deleteConfirm = false;
    if (this.deleteList.length <= 0) {
      alert('Bạn chưa chọn khách hàng nào để tiến hành xóa!');
    } else {
      deleteConfirm = confirm('Bạn có chắc chắn muốn xóa những khách mua hàng này không?');
    }
    if (deleteConfirm) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.deleteList.length; i++) {
        this.customerService.deleteCustomerById(this.deleteList[i]).subscribe(
          next => {
          },
          error => console.log(error)
        );
      }
      window.location.reload();
    }
  }


}
