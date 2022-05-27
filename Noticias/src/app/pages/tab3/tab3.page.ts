import { Component } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { StorageServicesService } from 'src/app/services/storage-services.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  get articles(): Article[]{
    return this.storageService.getlocalArticles;
  }

  constructor(private storageService: StorageServicesService) {}

}
