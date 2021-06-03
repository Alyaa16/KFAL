import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-hometype',
  templateUrl: 'hometype.html',
})
export class HometypePage {
  RequestType:any=0
  dir:boolean
  beforePulling:boolean=true
  constructor(public navCtrl: NavController,public menuCtrl:MenuController,private storage:Storage,
              public navParams: NavParams,public plt:Platform) {
                this.dir=this.plt.isRTL
                this.menuCtrl.enable(true)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HometypePage');
  }

  toggleMenu(){
    // if(this.dir){
    //   this.menuCtrl.toggle('right')
    // }else
    // {
    //   this.menuCtrl.toggle('left')
    // }
    this.menuCtrl.toggle()
  }

 
  openPage(page) {
    this.navCtrl.push(page)
  }

  Home(){
    this.storage.get("Trans_user_type").then((val:any)=>{
      console.log("current user  :"+val)
      if(val==1){ // this user is client
        this.storage.get('Trans_upgrade').then((res:any)=>{
          if(res){
            this.navCtrl.push('MainPage')
          }else{
            this.navCtrl.push('HometypePage')
          }
        })
      }else{
        this.navCtrl.push('MainPage')   // this user is provider: translator or reviewer or admin
      }
    })
  }

  Orders(){
    this.storage.get("Trans_user_type").then((val:any)=>{
      console.log("current user  :"+val)
      if(val==1){
        this.navCtrl.push('ClientOrdersPage')  // this user is client
      }else{
        if(val==3){
          this.navCtrl.push('TranslatorHomePage',{'type':'translator'})   // this user is provider: translator or reviewer or admin
        }
        if(val==4){
          this.navCtrl.push('TranslatorHomePage',{'type':'Proofreader'})   // this user is provider: translator or reviewer or admin
        }
        if(val==2){
          this.navCtrl.push('AdminOrdersDashboardPage')   // this user is  admin
        }
      }
    })
  }
 
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.complete();
      this.beforePulling=!this.beforePulling
    }, 100);
  }
}
