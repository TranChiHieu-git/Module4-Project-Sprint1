import {Component, OnInit} from '@angular/core';
import {Customer} from './customer';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent implements OnInit {
  tempCustomer: Customer = new Customer();
  customer = new Customer();
  customerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  editModel(element: Customer): void {
    // this.tempStudent = element;
    // this.change();
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
    $('#editModal').modal('hide');
    $('#DeleteModal').modal('hide');
    $('#editcheckModal').modal('hide');
    $('#deletecheckModal').modal('hide');
  }

  backCheckMenu(): void {
    $('#editcheckModal').modal('hide');
    $('#deletecheckModal').modal('hide');
  }
}
