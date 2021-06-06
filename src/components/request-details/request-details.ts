import { Platform } from 'ionic-angular';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'request-details',
  templateUrl: 'request-details.html'
})
export class RequestDetailsComponent {

  dir:boolean
  RequestType:any
  request_status:any
  @Input('RequestData') RequestData:any
  rate:any
  constructor(private plt:Platform) {
    console.log('Hello RequestDetailsComponent Component');
    this.dir=this.plt.isRTL
  }

  refuseReceivedRequest(){

  }

  acceptReceivedRequest(){

  }

  ngOnChanges(){
    console.log('request details '+JSON.stringify(this.RequestData))
  }

  filePreview(){

  }

  CancelRequest(){

  }
  TranslatorContact(){

  }


}
