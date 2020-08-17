import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
import {Employees} from '../../models/employees';
import * as $ from 'jquery';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {
  size = 7;
  pageClicked = 0;
  employeeList: Employees[];
  pages = [];
  totalPages = 1;
  key = '';

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.getAllEmployeeWithPage(0);
  }

  getAllEmployeeWithPage(page): void {
    this.employeeService.findAllEmployeeWithPage(page, this.size, this.key).subscribe(
      data => {
        if (data !== null) {
          this.pageClicked = page;
          this.employeeList = data.content;
          this.totalPages = data.totalPages;
          if (this.employeeList.length < 6) {
            $('.table').attr('style', 'margin-bottom: ' + ((6 - this.employeeList.length) * 60) + 'px');
          } else {
            $('.table').attr('style', 'margin-bottom: 0');
          }
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
        } else {
          this.employeeList = null;
        }
      }, error => console.log(error)
    );
  }

  search(): void {
    this.ngOnInit();
  }

  onPrevious(): void {
    if (this.pageClicked > 0) {
      this.pageClicked--;
      this.getAllEmployeeWithPage(this.pageClicked);
    }
  }

  onNext(): void {
    if (this.pageClicked < this.totalPages - 1) {
      this.pageClicked++;
      this.getAllEmployeeWithPage(this.pageClicked);
    }
  }

  onLast(): void {
    this.pageClicked = this.totalPages - 1;
    this.getAllEmployeeWithPage(this.pageClicked);
  }

  backList(): void {
    this.key = '';
    this.ngOnInit();
  }
}
