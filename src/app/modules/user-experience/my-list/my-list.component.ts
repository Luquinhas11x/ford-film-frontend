import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filmCard } from 'src/app/core/models/film';
import { FilmService } from 'src/app/core/services/film.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {

  getMyListFilmsSubscription = new Subscription;

  films: filmCard[] = []

  constructor(private service: FilmService) { }

  ngOnInit(): void {
    this.getFilms()
  }

  getFilms() {
    this.getMyListFilmsSubscription = this.service.getall().subscribe(film => this.films = film.sort(function (a: filmCard, b: filmCard) {
      return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
    }))
  }

  ngOnDestroy(): void {
    this.getMyListFilmsSubscription.unsubscribe();
  }
}
