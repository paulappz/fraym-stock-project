import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  market: Array<Object> = [
    { id: 1, company: "Int'l Business Machines", link: "/IBM.json" },
    { id: 1, company: 'Citibank', link: "/CITI.json" },
    { id: 1, company: 'American Express Co.', link: "/XP.json" },
    { id: 1, company: 'CVS Health Corp', link: "/CVS.json" },
    { id: 1, company: 'General Electric', link: "/GE.json" },

  ];

  selectedMarket = this.market[0];
  constructor() { }

  ngOnInit(): void {
  }

}
