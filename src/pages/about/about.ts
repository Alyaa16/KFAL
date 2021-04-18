import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AdminProvider } from '../../providers/admin/admin';
import { GeneralProvider } from '../../providers/general/general';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
 about:string=""
 dir:boolean
 isediting:boolean=false
 isadmin:boolean=false
  constructor(public viewCtrl:ViewController, public navCtrl: NavController,public platform:Platform,public general:GeneralProvider,
              public navParams: NavParams,public admin:AdminProvider,private storage: Storage) {
                this.dir=this.platform.isRTL
                this.general.GetInformation().subscribe(
                  (res:any)=>{
                        this.about=res[0]._AbouUs
                  },(err:any)=>{
                  }
                )

                this.storage.get('isadmin').then(val=>{
                  if(val==true){
                    this.isadmin=true
                  }else{
                   this.isadmin=false
                  }
              })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  edit(){
    this.isediting=true
  }

  update(){
    this.isediting=false
    this.admin.UpdateInformation(null,null,this.about).subscribe(
      (res:any)=>{

      },(err:any)=>{

      }
    )
  }


}
