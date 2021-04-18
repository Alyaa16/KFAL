import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslatorOrdersPage } from './translator-orders';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TranslatorOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(TranslatorOrdersPage),
    TranslateModule.forChild()
  ],
})
export class TranslatorOrdersPageModule {}
