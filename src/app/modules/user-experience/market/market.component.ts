import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filmCard } from 'src/app/core/models/film';
import { FilmService } from 'src/app/core/services/film.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {

  getMarketFilmsSubscription = new Subscription;

  films: filmCard[] = []

  constructor(private service: FilmService) {

  }

  ngOnInit(): void {
    this.getFilms();
  }

  getFilms() {
    this.getMarketFilmsSubscription = this.service.getall().subscribe(film => this.films = film.sort(function (a: filmCard, b: filmCard) {
      return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
    }))
  }

  filtrar(palavraChave: string) {
    if (palavraChave) {
      palavraChave = palavraChave.toUpperCase();

      this.films = this.films.filter(a =>
        a.name.toUpperCase().indexOf(palavraChave) >= 0
      );
    }
  }

  ngOnDestroy(): void {
    this.getMarketFilmsSubscription.unsubscribe();
  }
}
