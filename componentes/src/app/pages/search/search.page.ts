import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  albums: any[] = [];
  textBuscar: string = '';
  constructor(private dataServie:DataService) { }

  ngOnInit() {

    this.dataServie.getAlbums().subscribe((albums:any) => {
      console.log(albums);
      this.albums = albums;
      
    } )
  }

  buscar(ev:any){
    console.log(ev);
    this.textBuscar = ev.detail.value;
    
  }

}
