import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpcionesHomePage } from './opciones-home';

@NgModule({
  declarations: [
    OpcionesHomePage,
  ],
  imports: [
    IonicPageModule.forChild(OpcionesHomePage),
  ],
})
export class OpcionesHomePageModule {}
