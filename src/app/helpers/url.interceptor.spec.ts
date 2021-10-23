import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { StockDataService } from '../services/stockData.service';
import { UrlInterceptor } from './url.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

describe(`AuthHttpInterceptor`, () => {
    let service: StockDataService;
    let httpMock: HttpTestingController;
    let apiUrl = 'https://www.quandl.com/api/v3/datasets/WIKI/';
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                StockDataService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: UrlInterceptor,
                    multi: true,
                },
            ],
        });

        service = TestBed.get(StockDataService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should add an Authorization header', () => {
        service.getStockData(apiUrl + '/AAPL.json').subscribe(response => {
            expect(response).toBeTruthy();
        });

        const httpRequest = httpMock.expectOne(`${apiUrl}/AAPL.json`);

        expect(httpRequest.request.headers.has('Content-Type')).toEqual(true);
        expect(httpRequest.request.headers.has('Accept')).toEqual(true);

    });
});

