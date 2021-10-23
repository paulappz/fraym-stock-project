import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class StockDataService {
    public apiStockData!: any[];

    constructor(
        private http: HttpClient
    ) { }

    public getStockData(apiPath: any) {
        return this.http.get(apiPath);
    }

}