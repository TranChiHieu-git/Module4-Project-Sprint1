import {ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Bill} from '../bill';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ServiceBillService} from '../service-bill.service';

@Component({
  selector: 'app-list-bill',
  templateUrl: './list-bill.component.html',
  styleUrls: ['./list-bill.component.scss']
})
export class ListBillComponent implements OnInit, OnChanges {

  public isCollapsed = true;
  @Input() groupFilters: Bill;
  @Input() searchByKeyword: string;

  users: Bill[] = [];
  filteredUsers: any[] = [];
  key = 'name'; // set default
  reverse = false;
  myForm: FormGroup;

  sort(key): void{
    this.key = key;
    this.reverse = !this.reverse;
  }

  constructor(private userService: ServiceBillService,
              private ref: ChangeDetectorRef,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadUsers();
    this.myForm = this.fb.group({});
  }


  ngOnChanges(): void {
    if (this.groupFilters) { this.filterUserList(this.groupFilters, this.users); }
  }

  filterUserList(filters: any, users: Bill[]): void {
    this.filteredUsers = this.users;     // Reset User List

    const keys = Object.keys(filters);
    const filterUser = user => keys.every(key => user[key] === filters[key]);

    this.filteredUsers = this.users.filter(filterUser);

    this.ref.detectChanges();
  }

  loadUsers(): void {
    this.userService.findAllUser()
      .subscribe(users => this.users = users);

    this.filteredUsers = this.filteredUsers.length > 0 ? this.filteredUsers : this.users;
  }

}
