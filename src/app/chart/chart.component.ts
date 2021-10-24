import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

import {

  StockDataService,
  LoaderService
} from '../services';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit {
  graphGenerated: Boolean = false;
  public options: any = {}

  markets = [
    { id: 1, company: "Int'l Business Machines", link: "IBM.json" },
    { id: 2, company: 'American Express Co.', link: "AXP.json" },
    { id: 3, company: 'CVS Health Corp', link: "CVS.json" },
    { id: 4, company: 'General Electric', link: "GE.json" },
  ];

  selectedMarket: any;

  constructor(
    public stockDataService: StockDataService,
    public loaderService: LoaderService
  ) {
    this.selectedMarket = this.markets[0].id;
    this.fetchData(this.markets[0].link)
  }

  ngOnInit() {

  }

  fetchData(apiJson: any) {
    this.stockDataService.getStockData(apiJson).subscribe(
      data => {
        let stockData: any;
        stockData = data;
        let pointStartDate = '';
        let pointEndDate = '';
        let startYear = 0;
        let startMonth = 0;
        let startDay = 0;

        // Set Start Date for Graph:
        pointStartDate = stockData.dataset.oldest_available_date.replace(/-/g, '/');
        startYear = parseFloat(pointStartDate.substring(0, 4));
        startMonth = parseFloat(pointStartDate.substring(5, 7)) - 1;
        startDay = parseFloat(pointStartDate.substring(8.9));

        // Set End Date for Graph:
        pointEndDate = stockData.dataset.newest_available_date.replace(/-/g, '/');

        // Initialize high/low/mid arrays
        let highArray: any = [];
        let lowArray: any = [];
        let midArray: any = [];

        stockData.dataset.data.forEach((arrayItem: any) => {
          // Initialize temp array 
          let initArray = arrayItem;

          // Push High/Low value into respective arrays
          highArray.push(initArray[2]);
          lowArray.push(initArray[3]);

          // Calculate Avg value and push into midArray
          let midValue = (arrayItem[2] + arrayItem[3]) / 2
          midArray.push(midValue);
        });

        // Set options for graph
        this.options = {
          rangeSelector: {
            enabled: true,
            selected: 3
          },
          tooltip: {
            valueDecimals: 2,
            valuePrefix: '$',
            valueSuffix: ' USD'
          },
          title: {
            text: stockData.dataset.name
          },
          xAxis: {
            type: 'datetime',
            min: new Date(pointStartDate).getTime(),
            max: new Date(pointEndDate).getTime()
          },
          plotOptions: {
            series: {
              pointStart: Date.UTC(startYear, startMonth, startDay),
              pointInterval: 24 * 3600 * 1000, // one day
            }
          },
          series: [
            {
              name: 'High',
              step: 'left',
              data: highArray
            },
            {
              name: 'Mid',
              step: 'center',
              data: midArray
            },
            {
              name: 'Low',
              step: 'right',
              data: lowArray
            }
          ]
        }

        this.graphGenerated = true;
        if (this.options != {} && this.graphGenerated === true) {

          Highcharts.chart('graphContainer', this.options);
        }
      },
      error => {
        Highcharts.chart('graphContainer', {});
      }
    )
  }

}

