import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertCmp, LoadingController } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/Rx';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class HelperProvider {
  email:any
  currentLang:any
  lang_direction:any
  is_login:boolean=true
  language:any
  token:any
  PlayerID:any
  loading:any
  trans_user_type:any
  notification_status:boolean
  isadmin:boolean=false
  registrationId=""
  device_id=""
  UserTypes:any=[];
  UserTypeCurrentState:any
  private theme: BehaviorSubject<String>;
   // http://192.168.1.160:8899 local
  // link to any file :https://kfal.careofme.net/Images/Artboard%20%E2%80%93%2036.png
  // https://kfal.careofme.net  cloud
  base_url:string="http://192.168.1.160:8899/TranslationAppAPI/"
 
  constructor(public loadingCtrl:LoadingController,public translate: TranslateService,
      public http: HttpClient) {
    this.theme = new BehaviorSubject('dark-theme');
  }

  // get device id from push plugin
  set_registration_id(va){
    console.log( 'helper service   registration id is :'+va);
   this.registrationId=va
  }

  // get device id from firebase plugin
  set_device_id(va){
    console.log('helper service  device id is :'+va);
   this.device_id=va
  }

  set_notification_status(va){
    this.notification_status=va
    console.log( "helper notification_status: "+ this.notification_status)
  }

  set_type(va){
    this.trans_user_type=va
  }

  set_email(va){
    this.email=va
  }

  set_PlayerID(va){
    this.PlayerID=va
  }

  set_token(va){
    this.token=va
  }

  set_is_login(va){
    this.is_login=va
  }

  set_language(va){
    this.currentLang=va
  }

 

  presentLoading(){
    this.loading=this.loadingCtrl.create({})
    this.loading.present()
  }

  dismissLoading(){
    this.loading.dismiss()
  }


  setActiveTheme(val) {
      this.theme.next(val);
  }

  getActiveTheme() {
      return this.theme.asObservable();
  }

  changeLanguage(language){
    this.translate.use(language)
    this.translate.setDefaultLang(language)
  }

  UserIsAdmin(va){
    this.isadmin=va

  }

  SetUserTypes(va){
    this.UserTypes=va;
  }

  SetCurrentActiveUserType(va){
    //current account type id
    console.log('current user type :  '+va);
    this.UserTypeCurrentState=va;
  }
}
