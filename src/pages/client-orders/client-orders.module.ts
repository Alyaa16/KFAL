import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientOrdersPage } from './client-orders';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ClientOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild( ClientOrdersPage),
    TranslateModule.forChild()
  ],
})
export class ClientOrdersPageModule {}
