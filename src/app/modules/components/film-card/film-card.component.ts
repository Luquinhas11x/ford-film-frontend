import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { filmCard } from 'src/app/core/models/film';
import { FilmService } from 'src/app/core/services/film.service';
import { ConfirmationService, ConfirmEventType, Message, MessageService } from 'primeng/api';
import { debounceTime, fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnInit {

  deletFilmSubscription = new Subscription;
  inMyListSubscription = new Subscription;
  inTheMarketSubscription = new Subscription;
  newFilmInfoSubscription = new Subscription;
  debounceTimeSubscription = new Subscription;
  getMarketFilmsSubscription = new Subscription;


  @Input() films: filmCard[] = [];

  @Input() status!: boolean;

  displayModal!: boolean;

  editFilm!: filmCard;

  searchText = '';

  cancelInput!: string

  val1!: number;

  @ViewChild('campoBusca') campoBusca!: ElementRef<HTMLInputElement>;



  constructor(private service: FilmService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  delet(filmId: number) {
    this.deletFilmSubscription = this.service.deletFilm(filmId).subscribe(response => {
      this.films = this.films.filter(film => film.id != filmId)
    })
  }

  inMyList(film: filmCard) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo adicionar ' + film.name + ' a sua lista?',
      header: 'Favorito!',
      icon: 'pi pi-info-circle',
      accept: () => {
        film.status = true
        this.inMyListSubscription = this.service.uptadeFilm(film, film.id).subscribe();
        this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Filme adicionado em sua lista' });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Você cancelou' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: 'Você rejeitou' });
            break;
        }
      }
    });

  }

  inTheMarket(film: filmCard) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo adicionar ' + film.name + ' ao mercado?',
      header: 'Mercado!',
      icon: 'pi pi-info-circle',
      accept: () => {
        film.status = false
        this.inTheMarketSubscription = this.service.uptadeFilm(film, film.id).subscribe();
        this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Filme enviado de volta ao mercado!' });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Você cancelou' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: 'Você rejeitou' });
            break;
        }
      }
    });

  }

  showModalDialog(dialogFilm: filmCard) {
    this.displayModal = true;
    this.editFilm = { ...dialogFilm };
  }

  edit(editedFilm: filmCard): void {
    this.newFilmInfoSubscription = this.service.uptadeFilm(editedFilm, editedFilm.id).subscribe(
      film => {
        this.films[this.films.findIndex(beforEditingFilm => beforEditingFilm.id === film.id)] = film
      }
    );
    this.getMarketFilmsSubscription = this.service.getall().subscribe(film => this.films = film.sort(function (a: filmCard, b: filmCard) {
      return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
    }))

    this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Informações atualizadas' });
  }

  editStar(editStarFilm: filmCard) {
    this.service.uptadeFilm(editStarFilm, editStarFilm.id).subscribe(
      film => {
        this.films[this.films.findIndex(beforEditingFilm => beforEditingFilm.id === film.id)] = film
      }
    )
    this.service.getall().subscribe(film => this.films = film.sort(function (a: filmCard, b: filmCard) {
      return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
    }))
    this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Informações atualizadas' });

  }

  deletComplete(film: filmCard) {
    this.confirmationService.confirm({
      message: 'Deseja mesmo deletar ' + film.name + '?',
      header: 'Deletar!',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Deletado', detail: 'Filme deletado' });
        this.delet(film.id);
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Você cancelou' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: 'Você rejeitou' });
            break;
        }
      }
    });
  }

  desabled() {
    this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Para editar, apenas na sua lista!' });
  }

  clean() {
    this.cancelInput = ''
    this.searchText = '';
  }

  cancel(): void {
    this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Atualizações canceladas' });
  }

  ngAfterViewInit() {
    this.debounceTimeSubscription = fromEvent(this.campoBusca.nativeElement, 'keyup')
      .pipe(
        debounceTime(1500)
      )
      .subscribe((e: Event) => {
        const target = e.target as HTMLInputElement;
        this.searchText = target.value;
      });
  }

  ngOnDestroy(): void {
    this.deletFilmSubscription.unsubscribe();
    this.inMyListSubscription.unsubscribe();
    this.inTheMarketSubscription.unsubscribe();
    this.newFilmInfoSubscription.unsubscribe();
    this.debounceTimeSubscription.unsubscribe();
    this.getMarketFilmsSubscription.unsubscribe();
  }

}
