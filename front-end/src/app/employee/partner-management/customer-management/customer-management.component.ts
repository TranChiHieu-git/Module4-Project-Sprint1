
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnChanges, OnInit} from '@angular/core';
import {CustomerService} from '../../../services/customer.service';
import {Customer} from '../../../models/customer';


declare var $: any;

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent implements OnInit, OnChanges {
  customers;
  tempCustomer: Customer = new Customer();
  customer: Customer;
  customerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.customerService.getAllCustomer().subscribe(data => {
      this.customers = data;
    });
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

  addcheckModel(customer: Customer) {
  }

  hiddenTab(id): void {
    this.customerService.getCustomerById(id).subscribe(next => {
      this.customer = next;
      this.customer.status = !this.customer.status;
      this.customerService.editCustomer(this.customer).subscribe();
      console.log(this.customer.status);
      this.customerService.getAllCustomer().subscribe(data => {
        this.customers = data;
      });
    });
  }
  ngOnChanges(): void {
    // @ts-ignore
    this.hiddenTab();
  }
}
