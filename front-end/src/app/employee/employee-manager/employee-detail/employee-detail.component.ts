import * as $ from 'jquery';
import {Component, OnInit} from '@angular/core';
import {Employee} from '../../employee';
import {EmployeeService} from '../../../services/employee.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {Account} from '../../../models/account';
import {Department} from '../../../models/department';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Tempjwtemp} from '../../../models/tempjwtemp';
// tslint:disable-next-line:typedef
function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.password === v.confirmPassword) ? null : {
    passwordnotmatch: true
  };
}

// tslint:disable-next-line:typedef
function checkCurrentPassword(c: AbstractControl): { [key: string]: any } {
  const v = c.value;
  return (v.oldPassword === v.currentPass) ? null : {
    wrongpassword: true
  };
}

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  constructor(private employeeService: EmployeeService,
              private fb: FormBuilder,
              private afStorage: AngularFireStorage,
              private router: Router,
              private loginAccount: TokenStorageService) {
  }

  url: any;
  employee = new Employee();
  editForm: FormGroup;
  positionList: Position[];
  departmentList: Department[];
  accountName = '';
  account = new Account();
  editPasswordForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  oldPassword;
  currentPass;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  src: any;
  token: any;
  decode = new JwtHelperService();
  tempJwt = new Tempjwtemp();
  private uploadFireBaseAndSubmit(): void {
    const target: any = document.getElementById('image');
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(target.files[0]);
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          this.src = url;
        });
      }))
      .subscribe();
  }

  ngOnInit(): void {
    this.tempJwt = this.decode.decodeToken(this.loginAccount.getToken());
    this.accountName = this.tempJwt.sub;
    this.loadEditForm();
    this.loadPasswordForm();
    this.editForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^(([A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-z_àáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềếểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)(\s[A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-z_àáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặếẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)*)(\s(([A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-z_àáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏếốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)(\s[A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-z_àáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻếẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)*))*$/)]),
      gender: new FormControl('', [Validators.required]),
      birthday: new FormControl(''),
      address: new FormControl('', [Validators.required, Validators.pattern(/^(([A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-z_àáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềếểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)(\s[A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-z_àáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặếẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)*)(,\s(([A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-z_àáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏếốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)(\s[A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-z_àáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻếẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)*))*$/)]),
      position: new FormControl(''),
      department: new FormControl(''),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\+84\d{9,10}$/)]),
      email: new FormControl('', [Validators.required, ]),
      // Validators.pattern(/^[A-Za-z0-9]+[A-Za-z0-9]*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)$/)
      image: new FormControl('')
    });
    this.employeeService.findEmployeeByAccountName(this.accountName).subscribe(
      next => {
        this.employee = next;
        this.editForm.patchValue(this.employee);
      },
      error => console.log(error)
    );
  }

  onSubmit1(): void {
    this.editForm.patchValue({
      image: this.src
    });
    if (this.editForm.valid) {
      const {value} = this.editForm;
      const data = {
        ...this.employee,
        ...value
      };
      this.employeeService.editEmployeeById(data).subscribe(
        next => {
          console.log(next);
        },
        error => console.log(error)
      );
    }
    // window.location.reload();
  }

  loadEditForm(): void {
    // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear - 18, 0, 1);
    console.log(this.employee);
    this.employeeService.findAllPosition().subscribe(
      next => {
        this.positionList = next;
      },
      error => console.log(error)
    );
    this.employeeService.findAllDepartment().subscribe(
      next => this.departmentList = next
    );
  }

  loadPasswordForm(): void {
    this.editPasswordForm = this.fb.group({
      accountName: new FormControl(''),
      oldPassword: new FormControl('', [Validators.required, checkCurrentPassword]),
      pwGroup: this.fb.group({
          password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9]{1,}$')]),
          confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
        },
        {validator: comparePassword}),
      accountPassword: new FormControl('')
    });
    this.employeeService.findAccountByName(this.accountName).subscribe(
      next => { this.account = next;
                console.log(next); },
      error => console.log(error)
    );
  }

  onSubmit2(): void {
    this.editPasswordForm.patchValue({
      accountName: this.accountName,
      accountPassword: this.editPasswordForm.get('pwGroup.password').value
    });
    if (this.editPasswordForm.valid) {
      const {value} = this.editPasswordForm;
      const data = {
        ...this.account,
        ...value
      };
      console.log(data);
      this.employeeService.editAccountByName(data).subscribe(
        next => {
          console.log(next);
        },
        error => console.log(error)
      );
    }
    window.location.reload();
  }

  readURL(target: EventTarget): void {
    this.uploadFireBaseAndSubmit();
  }

  selectFile(): void {
    $('#image').click();
  }
}
