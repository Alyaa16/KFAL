import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-hometype',
  templateUrl: 'hometype.html',
})
export class HometypePage {
  RequestType:any=0
  dir:boolean
  constructor(public navCtrl: NavController,public menuCtrl:MenuController,
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

  makeRequest(){
    this.navCtrl.push('HomePage',
       {'type':this.RequestType}
    )
  }

  chooseRequestType(type){
   this.RequestType=type
  }

}
