import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filmCard } from 'src/app/core/models/film';
import { FilmService } from 'src/app/core/services/film.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  createFilmSubscription = new Subscription;

  filmForm!: FormGroup;

  filmList: filmCard[] = [];

  valor: number = 0;

  constructor(private fb: FormBuilder, private service: FilmService, private messageService: MessageService) {
    this.formConfig();
  }

  ngOnInit(): void {
  }

  submitFilm() {
    this.createFilmSubscription = this.service.addFilm(this.filmForm.value as filmCard).subscribe({
      next: response => { this.filmList.push(response) },
      error: error => { console.log(error) }
    });
    console.log(this.filmForm.value);
    this.filmForm.reset('');
    this.messageService.add({ severity: 'success', summary: 'Postado', detail: 'Filme postado com sucesso!' });
  }

  formConfig() {
    this.filmForm = this.fb.group({
      id: [new Date().getTime()],
      banner: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      date: [new Date(), [Validators.required]],
      score: [null, [Validators.required]],
      status: [false],
      category: this.fb.array([
        this.fb.control('')
      ]),
      director: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  get category() {
    return this.filmForm.get('category') as FormArray;
  }

  addCategory() {
    this.category.push(this.fb.control(''));
  }

  ngOnDestroy(): void {
    this.createFilmSubscription.unsubscribe();
  }

}
