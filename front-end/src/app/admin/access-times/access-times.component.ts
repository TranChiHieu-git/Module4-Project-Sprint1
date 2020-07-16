import {Component, OnInit} from '@angular/core';
import {AccessTimesService} from '../../services/access-times.service';
import {Accesstimes} from '../../models/accesstimes';


@Component({
  selector: 'app-access-times',
  templateUrl: './access-times.component.html',
  styleUrls: ['./access-times.component.scss']
})
export class AccessTimesComponent implements OnInit {
  type = 'msline';
  dataFormat = 'json';
  data: any;
  dataSource = new Object();
  accessTimes: Accesstimes[];
  promiseCounts: any;

  constructor(private accessTimesService: AccessTimesService) {


  }

  ngOnInit(): void {
    this.accessTimesService.findAll().subscribe(next => {
      this.accessTimes = next;
      this.data = {
        chart: {
          caption: 'Lượt truy cập',
          // yAxisName: '% of youth on this platform',
          subcaption: 'Năm ' + this.accessTimes[0].dates.slice(0, 4),
          showhovereffect: '1',
          numbersuffix: 'lần',
          drawcrossline: '1',
          plottooltext: '<b>$dataValue</b> truy cập',
          theme: 'fusion'
        },
        categories: [
          {
            category: [
              {
                label: (Number).parseInt(this.accessTimes[0].dates.split('T')[0].split('-')[2]) + 1 + '/' +
                  this.accessTimes[0].dates.split('T')[0].split('-')[1] + '/' +
                  this.accessTimes[0].dates.split('T')[0].split('-')[0]
              },
              {
                label: (Number).parseInt(this.accessTimes[1].dates.split('T')[0].split('-')[2]) + 1 + '/' +
                  this.accessTimes[1].dates.split('T')[0].split('-')[1] + '/' +
                  this.accessTimes[1].dates.split('T')[0].split('-')[0]
              },
              {
                label: (Number).parseInt(this.accessTimes[2].dates.split('T')[0].split('-')[2]) + 1 + '/' +
                  this.accessTimes[2].dates.split('T')[0].split('-')[1] + '/' +
                  this.accessTimes[2].dates.split('T')[0].split('-')[0]
              },
              {
                label: (Number).parseInt(this.accessTimes[3].dates.split('T')[0].split('-')[2]) + 1 + '/' +
                  this.accessTimes[3].dates.split('T')[0].split('-')[1] + '/' +
                  this.accessTimes[3].dates.split('T')[0].split('-')[0]
              },
              {
                label: (Number).parseInt(this.accessTimes[4].dates.split('T')[0].split('-')[2]) + 1 + '/' +
                  this.accessTimes[4].dates.split('T')[0].split('-')[1] + '/' +
                  this.accessTimes[4].dates.split('T')[0].split('-')[0]
              },
              {
                label: (Number).parseInt(this.accessTimes[5].dates.split('T')[0].split('-')[2]) + 1 + '/' +
                  this.accessTimes[5].dates.split('T')[0].split('-')[1] + '/' +
                  this.accessTimes[5].dates.split('T')[0].split('-')[0]
              },
              {
                label: (Number).parseInt(this.accessTimes[6].dates.split('T')[0].split('-')[2]) + 1 + '/' +
                  this.accessTimes[6].dates.split('T')[0].split('-')[1] + '/' +
                  this.accessTimes[6].dates.split('T')[0].split('-')[0]
              },
              {
                label: (Number).parseInt(this.accessTimes[7].dates.split('T')[0].split('-')[2]) + 1 + '/' +
                  this.accessTimes[7].dates.split('T')[0].split('-')[1] + '/' +
                  this.accessTimes[7].dates.split('T')[0].split('-')[0]
              },
              {
                label: (Number).parseInt(this.accessTimes[8].dates.split('T')[0].split('-')[2]) + 1 + '/' +
                  this.accessTimes[8].dates.split('T')[0].split('-')[1] + '/' +
                  this.accessTimes[8].dates.split('T')[0].split('-')[0]
              },
              {
                label: (Number).parseInt(this.accessTimes[9].dates.split('T')[0].split('-')[2]) + 1 + '/' +
                  this.accessTimes[9].dates.split('T')[0].split('-')[1] + '/' +
                  this.accessTimes[9].dates.split('T')[0].split('-')[0]
              },
              {
                label: (Number).parseInt(this.accessTimes[10].dates.split('T')[0].split('-')[2]) + 1 + '/' +
                  this.accessTimes[10].dates.split('T')[0].split('-')[1] + '/' +
                  this.accessTimes[10].dates.split('T')[0].split('-')[0]
              },
              {
                label: (Number).parseInt(this.accessTimes[11].dates.split('T')[0].split('-')[2]) + 1 + '/' +
                  this.accessTimes[11].dates.split('T')[0].split('-')[1] + '/' +
                  this.accessTimes[11].dates.split('T')[0].split('-')[0]
              },
            ]
          }
        ],
        dataset: [
          {
            data: [
              {
                value: this.accessTimes[0].counts,
              },
              {
                value: this.accessTimes[1].counts
              },
              {
                value: this.accessTimes[2].counts
              },
              {
                value: this.accessTimes[3].counts
              },
              {
                value: this.accessTimes[4].counts
              },
              {
                value: this.accessTimes[5].counts
              },
              {
                value: this.accessTimes[6].counts
              },
              {
                value: this.accessTimes[7].counts
              },
              {
                value: this.accessTimes[8].counts
              },
              {
                value: this.accessTimes[9].counts
              },
              {
                value: this.accessTimes[10].counts
              },
              {
                value: this.accessTimes[11].counts
              }
            ]
          }
        ]

      };
      this.dataSource = this.data;
    });
  }
}
