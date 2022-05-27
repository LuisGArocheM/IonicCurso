import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  ideas:string[] = ['Spiderman','Avengers','La vida es bella','El señor de los anillos']
  peliculas:Pelicula[] = [];
  buscando= false;
  constructor(private movieService:MoviesService,
    private modalCtrl:ModalController) {}

  Buscar(event){
   const valor = event.detail.value;

    if(valor.length === 0){
      this.buscando = false;
      this.peliculas = [];
      return;
    }


   this.buscando = true;
   this.movieService.BuscarPeliculas(valor ).
   subscribe(res => {
     console.log(res);
     this.peliculas = res['results'];
     this.buscando= false;
   })
   
  }

 async detalle(id:any){
    const modal = await this.modalCtrl.create({
      component:DetalleComponent,
      componentProps: {
        id
      }
    });
  
    modal.present();
  
  }

}
