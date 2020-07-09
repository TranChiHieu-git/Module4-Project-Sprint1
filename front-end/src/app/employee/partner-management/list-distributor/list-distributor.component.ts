import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Distributor} from '../../../models/distributor';
import {DistributorService} from '../../../services/distributor.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-distributor',
  templateUrl: './list-distributor.component.html',
  styleUrls: ['./list-distributor.component.scss']
})
export class ListDistributorComponent implements OnInit {
  distributorForm: FormGroup;
  distributorList: Distributor[];
  constructor(private fb: FormBuilder,
              private distributorService: DistributorService,
              private router: Router) { }

  ngOnInit(): void {
    this.distributorForm = this.fb.group({
      id: [''],
      name: [''],
      address: [''],
      numberPhone: [''],
      email: [''],
      img: ['']
    });
    this.distributorService.findAll().subscribe(
      next => this.distributorList = next,
      error => {
        this.distributorList = [];
        console.log(error);
      }
    );

    // tslint:disable-next-line:only-arrow-functions
    (function($) {
      // tslint:disable-next-line:only-arrow-functions
      $(document).ready(function() {
        // tslint:disable-next-line:only-arrow-functions
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

        $('.file-upload').on('change', function() {
          readURL(this);
        });

        // tslint:disable-next-line:only-arrow-functions
        $('.upload-button').on('click', function() {
          $('.file-upload').click();
        });
      });
    })(jQuery);
  }
  onSubmit() {
    if (this.distributorForm.valid) {
      this.distributorService.create(this.distributorForm.value).subscribe(
        next => {
          if (next && next.id) {
            alert('Bạn đã thêm mới thành công');
            window.location.reload();
          }
        }
      );
    } else {
      alert('Invalid');
    }
  }
}

