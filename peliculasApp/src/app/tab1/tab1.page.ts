import { Component, OnInit } from '@angular/core';
import { Pelicula, RespuestaMDB } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];


  constructor(private movieService: MoviesService) {}
  ngOnInit(): void {
    this.movieService.getFeature().subscribe(res => {
      //console.log('Peliculas', res  );
      this.peliculasRecientes = res.results;
      
    })

    // this.movieService.getPopulares().
    // subscribe(res => {
    //   console.log('Populares', res);
    //   this.populares = res.results;
      
    // })

    this,this.getPopulares();
  }

  cargarMas(){
     this.getPopulares();
  }

  getPopulares(){

    this.movieService.getPopulares().
    subscribe(res => {
      console.log('Populares', res);
      // this.populares =res.results ;
     const arrTemp = [...this.populares,...res.results]

      this.populares = arrTemp;
      
    })

  }

}


