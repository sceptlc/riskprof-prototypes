import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
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

    public create (rating: RatingDto): Observable<RatingDto> {
        var options = { 
            headers: new HttpHeaders({'Content-Type': 'text/plain'}), 
            params: new HttpParams()
        };
        options.params = options.params.append('parentId', rating.parentId.toString());
        options.params = options.params.append('title', rating.title);
        options.params = options.params.append('key', rating.key);

        return this.http.post(
            this.host + '/create/rating', {}, options)
            .pipe(map((response: any) => {
                rating.id = response;
                return rating;
            }));
    }

    public update (rating: RatingDto): Observable<RatingDto> {
        var options = { 
            headers: new HttpHeaders({'Content-Type': 'text/plain'}), 
            params: new HttpParams()
        };
        options.params = options.params.append('id', rating.id.toString());
        options.params = options.params.append('parentId', rating.parentId.toString());
        options.params = options.params.append('title', rating.title);
        options.params = options.params.append('key', rating.key);

        return this.http.post(
            this.host + '/update/rating', {}, options)
            .pipe(map((response: any) => {
                if (response == "Ок")
                    return rating;
                else throw "Some error on update!";
            }));
    }

    public delete (rating: RatingDto): Observable<boolean> {
        var options = { 
            headers: new HttpHeaders({'Access-Control-Allow-Methods': 'DELETE'}), 
            // params: new HttpParams()
        };
        // options.params = options.params.append('id', rating.id.toString());

        return this.http.delete(
            this.host + '/delete/rating?id=' + rating.id, options)
            .pipe(map((response: any) => {
                return (response === "Ок")
            }));
    }

    private errorHandler(error: any): ObservableInput<any> {
        return throwError(error);
    }

}
