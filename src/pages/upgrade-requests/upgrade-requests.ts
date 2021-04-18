import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform,  ViewController, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { FileTransfer,  FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import * as moment from 'moment';
import { AdminProvider } from '../../providers/admin/admin';
import { ClientProvider } from '../../providers/client/client';
import { TestformsProvider } from '../../providers/testforms/testforms';
import { ControlpanelProvider } from '../../providers/controlpanel/controlpanel';
import { UpgradeRequestsProvider } from '../../providers/upgrade-requests/upgrade-requests';
import { isThisTypeNode } from 'typescript';

@IonicPage()
@Component({
  selector: 'page-upgrade-requests',
  templateUrl: 'upgrade-requests.html',
})
export class UpgradeRequestsPage {
  languages:any[]=[]
  upgradeRequests:any[]=[]
  providerRequests:any[]=[]
  academicReviewerRequests:any[]=[]
  filteredarray:any[]=[]
  dir:boolean
  acceptStatus:boolean
  requestStatus:boolean
  nodata:boolean=false
  waitingAcceptUpgRequests:any[]=[]
  language:number=1
  constructor(public navCtrl: NavController, public navParams: NavParams,public admin:AdminProvider,private panel:ControlpanelProvider,
              public viewCtrl:ViewController,public translate: TranslateService,public toastCtrl:ToastController,private UpgReqService:UpgradeRequestsProvider,
              private androidPermissions: AndroidPermissions,private transfer: FileTransfer,public user:ClientProvider,
              private file: File,public platform:Platform,private testforms:TestformsProvider,private loadingCtrl:LoadingController,
              private upgradeService:UpgradeRequestsProvider) {
               
                this.dir=this.platform.isRTL

                  this.UpgReqService.GetAllRequestsToAdminWaitingForAccept().subscribe(
                    (res:any)=>{
                        if(typeof(res)=='string'){

                        }else{
                            this.waitingAcceptUpgRequests=res
                            console.log(JSON.stringify(res))
                        }
                    },(err:any)=>{

                    })

                  this.upgradeService.GetAllUpgradeRequests().subscribe(
                    (res:any)=>{
                      if(res=="لا توجد طلبات متاحة فى هذا التوقيت"){
                        this.nodata=true
                    }else{
                    this.upgradeRequests=res

                      // this.upgradeRequests.forEach(elem=>{
                      //   elem.Request_ID=''
                      // })
                      
                   //   console.log('befor  merge :'+JSON.stringify(this.upgradeRequests));
                
                      // this.admin.ShowAllRequestsForAdmin().subscribe(
                      //   (AllRequests :any)=>{
                      //    console.log("all requests :"+JSON.stringify(AllRequests))
                      //     if(!( AllRequests =="لا توجد طلبات متاحة فى هذا التوقيت" )){
                      //       if(typeof( AllRequests )=='string'){
                             
                      //       }else{
                      //         this.upgradeRequests=res

                      //         // for(let i=0;i<this.upgradeRequests.length;i++){
                      //         //     for(let j=0;j<AllRequests.length;j++){
                      //         //       if(AllRequests[j].FK_User_ID ==this.upgradeRequests[i].FK_User_ID  ){
                      //         //        console.log(this.upgradeRequests[i].Request_ID  )
                      //         //         this.upgradeRequests[i].Request_ID=AllRequests[j].Request_ID
                      //         //       }
                      //         //     }
                      //         // }
                      //       }
                      //     }
                      // })
                    //  console.log('after merge :'+JSON.stringify(this.upgradeRequests))
//--------------------------------------------   الجزء دة علشان مش اكرر نفس اليورز لو كان ليه اكتر من لغه
          // var obj = {};

          //   for ( var i=0; i < this.upgradeRequests.length; i++ )
          //       obj[this.upgradeRequests[i]['FK_User_ID']] = this.upgradeRequests[i];

          //       this.upgradeRequests= new Array();
          //   for ( var key in obj )
          //   this.upgradeRequests.push(obj[key]);
          //   console.log(JSON.stringify(this.upgradeRequests))
//-----------------------------------------------------------------------------

}

// هنا تصنيف حسب ترقيات المترجمين وترقيات المراجعين الاكاديمين
         
          // this.upgradeRequests.forEach(elem=>{
          //   if(elem.User_Type_New==3){
          //   this.providerRequests.push(elem)
          //   }
          // })

          // this.upgradeRequests.forEach(elem=>{
          //   if(elem.User_Type_New==5){
          //   this.academicReviewerRequests.push(elem)
          //   }
          // })

           /*  this.upgradeRequests.forEach(elem=>{
            
            this.providerRequests.push(elem)
          
          }) */

      },(err:any)=>{ })

      console.log('all requests  :  '+JSON.stringify(this.providerRequests))
      let loading=this.loadingCtrl.create({
        spinner: 'Show ios',
      })
      loading.present()
      this.panel.GetLanguages().subscribe((res:any)=>{
        loading.dismiss()
        this.languages=res
      },(err:any)=>{
        loading.dismiss()
      })

     

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpgradeRequestsPage');
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  requestDetails(FK_User_ID,CV,user_name){
    console.log("user :"+FK_User_ID)
    console.log( "cv is :"+ CV)

   this.navCtrl.push('UpgradeRequestDetailsPage',
         {
           'FK_User_ID':FK_User_ID,
           'cv':CV,
           'name':user_name,
           //'RequestID':
        }
         )
  }

  // admin accept this request
  changeStatus(ReqID,status){
    this.UpgReqService.AdminAcceptUpgradeRequests(ReqID,moment(new Date()).format('llll'),true).subscribe(
      (res:any)=>{
        const toast = this.toastCtrl.create({
          message: res,
          duration: 3000
          });
          toast.present();
          toast.onDidDismiss(()=>{
            this.upgradeService.GetAllUpgradeRequests().subscribe(
              (res:any)=>{
                if(res=="لا توجد طلبات متاحة فى هذا التوقيت"){
                   this.nodata=true
                }else{
                  this.nodata=false
                  this.upgradeRequests=res

                  for(let i=0;i<this.upgradeRequests.length;i++){
                    this.upgradeRequests[i].username=""
                    this.upgradeRequests[i].status=false
                  }

                  for(let i=0;i<this.upgradeRequests.length;i++){
                    if( this.upgradeRequests[i].User_Type_Old==1){
                      this.upgradeRequests[i].status=false
                    }else{
                      this.upgradeRequests[i].status=true
                    }
                    this.upgradeRequests[i].CV=this.upgradeRequests[i].CV.substr(8)
                  }

                  // get all users and replace user id in request by his name
                  for(let i=0;i<this.upgradeRequests.length;i++){
                    this.user.GetUserDataByUserID(this.upgradeRequests[i].FK_User_ID).subscribe(
                      (res:any[])=>{
                        this.upgradeRequests[i].username=res[0].User_Full_Name
                      },(err:any)=>{
                      }
                    )
                  }

                }


            },(err:any)=>{ })
          })
      },(err:any)=>{

      }
    )
  }


  downloadFile(CV){
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
    .then(status => {
      if(status.hasPermission) {
        const fileTransfer:FileTransferObject=this.transfer.create()
        let path=this.file.externalRootDirectory +'Download/' + CV
        const url1 = encodeURI('http://kfal.careofme.net'+CV)
        fileTransfer.download(url1,path ).then((entry) => {
          console.log('download complete: ' + path);
          const toast = this.toastCtrl.create({
          message: 'downloaded successfully',
          duration: 3000
          });
          toast.present();

        }, (error) => {
        });

      }
    });
  }

  doRefresh(refresher){

   
    this.dir=this.platform.isRTL

    this.UpgReqService.GetAllRequestsToAdminWaitingForAccept().subscribe(
      (res:any)=>{
          if(typeof(res)=='string'){
            refresher.complete();
          }else{
              this.waitingAcceptUpgRequests=res
              console.log(JSON.stringify(res))
              refresher.complete();
          }
      },(err:any)=>{

      })

    this.upgradeService.GetAllUpgradeRequests().subscribe(
      (res:any)=>{
        if(res=="لا توجد طلبات متاحة فى هذا التوقيت"){
          this.nodata=true
          refresher.complete();
      }else{
        refresher.complete();
        this.admin.ShowAllRequestsForAdmin().subscribe(
          (AllRequests :any)=>{
           console.log("all requests :"+JSON.stringify(AllRequests))
            if(!( AllRequests =="لا توجد طلبات متاحة فى هذا التوقيت" )){
              if(typeof( AllRequests )=='string'){      
                refresher.complete(); 
              }else{
                this.upgradeRequests=res       
                refresher.complete();
              }
            }
        })

}



},(err:any)=>{ })

console.log('all requests  :  '+JSON.stringify(this.providerRequests))

this.panel.GetLanguages().subscribe((res:any)=>{
  refresher.complete();
this.languages=res
},(err:any)=>{
  refresher.complete();
})



    //-----------------------------------------------old code --
    // this.dir=this.platform.isRTL

    // this.UpgReqService.GetAllRequestsToAdminWaitingForAccept().subscribe(
    //   (res:any)=>{
    //     refresher.complete();
    //        if(typeof(res)=='string'){

    //        }else{
    //           this.waitingAcceptUpgRequests=res
    //           console.log(JSON.stringify(res))
    //        }
    //   },(err:any)=>{
    //     refresher.complete();
    //   }
    // )

    // this.upgradeService.GetAllUpgradeRequests().subscribe(
    //   (res:any)=>{

    //     if(res=="لا توجد طلبات متاحة فى هذا التوقيت"){
    //       this.nodata=true
    //    }else{
    //     this.upgradeRequests=res.Requests
    //     for(let i=0;i<this.upgradeRequests.length;i++){
    //       this.upgradeRequests[i].username=""
    //       this.upgradeRequests[i].status=false
    //     }

    //     for(let i=0;i<this.upgradeRequests.length;i++){
    //       this.upgradeRequests[i].CV=this.upgradeRequests[i].CV.substr(8)
    //     }

    //     }
    //        refresher.complete();
    // },(err:any)=>{

    //   refresher.complete();

    //  })
  }

  UpgradeRequestDetails(UpgReq_ID,FK_User_ID,CV,lang){
    console.log( 'request details  :  '+UpgReq_ID,FK_User_ID,CV,lang)
    console.log('language is  : '+this.language)
    if(this.language==undefined){
      this.navCtrl.push('UpgradeRequestDetailsPage',
      {
        'UpgReq_ID':UpgReq_ID,
        'FK_User_ID':FK_User_ID,
        'CV':CV,
        'Language':lang
     })
    }else{
      this.navCtrl.push('UpgradeRequestDetailsPage',
      {
        'UpgReq_ID':UpgReq_ID,
        'FK_User_ID':FK_User_ID,
        'CV':CV,
        'Language':this.language
     })
    }
   
  }

  chooseLanguage(){
     console.log(this.language)
     this.UpgReqService.GetUpgradeRequestsByLangID(this.language).subscribe(
       (res:any)=>{
         console.log(JSON.stringify(res))
         this.upgradeRequests=res
       },(err:any)=>{
        console.log(JSON.stringify(err))
       }
     )
  }

}
