import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.scss']
})
export class ListAccountComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  info() {
    $('#infor').show();
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.close').click(function() {
      $('#infor').hide();
    });
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.destroy').click(function() {
      $('#infor').hide();
    });
  }

  // tslint:disable-next-line:typedef
  edit() {
    $('#edit').show();
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.close').click(function() {
      $('#edit').hide();
    });
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.destroy').click(function() {
      $('#edit').hide();
    });
  }

// tslint:disable-next-line:typedef
  delete() {
    $('#delete').show();
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.close').click(function() {
      $('#delete').hide();
    });
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.destroy').click(function() {
      $('#delete').hide();
    });
  }
}
