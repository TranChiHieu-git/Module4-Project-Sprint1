import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Distributor} from '../../../models/distributor';
import {DistributorService} from '../../../services/distributor.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-list-distributor',
  templateUrl: './list-distributor.component.html',
  styleUrls: ['./list-distributor.component.scss']
})
export class ListDistributorComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private distributorService: DistributorService,
              private router: Router) {

    this.myForm = fb.group({
      id: [''],
      name: [''],
      phone: [''],
      email: [''],
      address: [''],
      fax: [''],
      website: [''],
      img: [''],
      type: ['']
    });

  }

  distributorForm: FormGroup;
  distributorList: Distributor[];
  // Thach
  img: any;
  myForm: FormGroup;
  src = 'https://worklink.vn/wp-content/uploads/2018/07/no-logo.png';

  myDistributor: Distributor;

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

    // tslint:disable-next-line:only-arrow-functions no-shadowed-variable typedef
    (function($) {
      // tslint:disable-next-line:only-arrow-functions typedef
      $(document).ready(function() {
        // tslint:disable-next-line:only-arrow-functions typedef
        const readURL = function(input) {
          if (input.files && input.files[0]) {
            const reader = new FileReader();

            // tslint:disable-next-line:only-arrow-functions typedef
            reader.onload = function(e) {
              // @ts-ignore
              $('.profile-pic').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
          }
        };

        // tslint:disable-next-line:typedef
        $('.file-upload').on('change', function() {
          readURL(this);
        });

        // tslint:disable-next-line:only-arrow-functions typedef
        $('.upload-button').on('click', function() {
          $('.file-upload').click();
        });
      });
    })(jQuery);


    // Thach
    $('.icon-upload-alt').css('opacity', '-1');
    // tslint:disable-next-line:typedef
    $('.button').click(function() {
      const buttonId = $(this).attr('id');
      $('#modal-container').removeAttr('class').addClass(buttonId);
      $('body').addClass('modal-active');
    });

    // tslint:disable-next-line:typedef
    $('#modal-container').click(function() {
      $(this).addClass('out');
      $('body').removeClass('modal-active');
    });

  }

  // tslint:disable-next-line:typedef
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


  // Thach Function
  // tslint:disable-next-line:typedef
  updateDistributor() {
    this.distributorService.save(this.myForm.value).subscribe(
      res => alert('Thành công'),
      error => alert('Thất bại')
    );
    $('#modal').hide();
  }

// FUNTION PHU
  // tslint:disable-next-line:typedef
  hoverUploadPic() {
    $('.icon-upload-alt').css('opacity', '0.8');
  }


  // tslint:disable-next-line:typedef
  leaveUploadPic() {
    $('.icon-upload-alt').css('opacity', '-1');
  }

  // tslint:disable-next-line:typedef
  selectAvatar() {
    $('#myAvatar').click();
  }


  // tslint:disable-next-line:typedef
  readURL(target: any) {
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // @ts-ignore
        $('#avatar').attr('src', e.target.result);
      };
      reader.readAsDataURL(target.files[0]);
    } else {
    }
  }


  // tslint:disable-next-line:typedef
  chooseAll(item: HTMLInputElement) {
    if ($('#box-1').prop('checked')) {
      $('#box-2, #box-3').prop('checked', true);
      this.distributorService.findByName('Tất cả').subscribe(
        res => this.myForm.value.type = res,
        error => console.log(error)
      );
    } else {
      $('#box-2, #box-3').prop('checked', false);
      this.myForm.value.type = '';
    }
  }

  // tslint:disable-next-line:typedef
  chooseOne(target: HTMLInputElement) {
    if ($('#box-2').is(':checked') && $('#box-3').is(':checked')) {
      $('#box-1').prop('checked', true);
      this.distributorService.findByName('Tất cả').subscribe(
        res => this.myForm.value.type = res,
        error => console.log(error)
      );
    } else if ($('#box-2').is(':checked')) {
      $('#box-1').prop('checked', false);
      this.distributorService.findByName('Bánh').subscribe(
        res => this.myForm.value.type = res,
        error => console.log(error)
      );
    } else {
      $('#box-1').prop('checked', false);
      this.distributorService.findByName('Kẹo').subscribe(
        res => this.myForm.value.type = res,
        error => console.log(error)
      );
    }
  }

  // tslint:disable-next-line:typedef
  openEditForm(id: number) {
    this.distributorService.findById(id).subscribe(
      res => {
        this.myForm.patchValue(res);
        if (this.myForm.value.img !== '') {
          this.src = this.myForm.value.img;
        }
        switch (this.myForm.value.type.name) {
          case 'Tất cả' : {
            $('#box-2, #box-3,#box-1').prop('checked', true);
            break;
          }
          case 'Bánh': {
            $('#box-2').prop('checked', true);
            break;
          }
          case 'Kẹo' : {
            $('#box-3').prop('checked', true);
            break;
          }
        }
      },
      error => console.log(error)
    );
    $('#btn-editForm').click();

  }

  // tslint:disable-next-line:typedef
  openDeleteForm(id: number) {
    $('#deleteForm').click();
    this.distributorService.findById(id).subscribe(
      res => {
        this.myDistributor = res;
      },
      error => console.log(error)
    );
  }
}
