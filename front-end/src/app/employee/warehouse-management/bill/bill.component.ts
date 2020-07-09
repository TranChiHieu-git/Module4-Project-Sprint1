import { Component, OnInit } from '@angular/core';
import {Bill} from './bill';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  searchText: string;
  filters: Bill;
  constructor() { }

  ngOnInit(): void {
  }

}
