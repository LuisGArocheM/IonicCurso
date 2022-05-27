import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  slidesOpt = {
    slidesPerView: 1.3,
    freeMode: true
  }
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}
  
 async verDetalle(id:any){

    const modal = await this.modalCtrl.create({
      component:DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();

  }

}
