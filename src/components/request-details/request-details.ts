import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Platform, ViewController } from 'ionic-angular';

@Component({
  selector: 'request-details',
  templateUrl: 'request-details.html'
})
export class RequestDetailsComponent {
  dir: boolean;
  RequestType:any
  status:any
  rate:3
  @Input('request_status') request_status:number
  @Input('requestDetails') requestDetails:any;
  details:any={}

  constructor(private plt: Platform,  public translate: TranslateService,private viewCtrl:ViewController) {
    console.log('Hello RequestDetailsComponent Component');
    this.dir = this.plt.isRTL
    console.log(this.request_status)
    console.log(this.requestDetails)
  }

  ngAfterViewInit() {

    console.log( 'all request details admin order '+JSON.stringify(this.requestDetails))
    
   }
  acceptReceivedRequest(){

  }
  refuseReceivedRequest(){

  }
  filePreview(){

  }
  CancelRequest(){

  }
  TranslatorContact(){

  }

 
  dismiss(){
    this.viewCtrl.dismiss()
  }
  open_client_profile(){

  }
  chooseAccount($event){

  }
}
