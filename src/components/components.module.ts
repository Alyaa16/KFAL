import { NgModule } from '@angular/core';
import { RequestComponent } from './request/request';
import {IonicModule} from 'ionic-angular';
@NgModule({
	declarations: [RequestComponent,
    ],
	imports: [IonicModule],
	exports: [RequestComponent,
   ]
})
export class ComponentsModule {}
