import { NgModule } from '@angular/core';
import { RequestComponent } from './request/request';
import {IonicModule} from 'ionic-angular';
import { RequestDetailsComponent } from './request-details/request-details';
import { StarRatingModule } from 'ionic3-star-rating';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataMessageComponent } from './no-data-message/no-data-message';

@NgModule({
	declarations: [RequestComponent,
    RequestDetailsComponent,
    NoDataMessageComponent,

    ],
	imports: [IonicModule,StarRatingModule,TranslateModule],
	exports: [RequestComponent,
    RequestDetailsComponent,
    NoDataMessageComponent,
   ]
})
export class ComponentsModule {}
