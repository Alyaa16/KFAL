import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the MainpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mainpage',
  templateUrl: 'mainpage.html',
})
export class MainpagePage {
  RequestType:any=0
  dir:boolean
  beforePulling:boolean=true
  constructor(public navCtrl: NavController,public menuCtrl:MenuController,
              public navParams: NavParams,public plt:Platform) {
                this.dir=this.plt.isRTL
                this.menuCtrl.enable(true)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainpagePage');
  }

  chooseRequestType(type){
    this.RequestType=type
  } 


makeRequest(){
    this.navCtrl.push('HomePage',
       {'type':this.RequestType}
    )
  }
}