import {Component, OnInit} from '@angular/core';

const data = {
  chart: {
    caption: 'Reach of Social Media Platforms amoung youth',
    yAxisName: '% of youth on this platform',
    subcaption: '2012-2016',
    showhovereffect: '1',
    numbersuffix: '%',
    drawcrossline: '1',
    plottooltext: '<b>$dataValue</b> of youth were on $seriesName',
    theme: 'fusion'
  },
  categories: [
    {
      category: [
        {
          label: '2012'
        },
        {
          label: '2013'
        },
        {
          label: '2014'
        },
        {
          label: '2015'
        },
        {
          label: '2016'
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: 'Facebook',
      data: [
        {
          value: '62'
        },
        {
          value: '64'
        },
        {
          value: '64'
        },
        {
          value: '66'
        },
        {
          value: '78'
        }
      ]
    },
    {
      seriesname: 'Instagram',
      data: [
        {
          value: '16'
        },
        {
          value: '28'
        },
        {
          value: '34'
        },
        {
          value: '42'
        },
        {
          value: '54'
        }
      ]
    },
    {
      seriesname: 'LinkedIn',
      data: [
        {
          value: '20'
        },
        {
          value: '22'
        },
        {
          value: '27'
        },
        {
          value: '22'
        },
        {
          value: '29'
        }
      ]
    },
    {
      seriesname: 'Twitter',
      data: [
        {
          value: '18'
        },
        {
          value: '19'
        },
        {
          value: '21'
        },
        {
          value: '21'
        },
        {
          value: '24'
        }
      ]
    }
  ]
};


@Component({
  selector: 'app-access-times',
  templateUrl: './access-times.component.html',
  styleUrls: ['./access-times.component.scss']
})
export class AccessTimesComponent implements OnInit {
  type = 'msline';
  dataFormat = 'json';
  dataSource = data;

  // dataSource: Object;
  constructor() {
    // const chartData = [
    //   {
    //     label: "1",
    //     value: "50"
    //   },
    //   {
    //     label: "2",
    //     value: "70"
    //   },
    //   {
    //     label: "3",
    //     value: "40"
    //   },
    //   {
    //     label: "4",
    //     value: "120"
    //   },
    //   {
    //     label: "5",
    //     value: "115"
    //   },
    //   {
    //     label: "6",
    //     value: "100"
    //   },
    //   {
    //     label: "7",
    //     value: "78"
    //   },
    //   {
    //     label: "8",
    //     value: "49"
    //   }
    // ];
    // // STEP 3 - Chart Configuration
    // const dataSource = {
    //   chart: {
    //     //Set the chart caption
    //     caption: "Số lượt truy cập trang web [01/2020 - 08/2020]",
    //     //Set the chart subcaption
    //     // subCaption: "In MMbbl = One Million barrels",
    //     //Set the x-axis name
    //     xAxisName: "tháng",
    //     //Set the y-axis name
    //     yaxisname: "lượt truy cập",
    //     numberSuffix: "",
    //     //Set the theme for your chart
    //     theme: "fusion"
    //   },
    //   // // Chart Data - from step 2
    //   data: chartData
    // };
    // this.dataSource = dataSource;
  }

  ngOnInit(): void {
  }
}
