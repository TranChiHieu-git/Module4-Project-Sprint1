import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ServiceBillService} from '../service-bill.service';
import {WareHouse} from '../../../../models/ware-house';
import {Transportation} from '../../../../models/transportation';
import {Employee} from '../../../employee';
import {Distributor} from '../../../../models/distributor';

@Component({
  selector: 'app-search-bill',
  templateUrl: './search-bill.component.html',
  styleUrls: ['./search-bill.component.scss']
})
export class SearchBillComponent implements OnInit {
  // public wareHouseList: WareHouse[] = [];
  wareHouses: WareHouse[] = [];
  // public transportation: Transportation[];
  // public employees: Employee[];
  // public distributors: Distributor[];
  form: FormGroup;

  @Output() autoSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() groupFilters: EventEmitter<any>  = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
              private userService: ServiceBillService) {}

  ngOnInit(): void {
    this.buildForm();
    // this.userService.findAllEmployee().subscribe(
    //   next => this.employees = next,
    //   error => {
    //     this.employees = [];
    //     console.log(error);
    //   });
    // this.userService.findAllDistributors().subscribe(
    //   next => this.distributors = next,
    //   error => {
    //     this.distributors = [];
    //     console.log(error);
    //   });
    // this.userService.findAllTransportation().subscribe(
    //   next => this.transportation = next,
    //   error => {
    //     this.transportation = [];
    //     console.log(error);
    //   });
    // this.userService.findAllWarehouse().subscribe(
    //   next => this.wareHouseList = next,
    //   error => {
    //     this.wareHouseList = [];
    //     console.log(error);
    //   });
  }

  buildForm(): void {
    this.form = this.fb.group({
      // idWareHouse: this.fb.group({
      //   id: [''],
      //   nameWarehouse: ['']
      // }),
      // idTransportation: this.fb.group({
      //   id: [''],
      //   nameTransportation: ['']
      // }),
      // idDistributor: this.fb.group({
      //   id: [''],
      //   name: ['']
      // }),
      // idEmployee: this.fb.group({
      //   id: [''],
      //   name: ['']
      // }),
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
