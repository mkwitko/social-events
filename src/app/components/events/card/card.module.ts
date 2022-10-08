import { CardComponent } from './card.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, IonicModule],
  exports: [CardComponent],
  providers: [],
})
export class MyCustomCardEvent {}
