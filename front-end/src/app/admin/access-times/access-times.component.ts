import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-access-times',
  templateUrl: './access-times.component.html',
  styleUrls: ['./access-times.component.scss']
})
export class AccessTimesComponent implements OnInit, AfterViewInit {
  private ctx: CanvasRenderingContext2D;
  @ViewChild('myCanvas')
  myCanvas: ElementRef<HTMLCanvasElement>;
  y = 502;
  x = 0;
  x2 = 0;
  y2 = 450;
  count10 = 502 / 10;
  month1 = 1082 / 12;

  constructor() {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.ctx = this.myCanvas.nativeElement.getContext('2d');
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    this.ctx.moveTo(this.x, this.y);
    for (let i = 0; i < 9; i++) {
      this.ctx.lineTo(this.x = this.x + this.month1, this.y = this.y - this.count10);
    }
    for (let i = 0; i < 3; i++) {
      this.ctx.lineTo(this.x = this.x + this.month1, this.y = this.y + this.count10);
    }
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(this.x2, this.y2);
    this.ctx.strokeStyle = 'blue';
    for (let i = 0; i < 9; i++) {
      this.ctx.lineTo(this.x2 = this.x2 + this.month1, this.y2 = this.y2 - this.count10);
    }
    for (let i = 0; i < 3; i++) {
      this.ctx.lineTo(this.x2 = this.x2 + this.month1, this.y2 = this.y2 + this.count10);
    }
    this.ctx.stroke();

  }

}
