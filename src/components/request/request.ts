import { Platform, NavController } from 'ionic-angular';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'request',
  templateUrl: 'request.html'
})
export class RequestComponent {
  dir: boolean

  @Input('requestDetails') requestDetails: any
  @Input('requestType') requestType: any
  @Input('userType') userType: any

  @Output() details = new EventEmitter();


  constructor(private plt: Platform, private navCtrl: NavController, public translate: TranslateService,) {
    console.log('Hello RequestComponent Component');
    this.dir = this.plt.isRTL
  }

  ngAfterViewInit() {
    console.log(JSON.stringify(this.requestDetails))
    console.log('request type is ' + this.requestType)
    console.log('userType is ' + this.userType)
  }


  showDetails(requetsDetails, requestType, userType) {
    if (userType == 'client') {
      this.navCtrl.push('ClientOrderDetailsPage',
        {
          'request_id': requetsDetails.Request_ID,
          'request_type': requestType
        })
    } else if (userType == "admin") {

      this.navCtrl.push('AdminOrderDetailsPage',
      {
        'Request_ID':requetsDetails.Request_ID,
        'Request_type':this.translate.instant(requestType)
      })
    }
  }
}
