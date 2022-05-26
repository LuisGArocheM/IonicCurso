import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() mensaje:any;
  @Output() clickPost = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    console.log(this.mensaje.id);
    this.clickPost.emit(this.mensaje.id);
    
  }

}
