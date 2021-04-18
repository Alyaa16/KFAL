import { Component, ViewChild, ElementRef } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController, MenuController, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AdminProvider } from "../../providers/admin/admin";
import { GeneralProvider } from "../../providers/general/general";
import { TestformsProvider } from "../../providers/testforms/testforms";
import { UpgradeRequestsProvider } from "../../providers/upgrade-requests/upgrade-requests";

@IonicPage()
@Component({
  selector: 'page-admin-home',
  templateUrl: 'admin-home.html',
})
export class AdminHomePage {
  rooms = [];
  testformNo:number=0
  dir:boolean
  allOrders:any[]=[]
  allUsers:any[]=[]
  upgradeRequests:any[]=[]
  complaints:number=0
  upgraderequests:number=0
  notificationNo:number=0
  upgradeRequestsNo:number=0
  newaccountsRequests:number=0
  newusers:any[]=[]
  Translators:any[]=[]
  Reviewers:any[]=[]

  constructor(public menuCtrl:MenuController, public loadingCtrl:LoadingController,public general:GeneralProvider,private test:TestformsProvider,
     public translate: TranslateService,public platform :Platform,public admin:AdminProvider,private testform:TestformsProvider,
      public navCtrl: NavController, public navParams: NavParams,private testforms:TestformsProvider,private upgradeService:UpgradeRequestsProvider) {

          this.menuCtrl.enable(true)
          this.dir=this.platform.isRTL
          
          //get top 15 translators
            this.admin.EvaluationSelect('T',true).subscribe(
              (res:any)=>{
                if(!(res=="لا توجد تقيمات متاحة فى هذا التوقيت" )){
                  if(typeof(res)=='string'){
                    this.Translators=[]
                  }else{
                    this.Translators=res
                  }
                }
                  // FK_Ttranslator_ID  User_Full_Name  rating
              },(err:any)=>{

              }
            )

          // //get top 15 reviewers
          this.admin.EvaluationSelect('R',true).subscribe(
            (res:any)=>{
              if(!(res=="لا توجد تقيمات متاحة فى هذا التوقيت" )){
                if(typeof(res)=='string'){
                  this.Reviewers=[]
                }else{
                  this.Reviewers=res
                }
              }
            },(err:any)=>{

            })

          this.admin.GetUserData().subscribe(
            (res:any)=>{
                this.allUsers=res
              console.log(this.allUsers.length)
            },(err:any)=>{
            }
          )

          let loading=this.loadingCtrl.create({'content':this.translate.instant('please wait ...')})
          loading.present()
          this.admin.ShowAllRequestsForAdmin().subscribe(
            (res:any)=>{
              loading.dismiss()
              if(!(res=="لا توجد طلبات متاحة فى هذا التوقيت" )){
                if(typeof(res)=='string'){
                  this.allOrders=[]
                }else{
                   this.allOrders=res
                }
              }
          })

         // Get compliants
          this.admin. GetAllCompalinsForAdmin().subscribe(
            (res:any)=>{
              console.log(res)
              if(typeof(res)!='string'){
                this.complaints=res.length
              }else{
                this.complaints=0
              }
          },(err:any)=>{ })

         // Get UpgradeRequests
          this.upgradeService.GetAllUpgradeRequests().subscribe(
            (res:any)=>{
              if(res=="لا توجد طلبات متاحة فى هذا التوقيت"){
                this.upgradeRequestsNo=0
             }else{
               console.log(res.length)
               this.upgradeRequests=res
              //  let obj={}
              //  for ( var i=0; i < this.upgradeRequests.length; i++ )
              //       obj[this.upgradeRequests[i]['FK_User_ID']] = this.upgradeRequests[i];

              //       this.upgradeRequests= new Array();
              //   for ( var key in obj )
              //   this.upgradeRequests.push(obj[key]);

              this.upgradeRequestsNo=this.upgradeRequests.length
             }
          },(err:any)=>{ })

  }

  showT(status){
      //get top 15 translators
      this.admin.EvaluationSelect('T',status).subscribe(
        (res:any)=>{
            this.Translators=res
            // FK_Ttranslator_ID  User_Full_Name  rating
        },(err:any)=>{

        }
      )
  }

  showR(status){
    //get top 15 translators
    this.admin.EvaluationSelect('R',status).subscribe(
      (res:any)=>{
          this.Reviewers=res
          // FK_Ttranslator_ID  User_Full_Name  rating
      },(err:any)=>{

      }
    )
}

joinRoom(key){
  console.log(key)
}

showProviderProfile(id){
  this.navCtrl.push('ClientProfilePage',{'user_id':id})
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminHomePage');
    this.dir=this.platform.isRTL
    this.admin.ShowAllRequestsForAdmin().subscribe(
      (res:any)=>{
        if(!(res=="لا توجد طلبات متاحة فى هذا التوقيت" )){
          if(typeof(res)=='string'){
            this.allOrders=[]
          }else{
            this.allOrders=res
          }
        }
    })
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter AdminHomePage');
    this.admin.EvaluationSelect('T',true).subscribe(
      (res:any)=>{
        if(!(res=="لا توجد تقيمات متاحة فى هذا التوقيت" )){
          if(typeof(res)=='string'){
            this.Translators=[]
          }else{
            this.Translators=res
          }
        }
          // FK_Ttranslator_ID  User_Full_Name  rating
      },(err:any)=>{

      }
    )

  // //get top 15 reviewers
  this.admin.EvaluationSelect('R',true).subscribe(
    (res:any)=>{
      if(!(res=="لا توجد تقيمات متاحة فى هذا التوقيت" )){
        if(typeof(res)=='string'){
          this.Reviewers=[]
        }else{
          this.Reviewers=res
        }
      }
    },(err:any)=>{

    })

  this.admin.GetUserData().subscribe(
    (res:any)=>{
        this.allUsers=res
      console.log(this.allUsers.length)
    },(err:any)=>{
    }
  )


  this.admin.ShowAllRequestsForAdmin().subscribe(
    (res:any)=>{

      if(!(res=="لا توجد طلبات متاحة فى هذا التوقيت" )){
        if(typeof(res)=='string'){
          this.allOrders=[]
        }else{
           this.allOrders=res
        }
      }
  })

 // Get compliants
  this.admin. GetAllCompalinsForAdmin().subscribe(
    (res:any)=>{
      if(typeof(res)!='string'){
        this.complaints=res.length
      }else{
        this.complaints=0
      }

  },(err:any)=>{ })


  }

  orders(ordersType,ordersList){
    console.log(ordersType)
    this.navCtrl.push('AdminOrdersPage',{'type':ordersType,'orders':ordersList})
  }


  gettestforms(){

  }


  doRefresh(refresher){    
          //get top 15 translators
          this.admin.EvaluationSelect('T',true).subscribe(
            (res:any)=>{
              if(!(res=="لا توجد تقيمات متاحة فى هذا التوقيت" )){
                if(typeof(res)=='string'){
                  this.Translators=[]
                }else{
                  this.Translators=res
                }
              }
              refresher.complete();
                // FK_Ttranslator_ID  User_Full_Name  rating
            },(err:any)=>{
              refresher.complete();
            }
          )

        // //get top 15 reviewers
        this.admin.EvaluationSelect('R',true).subscribe(
          (res:any)=>{
            refresher.complete();
            if(!(res=="لا توجد تقيمات متاحة فى هذا التوقيت" )){
              if(typeof(res)=='string'){
                this.Reviewers=[]
              }else{
                this.Reviewers=res
              }
            }
          },(err:any)=>{
            refresher.complete();
          })

        this.admin.GetUserData().subscribe(
          (res:any)=>{
              this.allUsers=res
              refresher.complete();
            console.log(this.allUsers.length)
          },(err:any)=>{
            refresher.complete();
          }
        )

       
        this.admin.ShowAllRequestsForAdmin().subscribe(
          (res:any)=>{
            refresher.complete();
            if(!(res=="لا توجد طلبات متاحة فى هذا التوقيت" )){
              if(typeof(res)=='string'){
                this.allOrders=[]
              }else{
                 this.allOrders=res
              }
            }
        })

       // Get compliants
        this.admin. GetAllCompalinsForAdmin().subscribe(
          (res:any)=>{
            refresher.complete();
            console.log(res)
            if(typeof(res)!='string'){
              this.complaints=res.length
            }else{
              this.complaints=0
            }
        },(err:any)=>{  refresher.complete();})

       // Get UpgradeRequests
        this.upgradeService.GetAllUpgradeRequests().subscribe(
          (res:any)=>{
            if(res=="لا توجد طلبات متاحة فى هذا التوقيت"){
              this.upgradeRequestsNo=0
              refresher.complete();
           }else{
             console.log(res.length)
             refresher.complete();
             this.upgradeRequests=res
           
            this.upgradeRequestsNo=this.upgradeRequests.length
           }
        },(err:any)=>{ })
      //     //get top 15 translators
      //     this.admin.EvaluationSelect('T',true).subscribe(
      //       (res:any)=>{
      //         if(!(res=="لا توجد تقيمات متاحة فى هذا التوقيت" )){
      //           if(typeof(res)=='string'){
      //             this.Translators=[]
      //           }else{
      //             this.Translators=res
      //           }
      //         }
      //         refresher.complete();
      //           // FK_Ttranslator_ID  User_Full_Name  rating
      //       },(err:any)=>{
      //         refresher.complete();
      //       }
      //     )

      //   // //get top 15 reviewers
      //   this.admin.EvaluationSelect('R',true).subscribe(
      //     (res:any)=>{
      //       if(!(res=="لا توجد تقيمات متاحة فى هذا التوقيت" )){
      //         if(typeof(res)=='string'){
      //           this.Reviewers=[]
      //         }else{
      //           this.Reviewers=res
      //         }
      //         refresher.complete();
      //       }
      //     },(err:any)=>{
      //       refresher.complete();
      //     })

      //   this.admin.GetUserData().subscribe(
      //     (res:any)=>{
      //         this.allUsers=res
      //       console.log(this.allUsers.length)
      //       refresher.complete();
      //     },(err:any)=>{
      //       refresher.complete();
      //     }
      //   )


      //   this.admin.ShowAllRequestsForAdmin().subscribe(
      //     (res:any)=>{
      //       refresher.complete();
      //       if(!(res=="لا توجد طلبات متاحة فى هذا التوقيت" )){
      //         if(typeof(res)=='string'){
      //           this.allOrders=[]
      //         }else{
      //            this.allOrders=res
      //         }
      //       }
      //   })

      //  // Get compliants
      //   this.admin. GetAllCompalinsForAdmin().subscribe(
      //     (res:any)=>{
      //       if(typeof(res)!='string'){
      //         this.complaints=res.length
      //       }else{
      //         this.complaints=0
      //       }
      //   },(err:any)=>{ })

      //  // Get UpgradeRequests
      //   this.upgradeService.GetAllUpgradeRequests().subscribe(
      //     (res:any)=>{
      //       if(res=="لا توجد طلبات متاحة فى هذا التوقيت"){
      //         this.upgradeRequestsNo=0
      //      }else{
      //        console.log(res.length)
      //        this.upgradeRequests=res
      //        let obj={}
      //        for ( var i=0; i < this.upgradeRequests.length; i++ )
      //             obj[this.upgradeRequests[i]['FK_User_ID']] = this.upgradeRequests[i];

      //             this.upgradeRequests= new Array();
      //         for ( var key in obj )
      //         this.upgradeRequests.push(obj[key]);

      //       this.upgradeRequestsNo=this.upgradeRequests.length
      //      }
      //      refresher.complete();
      //   },(err:any)=>{
      //     refresher.complete();
      //    })
  }
  OrderDetails(Request_ID,type){
    this.navCtrl.push('AdminOrderDetailsPage',{'Request_ID':Request_ID,'Request_type':type})
  }

  toggleMenu(){
     this.menuCtrl.toggle()
  }

  notifications(){
    this.navCtrl.push('NotificationsPage')
  }

  Complaints(){
    this.navCtrl.push('ComplaintsPage')
  }

  goPage(page){
    this.navCtrl.push(page)
  }

  adminDashboard(){
    this.navCtrl.push('AdminOrdersDashboardPage')
  }

  users(){
    this.navCtrl.push('AllusersPage',{'allusers':this.allUsers})
  }

  usersupgradeRequests(){
    this.navCtrl.push('UpgradeRequestsPage')
  }

  newaccounts(){
     this.navCtrl.push('NewusersRequestsPage',{'data':this.upgradeRequests})
  }



  testformspage(){
    this.navCtrl.push('AddTestFormPage')

  }

  controlpanelpage(){
    this.navCtrl.push('ControlPanelPage')
  }

/*   addRoom() {
    let newData = this.ref.push();
    newData.set({
      roomname:'ooooooooo'
    });
    this.navCtrl.pop();
  } */

}
export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};
