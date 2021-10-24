import { Component } from '@angular/core';
import {


  LoaderService,
} from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fraym-stocks-project';

  constructor(
    public loaderService: LoaderService,

  ) { }
}