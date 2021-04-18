import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController, ViewController, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { AdminProvider } from '../../providers/admin/admin';
@IonicPage()
@Component({
  selector: 'page-admin-orders-dashboard',
  templateUrl: 'admin-orders-dashboard.html',
})
export class AdminOrdersDashboardPage {
  Orders:any[]=[]
  newOrders:any[]=[]
  newOrdersNo:number=0
  currentOrders:any[]=[]
  currentOrdersNo:number=0
  waitReviewOrders:any[]=[]
  inReviewOrders:any[]=[]
  waitReviewOrdersNo:number=0
  apologyOrders:any[]=[]
  apologyOrdersNo:number=0
  backedOrders:any[]=[]
  backedOrdersNo:number=0
  closedOrders:any[]=[]
  closedOrdersNo:number=0
  canceledOrders:any[]=[]
  canceledOrdersNo:number=0
  allorders:any[]=[]
  dir:boolean
  complaints:number=0
  constructor(public menuCtrl:MenuController,public admin:AdminProvider,public loadingCtrl:LoadingController,
              public viewCtrl:ViewController,public translate: TranslateService,public platform :Platform,
              public navCtrl: NavController, public navParams: NavParams) {

                this.menuCtrl.enable(true)

                this.dir=this.platform.isRTL
                  let loading=this.loadingCtrl.create({})
                  loading.present()
                  this.admin.ShowAllRequestsForAdmin().subscribe(
                    (res:any)=>{
                      loading.dismiss()
                      this.allorders=[]
                      if(typeof(res)!='string'){

                        for(let i=0;i< res.length;i++)
                        {
                          if(res[i].Request_Date!=null){
                            res[i].Request_Date= moment(res[i].Request_Date).format('L');
                          }else{
                            res[i].Request_Date=null
                          }
                        }

                        this.allorders=res

                        if(!(res=="لا توجد طلبات متاحة فى هذا التوقيت" )){
                          if(typeof(res)=='string'){
                            this.newOrders=[]
                          }else{
                            this.newOrders=[]
                            res.forEach(elem=>{if(elem.FK_Request_Status_ID==1 || elem.FK_Request_Status_ID==3){ this.newOrders.push(elem)} })

                            this.currentOrders=[]
                            res.forEach(elem=>{if(elem.FK_Request_Status_ID==5){this.currentOrders.push(elem)} })

                            this.waitReviewOrders=[]
                            res.forEach(elem=>{if( elem.FK_Request_Status_ID==6 ){this.waitReviewOrders.push(elem)}})

                            this.inReviewOrders=[]
                            res.forEach(elem=>{if( elem.FK_Request_Status_ID==7 ){this.inReviewOrders.push(elem)}})

                            this.apologyOrders=[]
                            res.forEach(elem=>{if(elem.FK_Request_Status_ID==11 ){this.apologyOrders.push(elem) } })

                            this. backedOrders=[]
                            res.forEach(elem=>{if(elem.FK_Request_Status_ID==9 || elem.FK_Request_Status_ID==12){this. backedOrders.push(elem)}})

                            this.closedOrders=[]
                            res.forEach(elem=>{ if(elem.FK_Request_Status_ID==13){this.closedOrders.push(elem)}})

                            this.canceledOrders=[]
                            res.forEach(elem=>{ if(elem.FK_Request_Status_ID==4){this.canceledOrders.push(elem) }})
                          }
                        }

                      }
                      else{
                          this.allorders=[]
                      }


          },(err:any)=>{
            loading.dismiss()
          })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminOrdersDashboardPage');
  }

  orders(ordersType,ordersList){
    console.log(ordersType)
    this.navCtrl.push('AdminOrdersPage',{'type':ordersType,'orders':ordersList})
  }


  toggleMenu(){
    this.menuCtrl.toggle()
 }

 dismiss(){
   console.log("back")
   this.viewCtrl.dismiss()
 }

}