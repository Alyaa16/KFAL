export class CustomConfigrations{
    Base_Url:string='';

    // http://192.168.1.160:8899 local
    // link to any file :https://kfal.careofme.net/Images/Artboard%20%E2%80%93%2036.png
    // https://kfal.careofme.net  cloud
    // base_url:string="http://192.168.1.160:8899/TranslationAppAPI/"
    constructor(){
        // cloud :https://kfal.careofme.net/TranslationAppAPI/
        // local :"http://192.168.1.160:8899/TranslationAppAPI/"
        this.Base_Url="http://192.168.1.160:8899/TranslationAppAPI/"
    }
}