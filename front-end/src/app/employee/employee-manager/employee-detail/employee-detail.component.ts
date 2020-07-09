// declare var $: any;
import { Component, OnInit } from '@angular/core';
import {Employee} from '../../employee';
// import * as $ from 'jquery';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  constructor() { }
  url: any;
  employee = new Employee();
  ngOnInit(): void {
  }
  onSelectFile(event): void { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      };
    }
  }

  // editModel(element: Employee): void {
  //   // this.tempStudent = element;
  //   // this.change();
  //   $('#editModal').modal('show');
  // }
  //
  // deleteModel(element: Employee): void {
  //   // this.tempStudent = element;
  //   // this.change();
  //   $('#deleteModal').modal('show');
  // }
  // quayLaiDanhSach(): void {
  //   $('#editModal').modal().hide();
  //   $('#DeleteModal').modal('hide');
  // }
}
