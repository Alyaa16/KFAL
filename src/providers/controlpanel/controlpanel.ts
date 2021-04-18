import { HelperProvider } from './../helper/helper';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralProvider } from '../general/general';


@Injectable()
export class ControlpanelProvider {

  constructor(public http: HttpClient,private helper:HelperProvider,private general:GeneralProvider) {
    console.log('Hello ControlpanelProvider Provider');
  }

  //-------------------------------------- Deadlines ------------------------------------------//

  AddDeadlineHours(Hour,Price){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"Other/AddDeadlineHours?Hour="+Hour+"&Price="+Price)
    }
    else{
      this.general. presentToastConnection()
    }
  }
  UpdateDeadlineHours(DeadlineID,Hour,Price){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"Other/UpdateDeadlineHours?DeadlineID="+DeadlineID+"&Hour="+Hour+"&Price="+Price )
    }
    else{
      this.general. presentToastConnection()
    }
  }

  DeleteDeadlineHours(DeadlineID){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"Other/DeleteDeadlineHours?DeadlineID="+DeadlineID )
    }
    else{
      this.general. presentToastConnection()
    }
  }

  GetAllDeadlineHours(){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"Other/GetAllDeadlineHours")
    }
    else{
      this.general. presentToastConnection()
    }
  }

  //-------------------------------------- Languages ------------------------------------------//

  // TranslationAppAPI/Language/UpdateLanguageAcademicStatus
  // int LangID, bool AcademicStatus
  AddLanguage(Lang_Name, Lan_Name_En, LangAbbreviation, Stasus,FK_AdminID){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"Language/AddLanguage?Lang_Name="+Lang_Name +"&Lan_Name_En="+Lan_Name_En
      +"&LangAbbreviation="+LangAbbreviation+"&Stasus="+ Stasus+"&FK_AdminID="+FK_AdminID )
    }
    else{
      this.general. presentToastConnection()
    }
  }

  UpdateLanguage(Lang_ID,Lang_Name,  Lan_Name_En, LangAbbreviation, Stasus,FK_AdminID){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"Language/UpdateLanguage?Lang_Name="+Lang_Name +"&Lan_Name_En="+Lan_Name_En
      +"&LangAbbreviation="+LangAbbreviation+"&Stasus="+ Stasus+"&Lang_ID="+ Lang_ID +"&FK_AdminID="+FK_AdminID)
    }
    else{
      this.general. presentToastConnection()
    }
  }

  DeleteLanguage(Lang_ID){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"Language/DeleteLanguage?Lang_ID="+ Lang_ID )
    }
    else{
      this.general. presentToastConnection()
    }
  }

  GetLanguages(){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"Language/GetAllLanguages" )
    }
    else{
      this.general. presentToastConnection()
    }
  }

  UpdateLanguageAcademicStatus(LangID, AcademicStatus){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"Language/UpdateLanguageAcademicStatus?LangID="+ LangID+"&AcademicStatus="+ AcademicStatus )
    }
    else{
      this.general. presentToastConnection()
    }
  }

  //-------------------------------------- Test Forms ------------------------------------------//

  GetTestForm_ByLangID(FK_Lang_ID){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"TestForms/GetTestForm_ByLangID?FK_Lang_ID="+FK_Lang_ID)
    }
    else{
      this.general. presentToastConnection()
    }
  }

  AddTestForm(TestFormPath,FK_Lang_ID,Fk_Admin_ID){ //TestFormPath, int FK_Lang_ID, int Fk_Admin_ID
    if(navigator.onLine){
      const formData: FormData = new FormData();
      formData.append('TestFormPath', TestFormPath);
      return   this.http.post(this.helper.base_url+"TestForms/AddTestForm?FK_Lang_ID="+FK_Lang_ID+"&Fk_Admin_ID="+Fk_Admin_ID
      +"&TestFormPath="+TestFormPath.name ,formData)
    }
    else{
      this.general. presentToastConnection()
    }
  }

  DeleteTestForm_ByTestID(FK_Test_ID){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"TestForms/DeleteTestForm?TestForm_ID="+FK_Test_ID)
    }
    else{
      this.general. presentToastConnection()
    }
  }


  //-------------------------------------- specialization parent & childeren ------------------------------------------//
  // add sp parent ==> fk admin id + name + parent id=null
  // add sp child  ==> fk admin id +name +parent id

  GetParentSp(){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"Specialization/GetParentSp")
    }
    else{
      this.general.presentToastConnection()
    }
  }

  GetChildSp(SpParentID){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"Specialization/GetChildSp/"+SpParentID)
    }
    else{
      this.general.presentToastConnection()
    }
  }

  DeleteSpecialization(Specialization_ID){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"Specialization/DeleteSpecialization?Specialization_ID="+ Specialization_ID )
    }
    else{
      this.general.presentToastConnection()
    }
  }

  UpdateSpecialization(Specialization_ID,SpecializationName, FK_ParentID, FK_AdminID){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"Specialization/UpdateSpecialization?Specialization_ID="+
      Specialization_ID +"&SpecializationName="+SpecializationName+"&FK_ParentID="+FK_ParentID +"&FK_AdminID="+FK_AdminID)
    }
    else{
      this.general.presentToastConnection()
    }
  }

  AddSpecialization(SpecializationName,FK_ParentID,FK_AdminID){
  if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"Specialization/AddSpecialization?SpecializationName="+ SpecializationName
      +"&FK_ParentID="+FK_ParentID+"&FK_ParentID="+FK_ParentID +"&FK_AdminID="+FK_AdminID)
    }
    else{
      this.general.presentToastConnection()
    }
  }

  //-------------------------------------- Education Levels  ------------------------------------------//

 AddEducationLevel(EducationNameAr,EducationNameEn,Fk_Admin_ID){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"EducationLevel/AddEducationLevel?EducationNameAr="+EducationNameAr
       +"&EducationNameEn="+EducationNameEn+"&Fk_Admin_ID="+Fk_Admin_ID)
    }
    else{
      this.general. presentToastConnection()
    }
  }

  UpdateEducationLevel(EducationLevel_ID,  EducationNameAr, EducationNameEn, Fk_Admin_ID){
   if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"EducationLevel/UpdateEducationLevel?EducationLevel_ID="+EducationLevel_ID
       +"&EducationNameAr="+EducationNameAr+"&EducationNameEn="+EducationNameEn+"&Fk_Admin_ID="+Fk_Admin_ID)
    }
    else{
      this.general. presentToastConnection()
    }
  }

  DeleteEducationLevel(EducationLevel_ID){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"EducationLevel/DeleteEducationLevel?EducationLevel_ID="+EducationLevel_ID)
    }
    else{
      this.general. presentToastConnection()
    }
  }

  GetEducationLevel(){
    if(navigator.onLine){
      return   this.http.get(this.helper.base_url+"EducationLevel/GetEducationLevel")
    }
    else{
      this.general.presentToastConnection()
    }
  }



 }
