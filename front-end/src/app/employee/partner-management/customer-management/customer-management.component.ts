import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Component, ElementRef, Injectable, OnChanges, OnInit} from '@angular/core';
import {CustomerService} from '../../../services/customer.service';
import {Customer} from '../../../models/customer';
import {HttpClient} from '@angular/common/http';
import {finalize, map} from 'rxjs/operators';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {} from '../../../../assets/js/fb.js';
import {ToastrService} from 'ngx-toastr';
import {OrderService} from '../../../services/order.service';
import {Order} from '../../../models/order';
import {NgbCalendar, NgbDate, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {loggedIn} from '@angular/fire/auth-guard';


declare var $: any;

@Injectable()
export class CustomAdapter {
  readonly DELIMITER = '-';

  fromModel(value: string): NgbDateStruct {
    if (!value) {
      return null;
    } else {
      const parts = value.split(this.DELIMITER);
      // return {year: +parts[0], month: +parts[1], day: +parts[2]} as NgbDateStruct;
      return {year: +parts[0], month: +parts[1], day: +parts[2]} as NgbDateStruct;
    }
  }

  toModel(date: NgbDateStruct): string // from internal model -> your mode
  {
    // return date ? ('0' + date.day).slice(-2) + '-' + ('0' + date.month).slice(-2) + '-' + date.year : null;
    return date ? date.year + '-' + ('0' + date.month).slice(-2)
      + '-' + ('0' + date.day).slice(-2) : null;
  }
}

@Injectable()
export class NgbDateCustomParserFormatter {
  parse(value: string): NgbDateStruct {
    if (!value) {
      return null;
    }
    const parts = value.split('/');
    return {day: +parts[0], month: +parts[1], year: +parts[2]} as NgbDateStruct;

  }

  format(date: NgbDateStruct): string {
    return date ? ('0' + date.day).slice(-2) + '/' + ('0' + date.month).slice(-2) + '/' + date.year : null;
    // return date ? date.year + '-' + ('0' + date.month).slice(-2) + '-' + ('0' + date.day).slice(-2) : null;
  }
}

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
  ]
})
export class CustomerManagementComponent implements OnInit {


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private customerService: CustomerService,
              private http: HttpClient,
              private afStorage: AngularFireStorage,
              private toastr: ToastrService,
              private orderService: OrderService,
              private ngbCalendar: NgbCalendar,
              private dateAdapter: NgbDateAdapter<string>, private parserFormatter: NgbDateParserFormatter) {
  }

  validate: string;
  size = 5;
  search = '';
  birthday: string;
  dateOfValue1: Date;
  dateOfValue2: Date;
  date1 = '';
  date2 = '';
  value1 = '';
  value2 = '';
  pageClicked = 0;
  pages = [];
  totalPages = 1;
  customers: Customer[];
  tempCustomer: Customer = new Customer();
  addUser: FormGroup;
  customer = new Customer();
  reverse = false;
  hasFilter = false;
  private number: number;
  date = {year: this.number, month: this.number};
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  editUrl = new Array<any>();
  uploadStatus = new Array<boolean>();
  uploadProgress = new Array<any>();
  uploadProgressStatus = new Array<boolean>();
  check = false;
  orders: Order[];


  hasSearch = false;
  validationMessages = {
    fullName: [
      {type: 'minlength', message: 'Tên nên có ít nhất 5 ký tự'},
      {type: 'maxlength', message: 'Tên có độ dài vượt quá 25 ký tự'},
      {type: 'required', message: 'Tên không được để trống'},
      {type: 'pattern', message: 'Tên không đúng định dạng'}
    ],
    gender: [
      {type: 'required', message: 'Vui lòng chọ giới tính.'},
    ],
    email: [
      {type: 'required', message: 'Vui lòng nhập vào'},
      {type: 'pattern', message: 'Nhập sai định dạng Vd:caoquochuy21@gmail.com'}
    ],
    phone: [
      {type: 'required', message: 'Vui lòng nhập vào'},
      {type: 'pattern', message: 'Nhập sai định dạng Vd:0908123123'}
    ],
    birthday: [
      {type: 'required', message: 'Vui lòng nhập vào'},
      {type: 'invalid', message: 'Không đủ 18 tuổi'}
    ],
  };

  ngOnInit(): void {
    this.addUser = this.formBuilder.group({
      userName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^[a-zA-Z\\_\\-\\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮ' +
          'ẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹế]+$')
      ])),
      gender: ['', [Validators.required]],
      birthday: new FormControl('', Validators.compose([
        Validators.required,
        this.checkBirthDay,
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?:\\(84\\)\\+|0)9[01]\\d{7}$')
      ])),
      address: ['', [Validators.required]],
      imageUrl: ['']
    });
    this.onSubmit(0);
    this.demo();
    // tslint:disable-next-line:only-arrow-functions typedef
    // this.setInputFilter(document.getElementById('validate'), function(value) {
    //   return /^((-?\d)|\/|-)*$/.test(value);
    // });
    // tslint:disable-next-line:typedef
    // $(function() {
    // });
    // tslint:disable-next-line:only-arrow-functions typedef
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // tslint:disable-next-line:only-arrow-functions typedef
    // $('.dateFormat').mask('99/99/9999');
    // tslint:disable-next-line:typedef
    // $('.validate').change(function() {
    //
    //     if ($(this).val().substring(0, 2) > 12 || $(this).val().substring(0, 2) === '00') {
    //       alert('Iregular Month Format');
    //       return false;
    //     }
    //     if ($(this).val().substring(3, 5) > 31 || $(this).val().substring(0, 2) === '00') {
    //       alert('Iregular Date Format');
    //       return false;
    //     }
    //   });
    // tslint:disable-next-line:only-arrow-functions typedef
    // $().ready(function() {
    //   $('.validate').on('input', function() {
    //     let c = this.selectionStart;
    //     const r = /[^a-z0-9]/gi;
    //     const v = $(this).val();
    //     if (r.test(v)) {
    //       $(this).val(v.replace(r, ''));
    //       c--;
    //     }
    //     this.setSelectionRange(c, c);
    //   });
    // });
    // tslint:disable-next-line:typedef
    // $('#test').keypress(function(event) {
    //   const character = String.fromCharCode(event.keyCode);
    //   return this.isValidDate(character);
    // });


  }


  editModel(element: Customer): void {
    this.uploadProgressStatus[this.customer.id] = false;
    this.tempCustomer = element;
    // this.change();
    $('#editModal').modal('show');
  }

  backMenu(): void {
    $('#addCheckModal').modal('hide');
    this.ngOnInit();
  }

  addModel(): void {
    $('#addModal').modal('show');
  }

  addCheckModel(element: Customer): void {
    $('#addCheckModal').modal('show');
  }

  onSubmit(page): void {
    this.customerService.getAllCustomerWithSearchAndPageAndFilter(page, this.size, this.search, this.value1, this.value2).subscribe(
      data => {
        this.pageClicked = page;
        this.customers = data.content;
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      }, error => {
        if (error.status === 401) {
          alert('Bạn không có quyền vào trang này.Mời bạn đăng nhập.');
        }
      }
    );

  }

  hoverUploadPicture(): void {
    $('.icon-upload-alt').css('opacity', '0.8');
  }

  selectAvatar(): void {
    $('#myAvatar').click();
  }

  readURL(target: any): void {
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // @ts-ignore
        $('#avatar').attr('src', e.target.result);
      };
      reader.readAsDataURL(target.files[0]);
    } else {
      console.log('error');
    }
  }

  searchName(): void {
    if (this.search === '') {
      this.hasSearch = false;
      this.ngOnInit();
    } else {
      this.hasSearch = true;
      this.onSubmit(0);
    }
  }

  filter(): void {
    console.log(this.value1);
    console.log(this.value2);
    if (this.value1 && this.value2 != null) {
      this.hasFilter = true;
      this.onSubmit(0);
    } else {
      this.hasFilter = false;
      this.ngOnInit();
    }
  }

  onFirst(): void {
    this.pageClicked = 0;
    this.onSubmit(this.pageClicked);
  }

  onPrevious(): void {
    if (this.pageClicked > 0) {
      this.pageClicked--;
      this.onSubmit(this.pageClicked);
    }
  }

  onLast(): void {
    this.pageClicked = this.totalPages - 1;
    this.onSubmit(this.pageClicked);
  }

  onNext(): void {
    if (this.pageClicked < this.totalPages - 1) {
      this.pageClicked++;
      this.onSubmit(this.pageClicked);
    }
  }

  checkBirthDay(a: FormControl): { invalid: boolean } {
    const v = a.value;
    // console.log(v);
    const birthday: Date = new Date(v);
    const now: Date = new Date();
    // console.log(now);
    const day = birthday.getDay();
    // console.log(day);
    const month = birthday.getMonth();
    const year = birthday.getFullYear();
    const age = now.getFullYear() - year;
    // tslint:disable-next-line:prefer-const
    let ok: boolean;
    if (age < 18) {
      ok = false;
    } else if (age === 18) {
      if (now.getMonth() === month) {
        if (now.getDay() < day) {
          ok = false;
        }
      } else {
        ok = now.getMonth() >= month;
      }
    } else {
      ok = true;
    }
    return ok ? null : {invalid: true};
  }

  backToSearch(): void {
    this.search = '';
    this.hasSearch = false;
    this.onSubmit(0);
  }


  leaveUploadPic(): void {
    $('.icon-upload-alt').css('opacity', '-1');
  }

  addCheckModal(): void {
    const el = document.getElementById('add');
    if (this.addUser.valid) {
      this.customerService.addNewCustomer(this.addUser.value).subscribe(data => {
        console.log('ok');
      });
      $('.btn-circle').attr('aria-expanded', 'true');
      $('#addCheckModal').modal('show');
      el.style.display = 'none';
    }
  }

  backToFilter(): void {
    this.date1 = '';
    this.date2 = '';
    this.hasFilter = false;
    this.onSubmit(0);
  }


  // onSelect(evt: any): void {
  //   this.dateOfValue1 = new Date(evt.year, evt.month - 1, evt.day);
  //   this.date1 = this.dateOfValue1.getFullYear().toString() + '-' +
  //     this.dateOfValue1.getMonth().toString() + '-' + this.dateOfValue1.getDay();
  //   console.log('date1 =' + this.date1);
  //   this.dateOfValue2 = new Date(evt.year, evt.month - 1, evt.day);
  //   this.date1 = this.dateOfValue2.getFullYear().toString() + '-' +
  //     this.dateOfValue2.getMonth().toString() + '-' + this.dateOfValue2.getDay();
  // }


  scroll(): void {
    const el = document.getElementById('add');
    if (!this.check) {
      el.style.display = 'block';
      el.scrollIntoView();
      this.check = true;
      // target.scrollIntoView();
    } else {
      this.check = false;
      el.style.display = 'none';
    }
  }

//   setInputFilter(textbox, inputFilter): void {
//     // tslint:disable-next-line:only-arrow-functions typedef
//     ['input', 'keydown', 'keyup', 'mousedown', 'mouseup', 'select', 'contextmenu', 'drop'].forEach(function(event) {
//       // tslint:disable-next-line:typedef
//       textbox.addEventListener(event, function() {
//         if (inputFilter(this.value)) {
//           this.oldValue = this.value;
//           this.oldSelectionStart = this.selectionStart;
//           this.oldSelectionEnd = this.selectionEnd;
//         } else if (this.hasOwnProperty('oldValue')) {
//           this.value = this.oldValue;
//           this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
//         } else {
//           this.value = '';
//         }
//       });
//     });
// }
//   isValidDate(str: string): boolean {
//     return !/[~`!@#$%\^&*()+=\\[\]\\';,/{}|\\":<>\?a-zA-Z]/g.test(str);
//   }
  demo(): void {

    const date = document.getElementsByClassName('date');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < date.length; i++) {
      date[i].addEventListener('input', function(e) {
        this.type = 'text';
        let input = this.value;
        if (/\D\/$/.test(input)) {
          input = input.substr(0, input.length - 3);
        }
        // tslint:disable-next-line:only-arrow-functions typedef
        const values = input.split('/').map(function(v) {
          return v.replace(/\D/g, '');
        });
        if (values[0]) {
          // @ts-ignore
          values[0] = checkValue(values[0], 31);
        }
        if (values[1]) {
          // @ts-ignore
          values[1] = checkValue(values[1], 12);
        }
        // tslint:disable-next-line:only-arrow-functions
        const output = values.map(function(v, i) {
          return v.length === 2 && i < 2 ? v + '/' : v;
        });
        this.value = output.join('').substr(0, 14);
      });
      date[i].addEventListener('blur', function(e) {
        this.type = 'text';
        const input = this.value;
        // tslint:disable-next-line:only-arrow-functions typedef
        const values = input.split('/').map(function(v, i) {
          return v.replace(/\D/g, '');
        });
        let output = '';
        if (values.length === 3) {
          const year = values[2].length !== 4 ? parseInt(values[2], 0) + 2000 : parseInt(values[2], 0);
          const month = parseInt(values[0], 0) - 1;
          const day = parseInt(values[1], 0);
          const d = new Date(year, month, day);
          // @ts-ignore
          if (!isNaN(d)) {
            // document.getElementsByClassName('date').iner = d.toString();
            const dates = [d.getMonth() + 1, d.getDate(), d.getFullYear()];
            // tslint:disable-next-line:only-arrow-functions typedef
            output = dates.map(function(v) {
              v.toString();
              return v === 1 ? '0' + v : v;
            }).join('/');
          }
        }
        this.value = output;
      });
    }
    function checkValue(str, max): void {
      if (str.charAt(0) !== '0' || str === '00') {
        let num = parseInt(str, 0);
        if (isNaN(num) || num <= 0 || num > max) {
          num = 0;
        }
        str = num > parseInt(max.toString().charAt(0), 0) && num.toString().length === 1 ? '0' + num : num.toString();
      }
      return str;
    }
  }
}

