import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, Loading, AlertController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  myForm: FormGroup;
  user: Observable<firebase.User>;
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
    this.user = afAuth.authState;
  }

  loginUser(){

    console.log("Email:" + this.myForm.value.email);
    console.log("Password:" + this.myForm.value.password);
   

    this.afAuth.auth.signInWithEmailAndPassword(this.myForm.value.email, this.myForm.value.password).then(() => {
      console.log("User logging");
      this.navCtrl.setRoot('HomePage');
    }, (err) => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: err.message,
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
  

  goToSignup(){
    this.navCtrl.push('SignupPage');
  }

  goToResetPassword(){
    this.navCtrl.push('ResetPasswordPage');
  }

}
