import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, MenuController, Events, ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { HelperProvider } from '../../providers/helper/helper';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { ClientProvider } from '../../providers/client/client';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  myemail:any=''
  mypassword:any=''
  lang:string=''
  myform:FormGroup
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  touchID:boolean
  dir:boolean
  constructor(public menuCtrl: MenuController,public platform:Platform,private push: Push,
    public loadingCtrl:LoadingController,public modalCtrl:ModalController,
              public events: Events,public toastCtrl:ToastController,private faio:FingerprintAIO,
              public user:ClientProvider,public navCtrl: NavController,public alertCtrl:AlertController,
              public formBuilder: FormBuilder,public helper:HelperProvider,private storage: Storage,
              public translate: TranslateService,public navParams: NavParams) {
                 this.dir=this.platform.isRTL
                this.storage.get("Password").then((res:any)=>{
                   if(res!=null){
                     this.mypassword=res
                   }
                })

                this.storage.get("userEmail").then((res:any)=>{
                  if(res!=null){
                    this.myemail=res
                  }
               })

                this.menuCtrl.enable(false)
                this.myform =  this.formBuilder.group({
                  UserEmail: ['', Validators.compose([Validators.required,Validators.email])],
                  Password:['', Validators.compose([Validators.required])]
                });

                this.storage.get('Trans_language').then((val:any)=>{
                  console.log("lang   :"+val)
                  console.log("costr ")
                  if(val!=null){
                    if(val=='ar'){
                      this.helper.changeLanguage('ar')
                      this.platform.setDir('rtl',true)
                      this.helper.set_language('ar')
                      this.lang='ar'
                    }else{
                      this.helper.changeLanguage('en')
                      this.platform.setDir('ltr',true)
                      this.helper.set_language('en')
                      this.lang='en'
                    }
                  }else{
                    this.helper.changeLanguage('en')
                    this.platform.setDir('ltr',true)
                    this.helper.set_language('en')
                    this.lang='en'
                  }
                })

    // kept saved to the second login - know if user asked before for touch id login

      this.storage.get('Trans_login_touch_id').then((val:any)=>{
          if(val!=null){
            this.touchID=val

          }else{
            this.touchID=false
        }
      })

      this.events.subscribe('trans_lang',(res)=>{
         if(res=='ar'){
          this.helper.changeLanguage('ar')
          this.platform.setDir('rtl', true)
          this.lang="ar"
          this.storage.set("Trans_language",'ar')
        }else{
          this.helper.changeLanguage('en')
          this.platform.setDir('ltr', true)
          this.lang="en"
          this.storage.set("Trans_language",'en')
        }
      })

  }

  changeLanguage(){
    let languageModal = this.modalCtrl.create('ChooseLanguagePage',{'name':this.translate.instant("app language choose")});
    languageModal.present();
    languageModal.onDidDismiss((chosenLanguage:any)=>{
      this.lang=chosenLanguage.data
      console.log(this.lang)
      if(chosenLanguage.data==1){
        this.helper.changeLanguage('ar')
        this.platform.setDir('rtl', true)
        this.storage.set("Trans_language",'ar')
      }else{
        this.helper.changeLanguage('en')
        this.platform.setDir('ltr', true)
        this.storage.set("Trans_language",'en')
      }
    })
  }

  ionViewDidLoad()
  {
    console.log("did load")
    this.storage.get('Trans_language').then((val:any)=>{
      console.log("lang   :"+val)
      if(val!=null){
        if(val=='ar'){
          this.helper.changeLanguage('ar')
          this.platform.setDir('rtl',true)
          this.helper.set_language('ar')
          this.lang='ar'
        }else{
          this.helper.changeLanguage('en')
          this.platform.setDir('ltr',true)
          this.helper.set_language('en')
          this.lang='en'
        }
      }else{
        this.helper.changeLanguage('en')
         this.platform.setDir('ltr',true)
         this.helper.set_language('en')
         this.lang='en'
      }
    })
  }

  ionViewDidEnter() {
    console.log("did enetr")


    this.storage.get('Trans_language').then((val:any)=>{
      console.log("lang   :"+val)
      if(val!=null){
        if(val=='ar'){
          this.helper.changeLanguage('ar')
          this.platform.setDir('rtl',true)
          this.helper.set_language('ar')
          this.lang='ar'
        }else{
          this.helper.changeLanguage('en')
          this.platform.setDir('ltr',true)
          this.helper.set_language('en')
          this.lang='en'
        }
      }else{

          this.helper.changeLanguage('en')
          this.platform.setDir('ltr',true)
          this.helper.set_language('en')
          this.lang='en'
      }
    })
  }

    change(lang){
      console.log("lang0 "+lang)
      if(lang=='en'){
        this.helper.changeLanguage(lang)
        this.platform.setDir('ltr', true)
        this.lang="en"
        this.events.publish('trans_lang','en')
        this.storage.set("Trans_language",'en')
      }else if(lang=='ar'){
        this.helper.changeLanguage(lang)
        this.platform.setDir('rtl', true)
        this.lang="ar"
        this.events.publish('trans_lang','ar')
        this.storage.set("Trans_language",'ar')
      }

    }

    Login(){
      this.platform.ready().then(() => {

        const options: PushOptions = {
          android: {
            'senderID':'992142184038',
            forceShow:true,
            sound: this.helper.notification_status,
            clearNotifications:false
          },
          ios: {
              alert: 'true',
              badge: true,
              sound: 'false'
          }
        };
        const pushObject: PushObject = this.push.init(options);
        pushObject.on('registration').subscribe((registration: any) => {
          console.log('Device registered', JSON.stringify(registration))
          this.helper.set_registration_id(registration.registrationId)
        });

      })
        this.helper.set_email(this.myform.value.UserEmail)
        if(this.myform.valid){
          let loading =this.loadingCtrl.create({})
          loading.present()//registration.registrationId
            this.user.sign_in(this.myform.value,this.helper.registrationId).subscribe(
              (res:any)=>{
                loading.dismiss()
                if(res=="تاكد من البريد او رقم المرور"){
                  const toast = this.toastCtrl.create({
                    message: res,
                    duration: 5000
                  });
                  toast.present();
                }else{
                  //UserDate
                  this.storage.set('Trans_user_id',res.UserData[0].ID)
                  this.storage.set('Password',res.UserData[0].Password)
                  this.storage.set('logined_in',true)
                  this.storage.set('Trans_user_type',res.UserData[0].UserType)
                  this.storage.set('userEmail',res.UserData[0].Email)

                  // ------------------------ check if user is admin
                  if(res.UserData[0].IsAdmin==true){
                    console.log("admin")
                    this.helper.UserIsAdmin(true);
                    this.storage.set('isadmin',true)
                  }else{
                    console.log("not admin")
                    this.helper.UserIsAdmin(false);
                    this.storage.set('isadmin',false)
                  }

                  // ------------------------ check if user account is verified
                  if(res.UserData[0].VerificationStatus){

                  // ------------------------ check if user account is verified
                    if(res.UserData[0].IsBlocked==false ||res.UserData[0].IsBlocked== null){
                      if(res.UserData[0].UserType==1){
                        this.navCtrl.setRoot('HometypePage')
                        this.storage.set('Trans_upgrade',false)
                      }
                      else {
                        this.navCtrl.setRoot('MainPage',{'user_type':res.UserData[0].UserType})
                        console.log("this user has upgraded his account")
                        this.storage.set('Trans_upgrade',true)
                      }
                          // ask for toush id

                          this.storage.get('Trans_login_touch_id').then((val)=>{
                             if(val!=null){
                                 /*  this.storage.set('Trans_login_touch_id',true)
                                  this.faio.show({
                                    clientId: 'kfal',
                                    clientSecret: 'kfal2020', //Only necessary for Android
                                    disableBackup:true,  //Only for Android(optional)
                                    localizedFallbackTitle: 'Use Pin', //Only for iOS
                                    localizedReason: 'Please authenticate' //Only for iOS
                                  })
                                .then((result: any) => {
                                  console.log(JSON.stringify(result))

                                })
                                .catch((error: any) => {
                                  console.log(JSON.stringify(error))
                                }); */
                             }else{

                              this.translate.get("login with touch id").subscribe(
                                value => {
                                this.translate.get("yes").subscribe(
                                    value1 => {
                                      this.translate.get("cancel").subscribe(
                                        value2 => {
                                    const alert = this.alertCtrl.create({
                                      subTitle: value,
                                      buttons: [
                                        {
                                          text:  value2,
                                          role: 'cancel',
                                          handler: () => {
                                            this.storage.set('Trans_login_touch_id',false)
                                          }
                                        },
                                        {
                                          text: value1,
                                          handler: () => {
                                            this.storage.set('Trans_login_touch_id',true)
                                            this.faio.show({
                                              clientId: 'kfal',
                                              clientSecret: 'kfal2020', //Only necessary for Android
                                              disableBackup:true,  //Only for Android(optional)
                                              localizedFallbackTitle: 'Use Pin', //Only for iOS
                                              localizedReason: 'Please authenticate' //Only for iOS
                                          })
                                          .then((result: any) => {
                                            console.log(JSON.stringify(result))
                                            if(res.UserData[0].UserType==1){
                                              this.navCtrl.setRoot('HometypePage')
                                              this.storage.set('Trans_upgrade',false)
                                            }
                                            else {
                                              this.navCtrl.setRoot('MainPage',{'user_type':res.UserData[0].UserType})
                                              console.log("this user has upgraded his account")
                                              this.storage.set('Trans_upgrade',true)
                                            }
                                          })
                                          .catch((error: any) => {
                                            console.log(JSON.stringify(error))
                                          });
                                          }
                                        }
                                      ]
                                    });
                                    alert.present();
                                  })
                                })
                              })
                            }

                           })
                      }else{
                        const toast = this.toastCtrl.create({
                          message:this.translate.instant('account is blocked'),
                          duration: 5000
                        });
                        toast.present();
                      }
                  }
                  else{
                    const toast = this.toastCtrl.create({
                      message: res,
                      duration: 5000
                    });
                    toast.present();
                    toast.onDidDismiss(()=>{
                      this.navCtrl.push('CodeVerificationPage',{'comefrom':'verification','email':this.myform.value.UserEmail})
                    })
                  }

                }
                },(err:any)=>{
                  loading.dismiss()
              }
            )
        }
        else{
          const toast = this.toastCtrl.create({
            message: this.translate.instant("check for all data"),
            duration: 3000
          });
          toast.present();
        }


    }

    loginwithtouchid(){

            this.faio.show({
              clientId: 'kfal',
              clientSecret: 'kfal2020', //Only necessary for Android
              disableBackup:true,  //Only for Android(optional)
              localizedFallbackTitle: 'Use Pin', //Only for iOS
              localizedReason: 'Please authenticate' //Only for iOS
          })
          .then((result: any) => {
            // --------

            let loading =this.loadingCtrl.create({})
            loading.present()
            this.storage.get('userEmail').then((val)=>{
              //this.myform.value.UserEmail=val
              this.storage.get('Password').then((val1)=>{
                //this.myform.value.Password=val

                let data={
                  'UserEmail':val,
                  'Password':val1,
                }
              this.user.sign_in(data,this.helper.registrationId).subscribe(
                (res:any)=>{
                  loading.dismiss()
                  if(res=="تاكد من البريد او رقم المرور"){
                    const toast = this.toastCtrl.create({
                      message: res,
                      duration: 5000
                    });
                    toast.present();
                  }else{
                        this.storage.set('Trans_user_id',res.UserData[0].ID)
                        this.storage.set('Password',res.UserData[0].Password)
                        this.storage.set('logined_in',true)
                        this.storage.set('Trans_user_type',res.UserData[0].UserType)
                        this.storage.set('userEmail',res.UserData[0].Email)

                        if(res.UserData[0].IsAdmin==true){
                          console.log("admin")
                          this.helper.UserIsAdmin(true);
                          this.storage.set('isadmin',true)
                        }else{
                          console.log("not admin")
                          this.helper.UserIsAdmin(false);
                          this.storage.set('isadmin',false)
                        }


                        if(res.UserData[0].UserType==1){
                          this.navCtrl.setRoot('HometypePage')
                          this.storage.set('Trans_upgrade',false)
                        }else{
                          this.navCtrl.setRoot('MainPage',{'user_type':res.UserData[0].UserType})
                          console.log("this user has upgraded his account")
                          this.storage.set('Trans_upgrade',true)
                        }
                  }
                  },(err:any)=>{
                    loading.dismiss()
                }
              )
            })
          })


            //----------
            console.log("login with touch id  res"+JSON.stringify(result))
          })
          .catch((err)=>{
            console.log("login with touch id err"+JSON.stringify(err))
          })

    }

    forgetpassword(){
        this.navCtrl.push('ForgetPasswordPage')
    }

    register(){
      this.navCtrl.push('RegisterPage')
    }

    hideShowPassword()
      {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
      }



}