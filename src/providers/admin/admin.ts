import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HelperProvider } from '../helper/helper';
import { ToastController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import { GeneralProvider } from '../general/general';
import { AddNotificationPage } from '../../pages/add-notification/add-notification';
import moment from 'moment';

@Injectable()
export class AdminProvider {

  constructor(public general:GeneralProvider,public http1:Http,public toastCtrl:ToastController,
              private translate: TranslateService,public http: HttpClient,public helper:HelperProvider) {
    console.log('Hello AdminProvبider Provider');
  }
  // private link to create admin account

  sign_up_admin(){
    // http://kfal.careofme.net/TranslationAppAPI/User/Registration?Name=hani&Email=bareedon@gmail.com&Password=111&UserType=2&Gender=m&&Mobile=773363636
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"User/Registration?Name=salah&Email=hisham@nitcotek.com&Password=111&UserType=2&CountryID=1&CityID=1&Address=wewqweq&Age=23&Lat=10&Long=20")
    }
    else{
      this.general. presentToastConnection()
    }
  }

  ChangeBlockStatus(UserID,Status){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"User/ChangeBlockStatus?UserID="+UserID+"&Status="+Status)
    }
    else{
      this.general. presentToastConnection()
    }
  }

  SendCustomNotification(Title,Body,UserType){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"Request/SendCustomNotification?Title="+Title+"&Body="+Body+"&UserType="+UserType)
    }
    else{
      this.general. presentToastConnection()
    }
  }

  GetUserData(){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"User/GetUserData")
    }
    else{
      this.general. presentToastConnection()
    }
  }

  EvaluationSelect(providerType,rate){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"Request/EvaluationSelect?FlagType="+providerType+"&FlagOrder="+rate)
    }
    else{
      this.general. presentToastConnection()
    }
  }

  UpdateInformation(Rules,FAQ,AboutUs){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"Other/UpdateInformation?InfoID=1&Rules="+Rules+"&FAQ="+FAQ+"&AboutUs="+AboutUs)
    }
    else{
      this.general. presentToastConnection()
    }
  }

  GetAllCompalinsForAdmin()
  {
    if(navigator.onLine){
      return this.http.get(this.helper.base_url+"Other/GetAllCompalinsForAdmin")
    }
    else{
      this.general. presentToastConnection()
    }
  }

  ShowAllRequestsForAdmin(){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"Request/ShowAllRequestsForAdmin")
    }
    else{
      this.general. presentToastConnection()
    }
  }
  
  UpdateLanguageAcademicStatus(LangID, AcademicStatus){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"Language/UpdateLanguageAcademicStatus?LangID="+ LangID+"&AcademicStatus="+AcademicStatus )
  
    }
    else{
      this.general. presentToastConnection()
    }
  }
  
  DirectAdminRegistration(params,FK_AdminID){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"User/DirectAdminRegistration?Name="+params.Name
      +"&Email="+params.UserEmail+
      "&Password="+params.Password+
      "&UserType=1"+
      "&Gender="+params.Gender+
      "&Mobile="+params.Mobile+
      "&FK_AdminID="+FK_AdminID
      )
    }
    else{
      this.general. presentToastConnection()
    }
  }

//------------------------------------dicussions -------------------------------------------------//
// for admin only
AddNewTopic(TopicName,TopicContent,Fk_SpecializationParentID,FK_SpecializationChildID,FK_LanguageID,Age){
  if(navigator.onLine){
    return   this.http.get(this.helper.base_url+"Discussion/AddDiscussionTopic?TopicName="+TopicName+
    "&TopicContent="+TopicContent+
    "&Fk_SpecializationParentID="+Fk_SpecializationParentID+
    "&FK_SpecializationChildID="+FK_SpecializationChildID+
    "&FK_LanguageID="+FK_LanguageID+
    "&Age="+Age)
  }
  else{
    this.general. presentToastConnection()
  }
}

joinDiscussionTable(FK_UserID,FK_EducationLevelID,Fk_SpecializationParentID,FK_SpecializationChildID,UniversityName,CollegeName){
  if(navigator.onLine){
    return   this.http.get(this.helper.base_url+"Discussion/AddUserDiscussionRegistration?FK_UserID="+FK_UserID+
    "&FK_EducationLevelID="+FK_EducationLevelID+
    "&Fk_SpecializationParentID="+Fk_SpecializationParentID+
    "&FK_SpecializationChildID="+FK_SpecializationChildID+
    "&UniversityName="+UniversityName+
    "&CollegeName="+CollegeName
    )
  }
  else{
    this.general. presentToastConnection()
  }
}


GetAllDiscussionsByUserID(UserID){
  if(navigator.onLine){
    return   this.http.get(this.helper.base_url+"Discussion/GetAllDiscussionsByUserID?UserID="+UserID)
  }
  else{
    this.general. presentToastConnection()
  }
}

GetAllDiscussionLogsByDiscussionTopicID(DiscussionTopicID){
  // by discuss not by user id
  if(navigator.onLine){
    return   this.http.get(this.helper.base_url+"Discussion/GetAllDiscussionLogsByDiscussionTopicID?DiscussionTopicID="+DiscussionTopicID)
  }
  else{
    this.general. presentToastConnection()
  }


}

AddDiscussionLog(Fk_UserID,Fk_DiscussionTopicID,UserDiscussionDetails,DiscussionDate){
  if(navigator.onLine){
    return   this.http.get(this.helper.base_url+"Discussion/AddDiscussionLog?Fk_UserID="+Fk_UserID+
    "&Fk_DiscussionTopicID="+Fk_DiscussionTopicID+
    "&UserDiscussionDetails="+UserDiscussionDetails+
    "&DiscussionDate="+DiscussionDate
    )
  }
  else{
    this.general. presentToastConnection()
  }
}

}

