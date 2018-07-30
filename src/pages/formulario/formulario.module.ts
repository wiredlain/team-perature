import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormularioPage } from './formulario';
import { IonSimpleWizardStep } from '../ion-simple-wizard/ion-simple-wizard.step.component';
import { IonSimpleWizard } from '../ion-simple-wizard/ion-simple-wizard.component';

@NgModule({
  declarations: [
    FormularioPage,
    IonSimpleWizard, IonSimpleWizardStep
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
