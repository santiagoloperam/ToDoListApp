import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    }
];

loginUser = {
  email: '',
  password: ''
};

entrando: Boolean = false;


  constructor( private usuarioService: UsuarioService,
               private navCtrl: NavController,
               private uiService: UiServiceService) { }

  ngOnInit() {
    // this.slides.lockSwipes( true );
  }

  async login( fLogin: NgForm ) {

    if ( fLogin.invalid ) { return; }

    this.entrando = true;

    const valido = await this.usuarioService.login( this.loginUser.email, this.loginUser.password );
    console.log(valido);

    if ( valido ) {
      // Navegar a actividades
      
      this.navCtrl.navigateRoot('actividades', { animated: true });
      this.uiService.presentToast('Usuario y contraseña correctos');
      this.entrando = false;
    } else {
      // Mostrar alerta de usuario y contraseña no correctos
      console.log('login no valido');
      console.log(valido);
      this.uiService.presentToast('Usuario y/o contraseña incorrectos');
      this.entrando = false;
    }

  }

}
