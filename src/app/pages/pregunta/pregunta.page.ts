import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import {  Navigation, NavigationExtras } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreguntaPage implements OnInit {
  public usuario: Usuario | undefined;
  public respuesta: string = '';

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router) {
      this.activatedRoute.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation()?.extras.state) {
          this.usuario = this.router.getCurrentNavigation()?.extras.state?.['usuario'];
        } else {
          this.router.navigate(['/ingreso']);
        }
      });
    
   }

  ngOnInit() {
  }
  public validarRespuestaSecreta(): void {
    if (this.usuario?.respuestaSecreta === this.respuesta) {
      const navigationExtras: NavigationExtras = {
        queryParams: {}, // Puedes agregar parámetros de consulta si es necesario
        state: {usuario: this.usuario} // Puedes pasar datos adicionales al estado si es necesario
      };
      this.router.navigate(['/correcto'],navigationExtras);
      
    }
    else {
      this.router.navigate(['/incorrecto']);
    }
  }

  irALogin() {
    
    this.router.navigate(['/ingreso']);
  }

}
