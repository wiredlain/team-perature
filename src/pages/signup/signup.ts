import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, 
  Loading, 
  AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  myForm: FormGroup;
  public loading:Loading;
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public afAuth: AngularFireAuth, 
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signup(){

    console.log("Email:" + this.myForm.value.email);
    console.log("Password:" + this.myForm.value.password);
   

    this.afAuth.auth.createUserWithEmailAndPassword(this.myForm.value.email, this.myForm.value.password)
    .then(
      res => {
        this.navCtrl.setRoot('HomePage');
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    
  }

}
