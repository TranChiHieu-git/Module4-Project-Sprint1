import {Component, OnInit} from '@angular/core';
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
  size = 5;
  pageClick = 0;
  pages = [];

  search = '';
  isSearch = false;

  totalPages = 1;
  listError: any = "";
  // Thach
  img: any;
  myForm: FormGroup;

  src = 'https://worklink.vn/wp-content/uploads/2018/07/no-logo.png';
  constructor(private fb: FormBuilder,
              private distributorService: DistributorService,
              private router: Router) {
    this.myForm = fb.group({
      id: [''],
      name: [''],
      numberPhone: [''],
      email: [''],
      address: [''],
      fax: [''],
      website: [''],
      img: [''],
      typeOfDistributor: ['']
    });
  }
  onNext() {
    if (this.pageClick < this.totalPages - 1) {
      this.pageClick++;
      this.onChange(this.pageClick);
    }
  }
  onPrevious() {
    if (this.pageClick > 0) {
      this.pageClick--;
      this.onChange(this.pageClick);
    }
  }
  onFirst() {
    this.pageClick = 0;
    this.onChange(this.pageClick);
  }
  onLast() {
    this.pageClick = this.totalPages - 1;
    this.onChange(this.pageClick);
  }

  onChange(page){
    this.distributorService.getAllDistributor(page,this.size,this.search).subscribe(
      next => {
        console.log(next);
        this.pageClick = page;
        this.distributorList = next.content;
        this.totalPages = next.totalPages;
        this.pages =  Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      },
      error => console.log(error)
    )
  }
  getAllDistributor():void{
    this.onChange(0);
  };
  ngOnInit(): void {
    this.getAllDistributor();
    // this.distributorService.findAll().subscribe(
    //   next => this.distributorList = next,
    //   error => {
    //     this.distributorList = [];
    //     console.log(error);
    //   }
    // );


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
    // Thach
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
  // tslint:disable-next-line:typedef
  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      this.distributorService.create(this.myForm.value).subscribe(
        next => {
          console.log(next);
            alert('Bạn đã thêm mới thành công');
            // @ts-ignore
          this.myForm.reset();
          this.getAllDistributor();
          this.router.navigate(["employee/partner-management/list-distributor"]);
          $('#deleteFormCreate').click();
        }
      );

    } else {
      alert('Invalid');
    }
  }
  // Thach Function
  // tslint:disable-next-line:typedef
  updateDistributor() {
    console.log(this.myForm.value);
    this.distributorService.save(this.myForm.value).subscribe(
      res => {
        alert('Thành công');
        this.myForm.reset();
      },
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
        // $('#avatar').attr('src', e.target.result);
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
        res => this.myForm.value.typeOfDistributor = res,
        error => console.log(error)
      );
    } else {
      $('#box-2, #box-3').prop('checked', false);
      this.myForm.value.typeOfDistributor = '';
    }
  }
  // tslint:disable-next-line:typedef
  chooseOne(target: HTMLInputElement) {
    if ($('#box-2').is(':checked') && $('#box-3').is(':checked')) {
      $('#box-1').prop('checked', true);
      this.distributorService.findByName('Tất cả').subscribe(
        res => this.myForm.value.typeOfDistributor = res,
        error => console.log(error)
      );
    } else if ($('#box-2').is(':checked')) {
      $('#box-1').prop('checked', false);
      this.distributorService.findByName('Bánh').subscribe(
        res => this.myForm.value.typeOfDistributor = res,
        error => console.log(error)
      );
    } else {
      $('#box-1').prop('checked', false);
      this.distributorService.findByName('Kẹo').subscribe(
        res => this.myForm.value.typeOfDistributor = res,
        error => console.log(error)
      );
    }
  }
  // tslint:disable-next-line:typedef
  openCreateForm(){
    $('#createForm').click();
  }
  openEditForm(id: number) {
    this.distributorService.findById(id).subscribe(
      res => {
        this.myForm.patchValue(res);
        if (this.myForm.value.img !== '') {
          this.src = this.myForm.value.img;
        }
        switch (this.myForm.value.typeOfDistributor.name) {
          case 'Tất cả' : {
            $('#box-2, #box-3,#box-1').prop('checked', true);
            break;
          }
          case 'Bánh': {
            $('#box-2').prop('checked', true);
            $('#box-1,#box-3').prop('checked', false);
            break;
          }
          case 'Kẹo' : {
            $('#box-3').prop('checked', true);
            $('#box-1,#box-2').prop('checked', false);
            break;
          }
        }
      },
      error => console.log(error)
    );
    $('#btn-editForm').click();
  }
  myDistributor: Distributor;
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
  searchName() {
    if (this.search === '') {
      this.isSearch = false;
      this.ngOnInit();
    } else {
      this.isSearch = true;
      this.onChange(0);
    }
  }
  backToSearch() {
    this.search = '';
    this.isSearch = false;
    this.ngOnInit();
  }
  openDetailForm(id: number) {
    this.distributorService.findById(id).subscribe(
      res => {
        this.myForm.patchValue(res);
        if (this.myForm.value.img !== '') {
          this.src = this.myForm.value.img;
        }
        switch (this.myForm.value.typeOfDistributor.name) {
          case 'Tất cả' : {
            $('#box-2, #box-3,#box-1').prop('checked', true);
            break;
          }
          case 'Bánh': {
            $('#box-2').prop('checked', true);
            $('#box-1,#box-3').prop('checked', false);
            break;
          }
          case 'Kẹo' : {
            $('#box-3').prop('checked', true);
            $('#box-1,#box-2').prop('checked', false);
            break;
          }
        }
      },
      error => console.log(error)
    );
    console.log('helllo');
    $('#btn-detailForm').click();
  }
}

