import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = ""
  password: string = ""
  cpassword: string = ""
  name: string = ""
  company: string = ""
  jobTitle: string = ""
  school: string = ""
  email: string = ""
  phone: string = ""

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public afstore: AngularFirestore,
    public user: UserService,
    public router: Router
    ) { }

  ngOnInit() {
  }

  async register() {
		const { username, password, cpassword, name, company, jobTitle, school, email, phone } = this
		if(password !== cpassword) {
      this.showAlert("Error!", "Passwords don't match")
			return console.error("Passwords don't match")
    }
    
    if (name == "") {
      this.showAlert("Error!", "Please enter your name!")
      return console.error("Name is not enter")
    }

		try {
      // manager to register the user
			const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@codedamn.com', password)

      // create a firestore entry for the user to store info. about the user
      this.afstore.doc(`users/${res.user.uid}`).set({
        username, name, company, jobTitle, school, email, phone
			})

      this.user.setUser({
        username,
        uid: res.user.uid
      })

      this.showAlert("Success!", "Welcome aboard!")
      this.router.navigate(['/tabs'])
		} catch(error) {
      console.dir(error)
      this.showAlert("Error", error.message)
		}
  }
  
  async showAlert(header: string, message: string){
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Ok"]
    })

    await alert.present();
  }
}
