import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { RatingDto } from 'src/common/models/RatingDto.class';


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    host = "http://rating.141.riskprof.ru/ajax";

    constructor(private http: HttpClient) {  }

    public getAll (): Observable<RatingDto[]> {
        return this.http.get(this.host + '/list/rating?isroot=1')
            .pipe(map((data: any) => {
                if (!data) return [];

                return data.map(el => {
                    return new RatingDto(el);
                });
            }),
            catchError(this.errorHandler));
    }

    public getChildren (parentId: number): Observable<RatingDto[]> {
        return this.http.get(this.host + '/list/rating?parentId=' + parentId)
            .pipe(map((data: any) => {
                console.log(data);

                if (!data) return [];

                return data.map(el => {
                    return new RatingDto(el);
                });
            }),
            catchError(this.errorHandler));
    }

    private errorHandler(error: any): ObservableInput<any> {
        return throwError(error);
    }

}
