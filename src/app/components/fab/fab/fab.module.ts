import { FabComponent } from './fab.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FabComponent],
  imports: [CommonModule, IonicModule],
  exports: [FabComponent],
  providers: [],
})
export class MyCustomFab {}
