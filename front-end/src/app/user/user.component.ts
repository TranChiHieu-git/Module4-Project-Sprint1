import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // $('.blurbutton').on('click', function(){
    //   $('body').addClass('blurfilter');
    // });
    // $('.unblurbutton').on('click', function(){
    //   $('body').removeClass('blurfilter');
    // });
    $('#registerModal').on('show.bs.modal', function (e) {
      console.log('show');
      $('body').addClass('modalBlur');
      $('body').addClass('modal-backdrop show');
    });

    $('#registerModal').on('hide.bs.modal', function (e) {
      console.log('hide');
      $('body').removeClass('modalBlur');
    });
  }

}
