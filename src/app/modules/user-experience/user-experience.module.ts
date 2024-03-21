import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserExperienceRoutingModule } from './user-experience-routing.module';
import { MarketComponent } from './market/market.component';
import { MyListComponent } from './my-list/my-list.component';
import { FilmCardComponent } from '../components/film-card/film-card.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { FilterPipe } from 'src/app/core/pipes/filter-pipe/filter.pipe';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';

@NgModule({
  declarations: [
    MarketComponent,
    MyListComponent,
    FilmCardComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    UserExperienceRoutingModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ConfirmDialogModule,
    MessagesModule,
    ToastModule,
    TooltipModule,
    InputTextModule,
    RatingModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class UserExperienceModule { }
