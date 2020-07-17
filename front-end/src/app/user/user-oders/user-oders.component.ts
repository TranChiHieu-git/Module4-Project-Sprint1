import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {Order} from '../../models/order';

@Component({
  selector: 'app-user-oders',
  templateUrl: './user-oders.component.html',
  styleUrls: ['./user-oders.component.scss']
})
export class UserOdersComponent implements OnInit {
  orders: Order[];
  currentPage = 0;
  totalPage: number;
  idUser: number;

  constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService,
              private router: Router) {
    this.orderService.curentIdUser.subscribe(message => {
      this.idUser = message;
      this.orderService.findAllOrderByUserId(this.idUser).subscribe((next: any) => {
          this.orders = next.content;
          this.totalPage = next.totalPages;
        },
        error => {
          console.log(error);
          this.orders = null;
        });
    });
  }

  ngOnInit(): void {
  }

  nextPage() {
    this.orderService.findAllOrderByUserIdOnPage(this.idUser, this.currentPage + 1).subscribe((next: any) => {
        this.orders = next.content;
        this.currentPage++;
        console.log(this.currentPage);
      },
      error => {
        console.log(error);
        this.orders = null;
      });
  }

  previousPage() {
    this.orderService.findAllOrderByUserIdOnPage(this.idUser, this.currentPage - 1).subscribe((next: any) => {
        this.orders = next.content;
        this.currentPage--;
      },
      error => {
        console.log(error);
        this.orders = null;
      });
  }

  goToDetailOrder(orderId: number) {
    this.orderService.chanceIdOrder(orderId);

    this.router.navigate(['/user-manage/order-detail']);
  }
}
