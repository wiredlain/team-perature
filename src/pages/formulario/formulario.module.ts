import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormularioPage } from './formulario';

@NgModule({
  declarations: [
    FormularioPage,
  ],
  imports: [
    IonicPageModule.forChild(FormularioPage),
  ],
  exports: [
    FormularioPage
  ],
  entryComponents: [
    FormularioPage
  ]
})
export class FormularioPageModule { }
