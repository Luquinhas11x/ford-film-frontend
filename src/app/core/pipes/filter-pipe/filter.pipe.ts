import { Pipe, PipeTransform } from '@angular/core';
import { debounce } from 'rxjs';
import { filmCard } from '../../models/film';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(film: filmCard[], digitado: string): filmCard[] {
    digitado = digitado.toLowerCase();
    return film.filter(newFilm => newFilm.name.toLowerCase().includes(digitado));
  }
}


