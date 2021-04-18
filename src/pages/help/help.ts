import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
dir:boolean
admin:boolean
  constructor(public viewCtrl:ViewController, private translate: TranslateService,
              public navCtrl: NavController, public navParams: NavParams,
              public platform:Platform,private storage: Storage) {
                this.dir=this.platform.isRTL

                this.storage.get("Trans_user_type").then((val:any)=>{
                  if(val==2){
                    this.admin=true
                  }else{
                    this.admin=false
                  }
                })
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  openPage(page){
    this.navCtrl.push(page)
  }

}
