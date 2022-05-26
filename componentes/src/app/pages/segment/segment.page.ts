import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.page.html',
  styleUrls: ['./segment.page.scss'],
})
export class SegmentPage implements OnInit {

  superHeroes: Observable<any>;
  publisher: string = 'todos';
  constructor(private dataServie: DataService) { }

  ngOnInit() {
    this.superHeroes = this.dataServie.getHeroes();
  }

  segmentChanged(event:any){
     //console.log(event);
     if(event.detail.value === 'todos'){
         return this.publisher = '';
     }


     this.publisher = event.detail.value;
     
  }

}
