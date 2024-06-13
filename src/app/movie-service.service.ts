import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, Observer, throwError} from "rxjs";
import {MovieSearchResult, ResponseStatus} from "./movie/movie.component";
import {Search, SearchDetails} from "./movie/movie-card/movie-card.component";

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  private httpClient: HttpClient
  private API_KEY = process.env['API_KEY'] || '';

  searchMovieByPage(text: string, page: number) {
    console.log(process.env)
    return this.httpClient
      .get("https://www.omdbapi.com/?apikey="+this.API_KEY+"&s=".concat(text).concat('&page=').concat(page.toString()))
      .pipe(catchError(this.handleError));
  }

  getMovieDetailsByID(id: string) {

    const existingLocalStorageObjects = JSON.parse(localStorage.getItem('movie-details-data') || '{}');
    const a = Object.entries(existingLocalStorageObjects).find(([key, val]) => key === id);
    if (a) {
      return new Observable((observer) => {
        observer.next(a[1]);
        observer.complete();
      })
    }
    const res = this.httpClient
      .get("https://www.omdbapi.com/?apikey=d4d72c42&i=".concat(id))
      .pipe(catchError(this.handleError));
    res.subscribe(value => {
      if ((value as ResponseStatus).Response === 'True') {
        const existingLocalStorageObjects = JSON.parse(localStorage.getItem('movie-details-data') || '{}');
        existingLocalStorageObjects[(value as Search).imdbID] = value;
        localStorage.setItem('movie-details-data', JSON.stringify(existingLocalStorageObjects));
      }
    })
    return res;

  }

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    console.log(process.env)
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, JSON.stringify(error.error));
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
