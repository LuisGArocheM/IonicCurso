import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageServicesService {


  private _localArticles: Article[] = [];
  private _storage: Storage | null = null;

  constructor(private storage: Storage) { 
    this.init();
    this.loadFavorites();
  }


  get getlocalArticles(){
    return [...this._localArticles]
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async saveRemoveArticle(article: Article){

    const exists = this._localArticles.find(localArticle => localArticle.title === article.title);

    if(exists){
      this._localArticles = this._localArticles.filter(localArticle => localArticle.title !== article.title)
    }else{
      this._localArticles = [article, ...this._localArticles];

    }
    this._storage.set('articles', this._localArticles)

  }

  async loadFavorites(){
    try{
      const articles = await this._storage.get('articles');
      this._localArticles = articles || [];


    }catch(error){
    
  }
}

  articlesInFavorites(articles: Article){
    return !!this._localArticles.find(localArticles => localArticles.title === articles.title);
  }
}
