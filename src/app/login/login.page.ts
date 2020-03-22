import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = "";
  password: string = "";

  constructor(
    public afAuth: AngularFireAuth,
    public user: UserService,
    public router: Router,
    public alert: AlertController) { }

  ngOnInit() {
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  async showAlert(header: string, message: string){
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Ok"]
    });
    await alert.present();
  }

  async login() {
    const { username, password } = this
    try {
      // kind of a hack
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@codedamn.com', password);

      // if user is found
      if(res.user) {
        this.user.setUser({
          username,
          uid: res.user.uid
        })
        this.router.navigate(['/tabs']);
      }

    } catch(err) {
      console.dir(err)
      if(err.code === "auth/user-not-found") {
        this.showAlert("Error!", "User not found!");
      }
      if (err.code === "auth/wrong-password") {
        this.showAlert("Error!", "Wrong Password! Try again!")
      }
    }
  }

}
