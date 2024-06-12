import {Component, Inject, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import {MovieServiceService} from "../movie-service.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MovieCardComponent} from "./movie-card/movie-card.component";

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    FormsModule,
    NgOptimizedImage,
    MovieCardComponent
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {

  @Input('siteName') siteName: string = '';
  currentPage: number = 1;
  totalPages: number = 0;
  searchData: string = '';
  movieSearchResult: MovieSearchResult | undefined;

  constructor(public movieService: MovieServiceService, public dialog: MatDialog) {
  }

  searchMovie(page: number = 1): void {
    this.movieService.searchMovieByPage(this.searchData, page).subscribe(value => {
      const res = value as MovieSearchResult;
      if (res.Error || res.Response == 'False') {
        alert(res.Error)
        return
      }
      this.movieSearchResult = res;
      this.totalPages = Math.ceil(this.movieSearchResult.totalResults / 10);
    });
  }

  goToNextPage() {
    if (this.currentPage != this.totalPages) {
      this.searchMovie(this.currentPage + 1)
      this.currentPage++;
    }

  }

  goToPreviousPage() {
    if (this.currentPage != 1) {
      this.searchMovie(this.currentPage - 1)
      this.currentPage--;
    }
  }

  openMovieDetails(movieId: string) {

  }


}

export interface MovieSearchResult extends ResponseStatus {
  Search: Search[]
  totalResults: number

}

export interface ResponseStatus {
  Response: string
  Error: string
}

export interface Search {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}
