import {Component, Input} from '@angular/core';
import {MovieServiceService} from "../../movie-service.service";
import {ResponseStatus} from "../movie.component";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {

  @Input
  ('movie') movie: Search = {Poster: "", Title: "", Type: "", Year: "", imdbID: ""};
  searchDetails: SearchDetails | undefined;
  isReadMore: boolean = true;

  constructor(public movieService: MovieServiceService) {}

  openReadMoreDetails() {
    if (!this.searchDetails) {
      this.movieService.getMovieDetailsByID(this.movie.imdbID).subscribe(value => {
        const res = value as ResponseStatus;
        if (res.Error || res.Response == 'False') {
          alert(res.Error)
          return
        }
        const responseSearchDetails = value as SearchDetails;

        this.searchDetails = {
          Actors: responseSearchDetails.Actors,
          Released: responseSearchDetails.Released,
          Runtime: responseSearchDetails.Runtime,
          Director: responseSearchDetails.Director,
          Plot: responseSearchDetails.Plot,
          Language: responseSearchDetails.Language,
          Country: responseSearchDetails.Country,
        };
        console.log(this.searchDetails)
        this.isReadMore = false;
      })
    } else {
      this.isReadMore = false;
    }
  }

  closeReadMoreDetails() {
    this.isReadMore = true;
  }
  protected readonly Object = Object;
}

export interface Search {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface SearchDetails {
  Released: string
  Runtime: string
  Director: string
  Actors: string
  Plot: string
  Language: string
  Country: string
}

export interface Rating {
  Source: string
  Value: string
}
