import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
export class CustomerManagementComponent implements OnInit {
  p = 1;
  customers: Customer[];
  tempCustomer: Customer = new Customer();
  customer: Customer;
  addUser: FormGroup;

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
    this.addUser = this.formBuilder.group({
      userName: [''],
      address: [''],
      phone: [''],
      email: [''],
      birthday: [''],
      gender: [''],
      imageUrl: ['']
    });
    // tslint:disable-next-line:only-arrow-functions
    (function($) {
      // tslint:disable-next-line:only-arrow-functions
      $(document).ready(function() {
        // tslint:disable-next-line:only-arrow-functions typedef
        const readURL = function(input) {
          if (input.files && input.files[0]) {
            const reader = new FileReader();

            // tslint:disable-next-line:only-arrow-functions
            reader.onload = function(e) {
              // @ts-ignore
              $('.profile-pic').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
          }
        };

        $('#custom-file-input').on('change', function() {
          readURL(this);
        });

        // tslint:disable-next-line:only-arrow-functions
        $('#upload-button').on('click', function() {
          $('#file-upload').click();
        });
      });
    })(jQuery);
    $('.icon-upload-alt').css('opacity', '-1');
    $('.button').click(function() {
      const buttonId = $(this).attr('id');
      $('#modal-container').removeAttr('class').addClass(buttonId);
      $('body').addClass('modal-active');
    });

    $('#modal-container').click(function() {
      $(this).addClass('out');
      $('body').removeClass('modal-active');
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

  }
}
