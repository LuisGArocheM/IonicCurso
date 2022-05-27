import { Component, OnInit } from '@angular/core';
import { Genre, Pelicula, PeliculaDetalle } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  peliculas: Pelicula[] = [];
  generos: Genre[] = [];

  favGenero: any[] = [{
    
  }]

  constructor(private dataLocal:DataLocalService,
    private movieService:MoviesService) {}
  
 

 async ionViewWillEnter(){
    
   this.peliculas= await this.dataLocal.cargarFavoritos();
   this.generos= await this.movieService.cargarGeneros();
 
   this.pelisPorGenero(this.generos,this.peliculas);
 
  }

  pelisPorGenero(generos:Genre[],peliculas:PeliculaDetalle[]){

    this.favGenero = [];

    generos.forEach(genero => {

      this.favGenero.push({
        genero: genero.name,
        pelis: peliculas.filter(peli => {
          return peli.genres.find(genre => genre.id === genero.id)
        })
      });

    });
    console.log(this.favGenero);
    
  }

}
