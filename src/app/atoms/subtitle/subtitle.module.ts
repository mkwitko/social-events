import { SubtitleComponent } from './subtitle.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SubtitleComponent],
  imports: [CommonModule, IonicModule],
  exports: [SubtitleComponent],
  providers: [],
})
export class MyCustomSubtitle {}
