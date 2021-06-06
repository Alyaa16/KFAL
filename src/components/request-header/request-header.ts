import { Platform, ViewController, NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'request-header',
  templateUrl: 'request-header.html'
})
export class RequestHeaderComponent {

  dir:boolean
  @Input('langFrom') langFrom:String 
  @Input('langTo') langTo:String
  @Input('RequestCode') RequestCode:number
  @Input('request_status') request_status:number
  @Input('RequestID') RequestID:number
  @Input('RequestData') RequestData:any
  @Input('UserType') UserType:any
  @Input('UserName') UserName:any
  constructor(private plt:Platform,private viewCtrl:ViewController,private navCtrl:NavController) {
    console.log('Hello RequestHeaderComponent Component');
  
    this.dir=this.plt.isRTL;
    console.log('lang from is '+this.langFrom)
    console.log('lang to is '+this.langTo)
  }

  ngAfterViewInit() {
    console.log('lang from is '+this.langFrom)
    console.log('lang to is '+this.langTo)
  }

  ngOnChanges(){
    console.log('ngOnChanges lang from is '+this.langFrom)
    console.log('ngOnChanges lang to is '+this.langTo)
    console.log('ngOnChanges RequestCodeis '+this.RequestCode)
    console.log('ngOnChanges request_status '+this.request_status)
    console.log('ngOnChanges request id '+this.RequestID)
    console.log('ngOnChanges request data' +JSON.stringify( this.RequestData))
  }
  dismiss(){
    this.viewCtrl.dismiss()
  }

  edit(){
    // call api to edit this request as soon as it is new
    this.navCtrl.push('ClientOrderEditPage',
        {
          'request_id': this.RequestData.Request_ID
        }
    )
  }

  chooseAccount($event){

  }

  open_client_profile(){

  }

}
