import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {OrderService} from '../services/order.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  idUser: number;

  constructor(private orderService: OrderService) {
    // lấy id user từ service
    this.orderService.chanceIdUser(5);
  }

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
// lấy id user từ service
//     this.orderService.chanceIdUser(this.idUser);
  }

}
