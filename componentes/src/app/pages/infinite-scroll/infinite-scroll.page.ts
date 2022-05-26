import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.page.html',
  styleUrls: ['./infinite-scroll.page.scss'],
})
export class InfiniteScrollPage implements OnInit {

  data: any[] = Array(20);

@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor() { }

  ngOnInit() {
  }

  loadData(event:any){
     console.log(event);
     console.log('Done');
     setTimeout(() => {
     
      if(this.data.length > 50){
        this.infiniteScroll.complete();
        this.infiniteScroll.disabled = true;
        return;
      }

       const nuevoArr = Array(20);
       this.data.push(... nuevoArr);
      // event.target.complete();
      
     },1500)
    
     
  }

}
