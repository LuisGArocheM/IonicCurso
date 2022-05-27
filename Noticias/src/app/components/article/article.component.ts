import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';
import { StorageServicesService } from 'src/app/services/storage-services.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  @Input() article: Article;
  @Input() index:number;
  
  constructor(private iaB: InAppBrowser, 
    private platform: Platform,
    private actionSheet: ActionSheetController,
    private socialSharing: SocialSharing,
    private storageService: StorageServicesService) { }

  ngOnInit() {}

  openArticle(){

    if(this.platform.is('ios') || this.platform.is('android')){
      const browser = this.iaB.create(this.article.url);
      browser.show()
    }
      window.open(this.article.url,'_blank')
  }

 async onOpenMenu(){

  const articlesInFavorites = this.storageService.articlesInFavorites(this.article);


  const normalBts: ActionSheetButton[]= [
    
    {
      text:  articlesInFavorites ? 'Remover' : 'Favorito',
      icon:  articlesInFavorites ? 'heart' : 'heart-outline',
      handler: ()=> this.onToggleFavorite()
    },
    {
      text: 'Cancelar',
      icon: 'close-outline',
      role: 'cancel'
    }
  ]


  const shareBtn: ActionSheetButton = {
    text:'Compartir',
    icon:'share-outline',
    handler: ()=> this.onShareArticle()

  }

  if(this.platform.is('capacitor')){
     normalBts.unshift(shareBtn)

  }

  const actionSheet = await this.actionSheet.create({
    header:'Opciones',
    buttons: normalBts
  })


 



 

    await actionSheet.present();

  }

  onShareArticle(){
    console.log('Comparte articulo');
    this.socialSharing.share(
      this.article.title,
      this.article.source.name,
      null,
      this.article.url
    )
    
  }

  onToggleFavorite(){
     this.storageService.saveRemoveArticle(this.article);
  }

}
