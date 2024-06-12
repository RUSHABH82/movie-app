import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AddressComponent} from "./address/address.component";
import {MovieComponent} from "./movie/movie.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddressComponent, MovieComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Hello world1';
  name = 'Rushabh';
}
