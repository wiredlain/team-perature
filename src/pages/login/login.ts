import { Component } from "@angular/core";
import {
	IonicPage,
	NavController,
	LoadingController,
	Loading,
	AlertController
} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { Observable } from "rxjs/Observable";
import { JwtService } from "../../providers/jwt-service/jwt-service";
import { UserServiceProvider } from "../../providers/user-service/user-service";

@IonicPage()
@Component({
	selector: "page-login",
	templateUrl: "login.html"
})
export class LoginPage {
	myForm: FormGroup;
	user: Observable<firebase.User>;
	public loading: Loading;

	constructor(
		public navCtrl: NavController,
		public formBuilder: FormBuilder,
		public afAuth: AngularFireAuth,
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		public jwtService: JwtService,
		public authService: UserServiceProvider
	) {
		this.myForm = this.formBuilder.group({
			email: ["", Validators.required],
			password: ["", Validators.required]
		});
		this.user = afAuth.authState;
		
	}

	loginUser() {
		console.log("Email:" + this.myForm.value.email);
		console.log("Password:" + this.myForm.value.password);
		this.loading = this.loadingCtrl.create({
			dismissOnPageChange: true
		});
		this.loading.present().then(() => {
			this.afAuth.auth
			.signInWithEmailAndPassword(
				this.myForm.value.email,
				this.myForm.value.password
			)
			.then(
				(user) => {
					this.authService.getToken("1").subscribe((token) => {
						this.jwtService.saveToken(token);
						this.loading.dismiss();
						this.navCtrl.setRoot("HomePage");
					}, err => {
						this.loading.dismiss().then(() => {
							let alert = this.alertCtrl.create({
								message: "Error al autentificar",
								buttons: [
									{
										text: "Ok",
										role: "cancel",
										handler: () => {
											this.navCtrl.setRoot("LoginPage");
										}
									}
								]
							});
							alert.present();
						});
					});
					// this.afAuth.auth.currentUser.getIdToken().then((token) => {
					// 	this.jwtService.saveToken(token);
					// })
				},
				err => {
					this.loading.dismiss().then(() => {
						let alert = this.alertCtrl.create({
							message: err.message,
							buttons: [
								{
									text: "Ok",
									role: "cancel"
								}
							]
						});
						alert.present();
					});
				}
			);
		});
	}

	goToResetPassword() {
		this.navCtrl.push("ResetPasswordPage");
	}
}
