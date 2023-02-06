import { SearchComponent } from './search.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, IonicModule],
  exports: [SearchComponent],
  providers: [],
})
export class MyCustomSearch {}
