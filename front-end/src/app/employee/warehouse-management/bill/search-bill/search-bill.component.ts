import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ServiceBillService} from '../service-bill.service';
import {WareHouse} from '../ware-house';
import {Bill} from '../bill';

@Component({
  selector: 'app-search-bill',
  templateUrl: './search-bill.component.html',
  styleUrls: ['./search-bill.component.scss']
})
export class SearchBillComponent implements OnInit {
  wareHouses: WareHouse[] = [];

  // panelNum: number;
  //
  // next() {
  //   if (this.panelNum < 5) this.panelNum++; else this.panelNum = 1;
  // }
  //
  // prev() {
  //   if (this.panelNum > 1) this.panelNum--; else this.panelNum = 5;
  // }

  form: FormGroup;

  @Output() autoSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() groupFilters: EventEmitter<any>  = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
              private userService: ServiceBillService) {}

  ngOnInit(): void {
    this.buildForm();
    this.userService.findAllWarehouse().subscribe(
      next => this.wareHouses = next,
      error => {
        this.wareHouses = [];
        console.log(error);
      });
    console.log(this.wareHouses);
  }

  buildForm(): void {
    this.form = this.fb.group({
      prefix: new FormControl(''),
      position: new FormControl(''),
      gender: new FormControl('')
    });
  }

  search(filters: any): void {
    Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
    this.groupFilters.emit(filters);
  }

}
