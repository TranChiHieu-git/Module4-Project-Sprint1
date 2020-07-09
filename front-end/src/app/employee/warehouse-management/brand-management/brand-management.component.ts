import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';

declare let showInfo: any;
@Component({
  selector: 'app-brand-management',
  templateUrl: './brand-management.component.html',
  styleUrls: ['./brand-management.component.scss']
})
export class BrandManagementComponent implements OnInit {
  public isCollapsed = true;
  imageUrl = 'http://yourdost-blog-images.s3-ap-southeast-1.amazonaws.com/wp-content/uploads/2016/01/03165939/Dogs.jpg';
  uploadImg: any;
  constructor() {
  }
  ngOnInit(): void {
    showInfo();
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.uploadImg = event.target.result;
      };
    }
  }
  loadPage(): void{
    window.location.reload();
  }
}
