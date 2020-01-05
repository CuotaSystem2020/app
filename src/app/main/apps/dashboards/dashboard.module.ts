import { LOCALE_ID, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';

registerLocaleData(localeEsAr);

import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { NgxChartsModule } from "@swimlane/ngx-charts";

import { FuseSharedModule } from "@fuse/shared.module";
import { FuseSidebarModule } from "@fuse/components";
import { FuseWidgetModule } from "@fuse/components/widget/widget.module";

import { DashboardComponent } from "./dashboard.component";
import { DashboardService } from "./dashboard.service";

const routes: Routes = [
    {
        path: "**",
        component: DashboardComponent,
        resolve: {
            data: DashboardService
        }
    }
];

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatTableModule,

        NgxChartsModule,

        FuseSharedModule,
        FuseSidebarModule,
        FuseWidgetModule
    ],
    providers: [{ provide: LOCALE_ID, useValue: "es-AR" }, DashboardService]
})
export class DashboardModule {}
