import { MatchsComponent } from './matchs.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MatchsComponent],
  imports: [CommonModule, IonicModule],
  exports: [MatchsComponent],
  providers: [],
})
export class MyCustomMatch {}
