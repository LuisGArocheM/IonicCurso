import { EventEmitter, Injectable } from '@angular/core';
import { OneSignal, OSNotification, OSNotificationPayload} from '@awesome-cordova-plugins/onesignal/ngx';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  mensajes:OSNotificationPayload[]= [
    // {
    //   title:'Titulo de la push',
    //   body:'Body de la push',
    //   data: new Date()
    // }
  ];

  private _storage: Storage | null = null;
  userId:string;


  constructor(private oneSignal: OneSignal, private storage:Storage) {
      this.init();
      this.cargarMensajes();

   }

   pushListener = new EventEmitter<OSNotificationPayload>();



   async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }


  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  async getMensajes(){
   await this.cargarMensajes();
   return [...this.mensajes];
  }

  configuracionInicial() {
    this.oneSignal.startInit('be5d2c28-78fa-456d-b4c5-b84979d94d4a', '776961520228');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
      // do something when notification is received
      console.log('Notificacion recibida', noti);
      this.notificacionRecibida(noti);
      
    });

    this.oneSignal.handleNotificationOpened().subscribe(async (noti) => {
      // do something when a notification is opened

      console.log('Notificacion abierta', noti);
     await this.notificacionRecibida(noti.notification);
    });

    this.oneSignal.getIds().then(info => {
      this.userId = info.userId || '' ;
      console.log(info.userId);
      
    });

    this.oneSignal.endInit();
  }

  async notificacionRecibida(noti: OSNotification){

    const payload = noti.payload;

    const existePush = this.mensajes.find(mensaje => mensaje.notificationID ===
      payload.notificationID)

      if(existePush){
        return;
      }

    this.mensajes.unshift(payload);
    this.pushListener.emit(payload);

   await this.guardarMensajes();

  }

  guardarMensajes(){
    this.storage.set('mensajes', this.mensajes);

  }

 async cargarMensajes(){
  //> this.storage.clear();
   this.mensajes = await  this.storage.get('mensajes') || [];

   return this.mensajes;
  }

 async borrarMensajes(){
  await  this.storage.clear();
    this.guardarMensajes();
    this.mensajes = [];
    this.guardarMensajes();
  }

}
