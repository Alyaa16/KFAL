import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform, MenuController, LoadingController, Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { HelperProvider } from '../../providers/helper/helper';
import { ClientProvider } from '../../providers/client/client';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  dir:string="";
  Isadmin:boolean=false
  direction:boolean=false
  constructor(public toastCtrl: ToastController,public events:Events,
    public user:ClientProvider,public navParams:NavParams,
     private storage: Storage,public platform:Platform,public helper:HelperProvider,public menuCtrl:MenuController,
     public translate :TranslateService,public navCtrl: NavController,public loadingCtrl:LoadingController) {
     this.menuCtrl.enable(true)
     this.direction=this.platform.isRTL
     console.log("constructor direction   :"+this.direction)
        this.Isadmin= this.helper.isadmin
        console.log(this.helper.isadmin)

        this.storage.get('isadmin').then(val=>{
            if(val==true){
              this.Isadmin=true
            }else{
             this.Isadmin=false
            }
        })
        this.events.subscribe('language', (val)=>{
          console.log( "language    :"+ val)
          console.log(this.platform.isRTL)
                if(val=='ar'){
                  this.direction=true
                }else{
                  this.direction=false
                }
        })
  }

  toggleMenu(){
    this.menuCtrl.toggle()
 }

  ionViewDidLoad() {
    this.direction=this.platform.isRTL
    console.log(" ionViewDidLoad direction   :"+this.direction)
    console.log('ionViewDidLoad MainPage');
  }

  client(){
    this.storage.set('Trans_user_type',1)
    this.navCtrl.setRoot('HometypePage')
  }


  provider(type,usertype){
     this.storage.get('Trans_user_id').then(val=>{
     if(val){
      let loading= this.loadingCtrl.create({})
       loading.present()
      this.user.UpgradeUserWithoutLang(val,null,null,usertype).subscribe(
        (res:any)=>{
          loading.dismiss()
        this.helper.set_type(usertype)
        this.storage.set('Trans_user_type',usertype)
        console.log(usertype)
        this.navCtrl.push('TranslatorNewOrdersPage',{'type':type,'UserType':usertype})
        },(err:any)=>{
          loading.dismiss()
        })
      }
    })
  }

  admin(type,typeNumber){
   // go admin pages
   this.storage.get('Trans_user_id').then(val=>{
    if(val){
      let loading= this.loadingCtrl.create({})
      loading.present()
      this.user.UpgradeUserWithoutLang(val,null,null,typeNumber).subscribe(
        (res:any)=>{
          loading.dismiss()
            this.helper.set_type(typeNumber)
            this.storage.set('Trans_user_type',typeNumber)
            this.navCtrl.push('AdminHomePage')
          },(err:any)=>{
            loading.dismiss()
          })

    }
   })
  }

}
