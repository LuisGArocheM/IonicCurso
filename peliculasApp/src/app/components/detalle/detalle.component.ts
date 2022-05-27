import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;
  peliculaDetalle: PeliculaDetalle= {};
  oculto= 150;
  actores: Cast[] = [];
  estrella = 'star-outline';

  slideActor = {
    slidePerView: 1.3,
    freeMode: true,
    spacebetween: -5
  }
  constructor(private movieService:MoviesService,
    private modalCtrl: ModalController,
    private dataLocal:DataLocalService) { }

  ngOnInit() {

  this.dataLocal.existePelicula(this.id).
  then(existe => this.estrella = (existe)? 'star' : 'star-outline')

  

    console.log('ID', this.id);
    this.movieService.getPeliculaDetalle(this.id).
    subscribe(res => {
      this.peliculaDetalle = res;
      
    });
    

    this.movieService.getActoresPelicula(this.id).
    subscribe(res => {
      console.log(res);
      this.actores = res.cast;
      
    });
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

  favorito(){
    const existe = this.dataLocal.guardarPelicula(this.peliculaDetalle);
    this.estrella = (existe)? 'star' : 'star-outline';
  }

  

}
