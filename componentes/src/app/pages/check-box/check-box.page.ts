import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.page.html',
  styleUrls: ['./check-box.page.scss'],
})
export class CheckBoxPage implements OnInit {

  data = [
    {
      name: 'primary',
      selected: false
    },
    {
      name: 'secondary',
      selected: true
    },
    {
      name: 'tertiary',
      selected: false
    },
    {
      name: 'success',
      selected: true
    }
  ]

  constructor() { }

  ngOnInit() {
  }
  
  OnClick(item: any){
    console.log(item);
    
  }

  verData(){
    console.log(this.data);
    
  }
}
