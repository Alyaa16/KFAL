import { Platform, ViewController, NavController } from 'ionic-angular';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'request-header',
  templateUrl: 'request-header.html'
})
export class RequestHeaderComponent {

  dir:boolean
  @Input('langFrom') langFrom:String 
  @Input('langTo') langTo:String
  @Input('RequestData') RequestData:any
  @Input('UserType') UserType:any
  @Input('UserName') UserName:any
  @Output() EditRequest = new EventEmitter()

   constructor(private plt:Platform,private viewCtrl:ViewController,private navCtrl:NavController) {
    console.log('Hello RequestHeaderComponent Component');
  
    this.dir=this.plt.isRTL;
    console.log('lang from is '+this.langFrom)
    console.log('lang to is '+this.langTo)
  }


  ngOnChanges(){
    console.log('ngOnChanges lang from is '+this.langFrom)
    console.log('ngOnChanges lang to is '+this.langTo)
    console.log('ngOnChanges request data' +JSON.stringify( this.RequestData))
  }

  ngAfterViewInit() {
    console.log('lang from is '+this.langFrom)
    console.log('lang to is '+this.langTo)
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  edit(){
   console.log('event emitter emit from child')
    this.EditRequest.emit()
  }

  chooseAccount($event){

  }

  open_client_profile(){

  }

}
