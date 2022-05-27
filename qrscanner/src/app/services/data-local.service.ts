import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  registros:Registro[] = [];
  private _storage: Storage | null = null;

  constructor(private storage:Storage,
    private navCtrl:NavController, private inAppBro: InAppBrowser, private file: File, private emailComposer: EmailComposer) {
    this.init();
    this.cargarStorage();
   }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }


  async cargarStorage (){
    this.registros = (await this.storage.get('registros') || []);
  }


 async gardarRegistro(format:string,text:string){

    await this.cargarStorage();

    const nuevoRegistro = new Registro(format,text);
    this.registros.unshift(nuevoRegistro);
    console.log(this.registros);

    this.storage.set('registros',this.registros);

    this.abrirRegistro(nuevoRegistro);
    

  }

  abrirRegistro(registro:Registro){

    this.navCtrl.navigateForward('/tabs/tab2');

    switch(registro.type){
      case 'http':
           
         this.inAppBro.create(registro.text,'_system');
      break;

      case 'geo':
        this.navCtrl.navigateForward(`/tabs/tab2/mapa/${registro.text}`);
    }
     
  }

  enviarCorreo(){


    const arrTemp = [];
    const Titulos = 'Tipo, Formato, Creado en, Texto\n';

    arrTemp.push(Titulos)

    this.registros.forEach(registros => {
      const linea = `${registros.type}, ${registros.format}, ${registros.created}, ${registros.text.replace(',', ' ')}\n`;
    
       arrTemp.push(linea);

      //  console.log(arrTemp.join(''));
       this.crearArchivoFisico(arrTemp.join(''));
       
    })



  }

  crearArchivoFisico(texto:string){

    this.file.checkFile(this.file.dataDirectory,'registros.csv').then(
      existe => {
        console.log('existe', existe);
        return this.escribirEnArchivo(texto);
        
      }).catch(err => {
        return this.file.createFile(this.file.dataDirectory,'registros.csv', false).
        then( creado => this.escribirEnArchivo(texto))
        .catch(err2 => console.log('No se puedo crear el archivo') )
      });

  }

 async escribirEnArchivo(text:string){

   await this.file.writeExistingFile(this.file.dataDirectory,'registros.csv', text)
   console.log('Archivo creado');
   const archivo = `${this.file.dataDirectory}registros.csv`
   console.log(this.file.dataDirectory + 'registros.csv');
   
   const email = {
    to: 'luisgerardoaroche@gmail.com',
    // cc: 'erika@mustermann.de',
    // bcc: ['john@doe.com', 'jane@doe.com'],
    attachments: [
      archivo
    ],
    subject: 'Backups de scan',
    body: 'Backups de QRScan',
    isHtml: true
  };

  

  // Send a text message using default options
this.emailComposer.open(email);
    

  }
}
